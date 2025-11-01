import Transaction from "../models/Transaction.js";

// Create new transaction
export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, note, currency } = req.body;
    if (!title || !amount || !type) {
      return res.status(400).json({ message: "Title, amount, and type are required" });
    }

    const newTransaction = new Transaction({
      userId: req.user.id,
      title,
      amount,
      type,
      category,
      date,
      note,
      currency,
    });
    await newTransaction.save();
    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Add Transaction Error:", error.message);
    res.status(500).json({ message: "Server error while adding transaction" });
  }
};

// Get all transactions for logged-in user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Get Transactions Error:", error.message);
    res.status(500).json({ message: "Server error while fetching transactions" });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    console.error("Update Transaction Error:", error.message);
    res.status(500).json({ message: "Server error while updating transaction" });
  }
};


// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Delete Transaction Error:", error.message);
    res.status(500).json({ message: "Server error while deleting transaction" });
  }
};