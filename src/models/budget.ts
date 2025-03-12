import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  month: { type: String, required: true }, // Format: "YYYY-MM"
});

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);

export default Budget;