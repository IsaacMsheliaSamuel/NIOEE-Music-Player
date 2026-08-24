const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
} = require("../controllers/accountController");

const router = express.Router();

// All routes below require a valid JWT
router.use(protect);

router.post("/", createAccount);
router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.patch("/:id", updateAccount);

module.exports = router;
