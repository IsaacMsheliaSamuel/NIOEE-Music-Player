// Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { transferRouter, txRouter } = require("./routes/transactionRoutes");

// Initialize Express app and Prisma client
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(helmet());       // Adds security-related HTTP headers
app.use(cors());         // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON request bodies

// --- Routes ---

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "SecureBank API is running" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Account routes (all protected)
app.use("/api/accounts", accountRoutes);

// Deposit & withdrawal: POST /api/accounts/:id/deposit|withdraw
app.use("/api/accounts", transactionRoutes);

// Transfers: POST /api/transfers
app.use("/api/transfers", transferRouter);

// Transaction history: GET /api/transactions and /api/transactions/:accountId
app.use("/api/transactions", txRouter);

// --- Global Error Handler (must be last) ---
app.use(errorHandler);

// --- Start Server & Connect Database ---
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`SecureBank API is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
