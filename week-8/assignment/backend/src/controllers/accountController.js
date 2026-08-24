const { PrismaClient } = require("@prisma/client");
const { generateUniqueAccountNumber } = require("../utils/accountNumber");

const prisma = new PrismaClient();

// Helper: select only safe account fields (never expose userId internally)
const accountFields = {
  id: true,
  accountNumber: true,
  accountName: true,
  balance: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

// POST /api/accounts
const createAccount = async (req, res, next) => {
  try {
    const { accountName, initialDeposit } = req.body;
    const userId = req.user.id;

    // --- Validation ---
    if (!accountName || accountName.trim() === "") {
      return res.status(400).json({ error: "Account name is required" });
    }
    if (initialDeposit === undefined || initialDeposit === null) {
      return res.status(400).json({ error: "Initial deposit is required" });
    }
    if (typeof initialDeposit !== "number") {
      return res.status(400).json({ error: "Initial deposit must be a number" });
    }
    if (initialDeposit < 0) {
      return res.status(400).json({ error: "Initial deposit cannot be negative" });
    }

    // --- Generate unique account number ---
    const accountNumber = await generateUniqueAccountNumber();

    // --- Create account (and opening transaction if deposit > 0) in one transaction ---
    const account = await prisma.$transaction(async (tx) => {
      const newAccount = await tx.account.create({
        data: {
          accountNumber,
          accountName: accountName.trim(),
          balance: initialDeposit,
          status: "active",
          userId,
        },
      });

      if (initialDeposit > 0) {
        await tx.transaction.create({
          data: {
            accountId: newAccount.id,
            type: "deposit",
            amount: initialDeposit,
            status: "completed",
            description: "Initial deposit",
          },
        });
      }

      return newAccount;
    });

    res.status(201).json({
      message: "Account created successfully",
      account: {
        id: account.id,
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        balance: account.balance,
        status: account.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/accounts
const getAccounts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const accounts = await prisma.account.findMany({
      where: { userId },
      select: accountFields,
      orderBy: { createdAt: "desc" },
    });

    res.json({ accounts });
  } catch (error) {
    next(error);
  }
};

// GET /api/accounts/:id
const getAccountById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const accountId = parseInt(req.params.id);

    if (isNaN(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const account = await prisma.account.findUnique({
      where: { id: accountId },
      select: { ...accountFields, userId: true },
    });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Make sure this account belongs to the requesting user
    if (account.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: You do not own this account" });
    }

    // Strip userId before sending
    const { userId: _, ...safeAccount } = account;
    res.json({ account: safeAccount });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/accounts/:id
const updateAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const accountId = parseInt(req.params.id);

    if (isNaN(accountId)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    // --- Block fields that must not be updated directly ---
    const blocked = ["balance", "userId", "accountNumber"];
    for (const field of blocked) {
      if (req.body[field] !== undefined) {
        return res.status(400).json({
          error: `Field "${field}" cannot be updated directly`,
        });
      }
    }

    const { accountName, status } = req.body;

    // At least one allowed field must be provided
    if (!accountName && !status) {
      return res.status(400).json({
        error: "Provide at least one field to update: accountName or status",
      });
    }

    // Validate status value if provided
    const allowedStatuses = ["active", "inactive", "frozen"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    // --- Ownership check ---
    const existing = await prisma.account.findUnique({ where: { id: accountId } });

    if (!existing) {
      return res.status(404).json({ error: "Account not found" });
    }
    if (existing.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: You do not own this account" });
    }

    // --- Build update payload from only allowed fields ---
    const updateData = {};
    if (accountName) updateData.accountName = accountName.trim();
    if (status) updateData.status = status;

    const updated = await prisma.account.update({
      where: { id: accountId },
      data: updateData,
      select: accountFields,
    });

    res.json({ message: "Account updated successfully", account: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccount, getAccounts, getAccountById, updateAccount };
