import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
});

const Transaction = models.Transaction || model('Transaction', transactionSchema);

export default Transaction;