import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Budget } from '@/types/budget';
import { Transaction } from '@/types/transaction';

interface BudgetComparisonChartProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export default function BudgetComparisonChart({ budgets, transactions }: BudgetComparisonChartProps) {
  // Calculate actual spending for each budget category (treat amounts as negative)
  const data = budgets.map((budget) => {
    const actual = transactions
      .filter((t) => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0); // Subtract amounts to treat them as expenditures
    return {
      category: budget.category,
      budget: budget.budget,
      actual,
    };
  });

  // Find the minimum and maximum values in the data for the Y-axis domain
  const allValues = data.flatMap((d) => [d.budget, d.actual]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Add some padding to the Y-axis domain for better visualization
  const yAxisPadding = Math.max(Math.abs(minValue), Math.abs(maxValue)) * 0.1; // 10% padding
  const yDomain = [0, maxValue + yAxisPadding]; // Handle negative and positive values

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="category"
          tick={{ fill: '#333' }} // Customize X-axis tick color
        />
        <YAxis
          domain={yDomain} // Set Y-axis domain to handle negative and positive values
          tick={{ fill: '#333' }} // Customize Y-axis tick color
          tickFormatter={(value) => `$${value}`} // Format Y-axis ticks as currency
        />
        <Tooltip
          formatter={(value) => `$${value}`} // Format tooltip values as currency
          labelFormatter={(label) => `Category: ${label}`} // Format tooltip labels
        />
        <Legend
          wrapperStyle={{ paddingTop: '10px' }} // Add padding to the legend
        />
        <Bar
          dataKey="budget"
          fill="#8884d8"
          name="Budget"
          radius={[4, 4, 0, 0]} // Rounded corners for bars
        />
        <Bar
          dataKey="actual"
          fill="#82ca9d"
          name="Actual"
          radius={[4, 4, 0, 0]} // Rounded corners for bars
        />
        barGap = {10}
      </BarChart>
    </ResponsiveContainer>
  );
}