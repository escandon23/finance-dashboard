import { useTransactions } from "../context/TransactionsContext";
import { type Transaction } from "../types/types";

export const useInsights = () => {
  const { transactions } = useTransactions();

  // Filter only expense transactions for insights related to spending.
  const expenses = transactions.filter(transaction => transaction.type === "expense");

  // Determine the largest single expense transaction.
  // If there are no expense transactions, return a neutral fallback object.
  const largestExpense: Transaction = expenses.length > 0
    ? expenses.reduce((max, transaction) => (transaction.amount > max.amount ? transaction : max))
    : { id: "", date: "", category: "N/A", type: "expense", amount: 0 };

  // Sum expense values by category.
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(transaction => {
    categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  // Find the category with the highest total spending.
  const highestSpendingCategory = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
    { category: "", amount: 0 },
  );

  // Get current and previous month indexes.
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

  // Helper to calculate total expenses for a given calendar month.
  const getMonthTotal = (month: number) =>
    transactions
      .filter(
        transaction =>
          transaction.type === "expense" && new Date(transaction.date).getMonth() === month,
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

  const currentTotal = getMonthTotal(currentMonth);
  const lastTotal = getMonthTotal(lastMonth);

  // Calculate the percent change between the current and last month.
  // If last month's total is zero, avoid division by zero and return 0.
  const percentChange = lastTotal === 0 ? 0 : ((currentTotal - lastTotal) / lastTotal) * 100;

  return { largestExpense, highestSpendingCategory, percentChange };
};


