// app/budget/page.tsx
'use client';

import { useState, useEffect } from 'react';
import BudgetForm from '@/components/forms/budget-form';
import BudgetComparisonChart from '@/components/budget-comparison-chart';
import SpendingInsights from '@/components/spending-insights';
import { Budget } from '@/types/budget';
import { Transaction } from '@/types/transaction';

export default function BudgetPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    // Fetch budgets and transactions for the selected month
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
  
          // Fetch budgets
          const budgetsResponse = await fetch(`/api/budgets?month=${selectedMonth}`);
          if (!budgetsResponse.ok) {
            throw new Error('Failed to fetch budgets');
          }
          const budgetsData: Budget[] = await budgetsResponse.json();
          setBudgets(budgetsData);
  
          // Fetch transactions
          const transactionsResponse = await fetch(`/api/transactions?month=${selectedMonth}`);
          if (!transactionsResponse.ok) {
            throw new Error('Failed to fetch transactions');
          }
          const transactionsData: Transaction[] = await transactionsResponse.json();
          setTransactions(transactionsData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [selectedMonth]);
  
    const handleSaveBudget = async (budget: Budget) => {
      try {
        const response = await fetch('/api/budgets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(budget),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save budget');
        }
  
        alert('Budget saved successfully!');
      } catch (error) {
        console.error('Error saving budget:', error);
        alert('Failed to save budget');
      }
    };
  
    if (loading) {
      return <div className="container mx-auto p-4">Loading...</div>;
    }
  
    if (error) {
      return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
    }
  
    return (
      <div className="container mx-auto p-4 space-y-6">
        {/* Month Selector */}
        <div className="flex justify-end">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
  
        {/* Budget Form */}
        <BudgetForm onSubmit={handleSaveBudget} />
  
        {/* Budget vs Actual Comparison Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Budget vs Actual Spending</h2>
          <BudgetComparisonChart budgets={budgets} transactions={transactions} />
        </div>
  
        {/* Spending Insights */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Spending Insights</h2>
          <SpendingInsights budgets={budgets} transactions={transactions} />
        </div>
      </div>
    );
  }
  