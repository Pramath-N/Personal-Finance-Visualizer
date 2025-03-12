// components/BudgetForm.tsx
import { useState } from 'react';
import { Budget } from '@/types/budget';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Rent', 'Other'];

interface BudgetFormProps {
  onSubmit: (budget: Budget) => void;
}

export default function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [category, setCategory] = useState(categories[0]);
  const [budget, setBudget] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBudget: Budget = {
      category,
      budget: parseFloat(budget),
      month,
    };

    onSubmit(newBudget);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Set Monthly Budget</h2>
      <div className="space-y-4">
        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Input */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Month Input */}
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Month
          </label>
          <input
            type="month"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Saving...' : 'Save Budget'}
        </button>
      </div>
    </form>
  );
}