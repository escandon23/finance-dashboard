import { PieChart } from "@mui/x-charts/PieChart";
import { useTransactions } from "../context/TransactionsContext";

const ExpenseChart = () => {
    const { transactions } = useTransactions();
    const currentMonth = new Date().getMonth();

    const monthlyExpenses = transactions.filter((transaction) => transaction.type === "expense" && new Date(transaction.date).getMonth() === currentMonth);

    const categories = Array.from(new Set(monthlyExpenses.map(transaction => transaction.category)));

    const data = categories.map((category) => ({
        label: category,
        value: monthlyExpenses.filter((transaction) => transaction.category === category).reduce((sum, transaction) => sum + transaction.amount, 0)
    }));

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
            <PieChart series={[{ data }]} height={300} />
        </div>
    );
};

export default ExpenseChart;