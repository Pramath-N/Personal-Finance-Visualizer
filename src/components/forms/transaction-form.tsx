import { useState } from 'react';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Rent', 'Other'];

export default function TransactionForm({ onSubmit, isSubmitting }: {onSubmit: (data: any) => void, isSubmitting: boolean}) {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: categories[0], // Default category
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      category: formData.category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        defaultValue={categories[categories.length - 1]}
        className="border p-2 rounded w-full"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Add Transaction'}
      </button>
    </form>
  );
}