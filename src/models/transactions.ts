import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure amount is non-negative
  },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Rent', 'Other'], // Predefined categories
  },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;