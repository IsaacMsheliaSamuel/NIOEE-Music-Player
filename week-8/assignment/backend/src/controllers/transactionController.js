const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Reusable: fetch account and verify it exists + is owned by user
const findOwnedAccount = async (accountId, userId) => {
  const account = await prisma.account.findUnique({ where: { id: accountId } });
  if (!account) return { error: "Account not found", status: 404 };
  if (account.userId !== userId) return { error: "Forbidden: You do not own this account", status: 403 };
  return { account };
};

// Reusable: validate a positive amount
const validateAmount = (amount) => {
  if (amount === undefined || amount === null) return "Amount is required";
  if (typeof amount !== "number") return "Amount must be a number";
  if (amount <= 0) return "Amount must be greater than 0";
  return null;
};

// POST /api/accounts/:id/deposit
const deposit = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const accountId = parseInt(req.params.id);
    const { amount } = req.body;

    if (isNaN(accountId)) return res.status(400).json({ error: "Invalid account ID" });

    const amountError = validateAmount(amount);
    if (amountError) return res.status(400).json({ error: amountError });

    const { account, error, status } = await findOwnedAccount(accountId, userId);
    if (error) return res.status(status).json({ error });

    if (account.status !== "active") {
      return res.status(400).json({ error: "Account is not active" });
    }

    // Update balance and create transaction atomically
    const [updatedAccount, transaction] = await prisma.$transaction([
      prisma.account.update({
        where: { id: accountId },
        data: { balance: { increment: amount } },
        select: { id: true, accountNumber: true, accountName: true, balance: true, status: true },
      }),
      prisma.transaction.create({
        data: {
          accountId,
          type: "deposit",
          amount,
          status: "completed",
          description: req.body.description || "Deposit",
        },
      }),
    ]);

    res.status(201).json({
      message: "Deposit successful",
      account: updatedAccount,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/accounts/:id/withdraw
const withdraw = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const accountId = parseInt(req.params.id);
    const { amount } = req.body;

    if (isNaN(accountId)) return res.status(400).json({ error: "Invalid account ID" });

    const amountError = validateAmount(amount);
    if (amountError) return res.status(400).json({ error: amountError });

    const { account, error, status } = await findOwnedAccount(accountId, userId);
    if (error) return res.status(status).json({ error });

    if (account.status !== "active") {
      return res.status(400).json({ error: "Account is not active" });
    }
    if (amount > account.balance) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const [updatedAccount, transaction] = await prisma.$transaction([
      prisma.account.update({
        where: { id: accountId },
        data: { balance: { decrement: amount } },
        select: { id: true, accountNumber: true, accountName: true, balance: true, status: true },
      }),
      prisma.transaction.create({
        data: {
          accountId,
          type: "withdrawal",
          amount,
          status: "completed",
          description: req.body.description || "Withdrawal",
        },
      }),
    ]);

    res.status(201).json({
      message: "Withdrawal successful",
      account: updatedAccount,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/transfers
const transfer = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { fromAccount, toAccount, amount } = req.body;

    // --- Validate inputs ---
    if (!fromAccount || !toAccount) {
      return res.status(400).json({ error: "fromAccount and toAccount are required" });
    }
    if (fromAccount === toAccount) {
      return res.status(400).json({ error: "Sender and receiver cannot be the same account" });
    }

    const amountError = validateAmount(amount);
    if (amountError) return res.status(400).json({ error: amountError });

    // --- Look up both accounts by account number ---
    const sender = await prisma.account.findUnique({ where: { accountNumber: fromAccount } });
    if (!sender) return res.status(404).json({ error: "Sender account not found" });
    if (sender.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: You do not own the sender account" });
    }

    const receiver = await prisma.account.findUnique({ where: { accountNumber: toAccount } });
    if (!receiver) return res.status(404).json({ error: "Receiver account not found" });

    // --- Business rules ---
    if (sender.status !== "active") {
      return res.status(400).json({ error: "Sender account is not active" });
    }
    if (receiver.status !== "active") {
      return res.status(400).json({ error: "Receiver account is not active" });
    }
    if (amount > sender.balance) {
      return res.status(400).json({ error: "Insufficient balance in sender account" });
    }

    // --- Execute all DB operations as a single atomic transaction ---
    await prisma.$transaction([
      // Deduct from sender
      prisma.account.update({
        where: { id: sender.id },
        data: { balance: { decrement: amount } },
      }),
      // Add to receiver
      prisma.account.update({
        where: { id: receiver.id },
        data: { balance: { increment: amount } },
      }),
      // Sender's outgoing record
      prisma.transaction.create({
        data: {
          accountId: sender.id,
          type: "transfer",
          amount,
          status: "completed",
          description: `Transfer to ${receiver.accountNumber}`,
        },
      }),
      // Receiver's incoming record
      prisma.transaction.create({
        data: {
          accountId: receiver.id,
          type: "transfer",
          amount,
          status: "completed",
          description: `Transfer from ${sender.accountNumber}`,
        },
      }),
    ]);

    res.status(201).json({ message: "Transfer successful" });
  } catch (error) {
    next(error);
  }
};

// GET /api/transactions
// Returns all transactions across all accounts owned by the user
const getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all account IDs belonging to the user
    const userAccounts = await prisma.account.findMany({
      where: { userId },
      select: { id: true },
    });
    const accountIds = userAccounts.map((a) => a.id);

    const transactions = await prisma.transaction.findMany({
      where: { accountId: { in: accountIds } },
      orderBy: { createdAt: "desc" },
    });

    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};

// GET /api/transactions/:accountId
// Returns transactions for one specific account (must be owned by user)
const getTransactionsByAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const accountId = parseInt(req.params.accountId);

    if (isNaN(accountId)) return res.status(400).json({ error: "Invalid account ID" });

    const { account, error, status } = await findOwnedAccount(accountId, userId);
    if (error) return res.status(status).json({ error });

    const transactions = await prisma.transaction.findMany({
      where: { accountId: account.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};

module.exports = { deposit, withdraw, transfer, getAllTransactions, getTransactionsByAccount };
