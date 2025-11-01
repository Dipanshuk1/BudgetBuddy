import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: [0, "Amount cannot be negative"] },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, default: "General", trim: true },
  date: { type: Date, default: Date.now },
  note: { type: String, trim: true },
  currency: { type: String, default: "INR" }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
