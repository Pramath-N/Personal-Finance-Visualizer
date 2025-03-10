'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Transaction } from '@/types/transaction';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isUpdatingTransaction, setIsUpdatingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setIsUpdatingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setIsUpdatingTransaction(null);
  };

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data: Transaction[] = await response.json();
    setTransactions(data);
  };

  const updateTransaction = async (transaction: Transaction) => {
    await fetch('/api/transactions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    setIsUpdatingTransaction(null); // Close the edit form
    fetchTransactions(); // Refresh the list
  };

  const deleteTransaction = async (id: string) => {
    await fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction._id} className="border p-4 rounded">
          {isUpdatingTransaction?._id === transaction._id ? (
            // Edit form
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="font-bold mr-2">Amount:</label>
                <input
                  type="number"
                  value={isUpdatingTransaction.amount}
                  onChange={(e) =>
                    setIsUpdatingTransaction({
                      ...isUpdatingTransaction,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="border p-1 rounded"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold mr-2">Date:</label>
                <input
                  type="date"
                  value={new Date(isUpdatingTransaction.date).toISOString().split('T')[0]}
                  onChange={(e) =>
                    setIsUpdatingTransaction({
                      ...isUpdatingTransaction,
                      date: new Date(e.target.value),
                    })
                  }
                  className="border p-1 rounded"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold mr-2">Description:</label>
                <input
                  type="text"
                  value={isUpdatingTransaction.description}
                  onChange={(e) =>
                    setIsUpdatingTransaction({
                      ...isUpdatingTransaction,
                      description: e.target.value,
                    })
                  }
                  className="border p-1 rounded"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => updateTransaction(isUpdatingTransaction)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            // Display transaction details
            <div>
              <span className="flex">
                <p className="font-bold mr-14">Amount:</p> ${transaction.amount}
              </span>
              <span className="flex">
                <p className="font-bold mr-20">Date:</p> {new Date(transaction.date).toLocaleDateString()}
              </span>
              <span className="flex">
                <p className="font-bold mr-6">Description:</p> {transaction.description}
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => deleteTransaction(transaction._id)}
                  className="m-2 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleEdit(transaction)}
                  className="m-2 bg-blue-600 hover:bg-blue-700"
                >
                  Edit
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}