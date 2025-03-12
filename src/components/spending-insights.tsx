// components/SpendingInsights.tsx
import { Budget } from '@/types/budget';
import { Transaction } from '@/types/transaction';

interface SpendingInsightsProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export default function SpendingInsights({ budgets, transactions }: SpendingInsightsProps) {
  const insights = budgets.map((budget) => {
    const actual = transactions
      .filter((t) => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
    const percentage = ((actual / budget.budget) * 100).toFixed(2);
    const remainingBudget = budget.budget - actual;
    const status = actual > budget.budget ? 'Over Budget' : 'Under Budget';
    const statusColor = actual > budget.budget ? 'text-red-600' : 'text-green-600';
    const statusIcon = actual > budget.budget ? '❌' : '✅';

    return {
      category: budget.category,
      percentage,
      remainingBudget,
      status,
      statusColor,
      statusIcon,
    };
  });

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <div key={insight.category} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{insight.category}</h3>
            <span className={`text-sm ${insight.statusColor}`}>
              {insight.statusIcon} {insight.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${Math.min(parseFloat(insight.percentage), 100)}%` }}
            ></div>
          </div>

          {/* Details */}
          <div className="mt-2 text-sm text-gray-600">
            <p>
              Spent: ${(insight.remainingBudget < 0 ? insight.remainingBudget + insight.remainingBudget : insight.remainingBudget).toFixed(2)}
            </p>
            <p>Remaining: ${insight.remainingBudget.toFixed(2)}</p>
            <p>Percentage Used: {insight.percentage}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}