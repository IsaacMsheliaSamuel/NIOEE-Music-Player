const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Generates a random 10-digit account number string
const generateRandom10Digits = () => {
  // Ensures first digit is never 0 so it stays 10 digits
  const first = Math.floor(Math.random() * 9) + 1;
  const rest = Math.floor(Math.random() * 1_000_000_000)
    .toString()
    .padStart(9, "0");
  return `${first}${rest}`;
};

// Keeps generating until it finds one not already in the database
const generateUniqueAccountNumber = async () => {
  let accountNumber;
  let exists = true;

  while (exists) {
    accountNumber = generateRandom10Digits();
    const found = await prisma.account.findUnique({ where: { accountNumber } });
    exists = !!found;
  }

  return accountNumber;
};

module.exports = { generateUniqueAccountNumber };
