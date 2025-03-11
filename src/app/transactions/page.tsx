'use client'; // Mark as Client Component

import { useState } from 'react';
import TransactionForm from "@/components/forms/transaction-form";
import TransactionList from '@/components/transaction-list';

export default function TransactionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { amount: number; date: string; description: string }) => {
    setIsSubmitting(true); // Start submitting
    try {
      const response = await fetch('/api/transactions', { // Correct URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      // Refresh the transaction list after adding a new transaction
      window.location.reload();
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false); // Stop submitting
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <TransactionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <div className="m-4 p-2">
        <TransactionList />
      </div>
    </div>
  );
}