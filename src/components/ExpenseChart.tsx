import { PieChart } from "@mui/x-charts/PieChart";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeConetxt";

const ExpenseChart = () => {
    const { transactions } = useTransactions();
    const currentMonth = new Date().getMonth();
    const {theme} = useTheme()

    const monthlyExpenses = transactions.filter((transaction) => transaction.type === "expense" && new Date(transaction.date).getMonth() === currentMonth);

    const categories = Array.from(new Set(monthlyExpenses.map(transaction => transaction.category)));

    const data = categories.map((category) => ({
        label: category,
        value: monthlyExpenses.filter((transaction) => transaction.category === category).reduce((sum, transaction) => sum + transaction.amount, 0)
    }));

    return (
        <div className={`p-4 rounded-lg shadow-md ${theme == "dark" ? "bg-gray-900" : "bg-white"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${theme == "dark" ? "text-white" : "text-black"}`}>Expenses by Category</h2>
            <PieChart 
                series={[{data,}]} 
                height={300}
                slotProps={{
                    legend: {
                        sx: {
                            '& .MuiChartsLegend-label': {
                                fontSize: '14px',
                                fontWeight: '700',
                                color: theme === "dark" ? '#ffffff' : '#000000',
                            },
                            '& .MuiChartsLegend-item': {
                                gap: '0.5rem',
                            },
                        },
                    },
                }}
                
            />
        </div>
    );
};

export default ExpenseChart;