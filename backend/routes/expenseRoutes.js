import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpenseSummary
} from "../controllers/expenseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/summary", protect, getExpenseSummary);

export default router;
