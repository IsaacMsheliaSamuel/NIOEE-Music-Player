const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  deposit,
  withdraw,
  transfer,
  getAllTransactions,
  getTransactionsByAccount,
} = require("../controllers/transactionController");

const router = express.Router();

// All routes require authentication
router.use(protect);

// Deposit and withdrawal sit under /api/accounts/:id/
router.post("/:id/deposit", deposit);
router.post("/:id/withdraw", withdraw);

module.exports = router;

// Separate router for /api/transfers and /api/transactions
const transferRouter = express.Router();
transferRouter.use(protect);
transferRouter.post("/", transfer);
module.exports.transferRouter = transferRouter;

const txRouter = express.Router();
txRouter.use(protect);
txRouter.get("/", getAllTransactions);
txRouter.get("/:accountId", getTransactionsByAccount);
module.exports.txRouter = txRouter;
