'use client'; // Mark as Client Component

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Transaction } from '@/types/transaction';
import { useEffect, useState } from 'react';

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

// Time range options
const timeRanges = [
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last Week', value: '7d' },
  { label: 'Last Month', value: '30d' },
  { label: 'Last Year', value: '365d' },
  { label: 'All Time', value: 'all' },
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all'); // Default to 'All Time'

  // Fetch transactions and category data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await fetch('/api/transactions');
        if (!transactionsResponse.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const transactionsData: Transaction[] = await transactionsResponse.json();
        setTransactions(transactionsData);

        // Calculate category breakdown
        const categoryMap = new Map<string, number>();
        transactionsData.forEach((transaction) => {
          const { category, amount } = transaction;
          if (categoryMap.has(category)) {
            categoryMap.set(category, categoryMap.get(category)! + amount);
          } else {
            categoryMap.set(category, amount);
          }
        });

        // Convert category map to array for the pie chart
        const categoryBreakdown = Array.from(categoryMap).map(([name, value]) => ({
          name,
          value,
        }));
        setCategoryData(categoryBreakdown);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  // Filter transactions based on the selected time range
  const filterTransactionsByTimeRange = (transactions: Transaction[], timeRange: string) => {
    const now = new Date();
    switch (timeRange) {
      case '24h':
        return transactions.filter(
          (transaction) => now.getTime() - new Date(transaction.date).getTime() <= 24 * 60 * 60 * 1000
        );
      case '7d':
        return transactions.filter(
          (transaction) => now.getTime() - new Date(transaction.date).getTime() <= 7 * 24 * 60 * 60 * 1000
        );
      case '30d':
        return transactions.filter(
          (transaction) => now.getTime() - new Date(transaction.date).getTime() <= 30 * 24 * 60 * 60 * 1000
        );
      case 'all':
      default:
        return transactions;
    }
  };

  // Get filtered transactions
  const filteredTransactions = filterTransactionsByTimeRange(transactions, selectedTimeRange);

  // Get the last 10 transactions sorted by date (newest first)
  const recentTransactions = filteredTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date (newest first)
    .slice(0, 10); // Take the first 10 transactions

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="border p-2 rounded"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Expenses Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total Expenses</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 4v1m0-1v1m-6.5-6h13M3 12h18M3 17h18"
                />
              </svg>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalExpenses}</p>
            <p className="text-sm mt-2 opacity-80">
              Total expenses calculated across all categories.
            </p>
            <div className="mt-4">
              <span className="text-sm bg-white/10 px-2 py-1 rounded-full">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown Card */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={300}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        {/* Most Recent Transactions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Most Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentTransactions.map((transaction) => (
                <li key={transaction._id} className="flex justify-between">
                  <span>{transaction.description}</span>
                  <span>${transaction.amount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions Details</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Description</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-b">
                  <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td className="p-2">{transaction.category}</td>
                  <td className="p-2 text-right">${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}