import { useTransactions } from "../context/TransactionsContext";
import { type Transaction } from "../types/types";

export const useInsights = () => {
  const { transactions } = useTransactions();

  const expenses = transactions.filter(transaction => transaction.type === "expense");

  // Checks for the largest expense , and if the largest expense is absent retun an object with type -Transaction

  const largestExpense: Transaction = expenses.length > 0
    ? expenses.reduce((max, transaction) => (transaction.amount > max.amount ? transaction : max))
    : { id: "", date: "", category: "N/A", type: "expense", amount: 0 };

  const categoryTotals: Record<string, number> = {};

  expenses.forEach(transaction => {categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;});

  const highestSpendingCategory = Object.entries(categoryTotals).reduce((max, [category, amount]) =>
    amount > max.amount ? { category: category, amount } : max,{ category: "", amount: 0 }
  );



  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

const getMonthTotal = (month: number) =>
  transactions.filter(transaction => transaction.type === "expense" && new Date(transaction.date).getMonth() === month)
.reduce((sum, transaction) => sum + transaction.amount, 0);  

  const currentTotal = getMonthTotal(currentMonth);
  const lastTotal = getMonthTotal(lastMonth);

  const percentChange = lastTotal === 0 ? 0 : ((currentTotal - lastTotal) / lastTotal) * 100;

 return {largestExpense,highestSpendingCategory,percentChange};


  };


