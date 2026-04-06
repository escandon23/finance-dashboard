import { PieChart } from "@mui/x-charts/PieChart";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeConetxt";
import { motion } from "framer-motion";

// Component to display a pie chart of monthly expenses by category
const ExpenseChart = () => {
    // Access transactions and theme from context
    const { transactions } = useTransactions();
    const currentMonth = new Date().getMonth();
    const {theme} = useTheme()

    // Filter transactions to get only expenses for the current month
    const monthlyExpenses = transactions.filter((transaction) => transaction.type === "expense" && new Date(transaction.date).getMonth() === currentMonth);

    // Extract unique categories from monthly expenses
    const categories = Array.from(new Set(monthlyExpenses.map(transaction => transaction.category)));

    // Create data array for pie chart: each category with total expense amount
    const data = categories.map((category) => ({
        label: category.toUpperCase(),
        value: monthlyExpenses.filter((transaction) => transaction.category === category).reduce((sum, transaction) => sum + transaction.amount, 0)
    }));

    return (
        // Animated container with theme-based background
        <motion.div 
            className={`p-4 ${theme == "dark" ? "bg-gray-900" : "bg-white"}`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }} 
        >
            {/* Chart title with theme-based color */}
            <h2 className={`text-lg font-semibold mb-4 ${theme == "dark" ? "text-white" : "text-black"}`}>Expenses by Category</h2>
            
            {/* Pie chart component from MUI with custom legend styling */}
            <PieChart 
                series={[{data}]} 
                height={300}
                slotProps={{legend: {
                        sx: {'& .MuiChartsLegend-label': {fontSize: '14px', fontWeight: '700',color: theme === "dark" ? '#ffffff' : '#000000'},
                            '& .MuiChartsLegend-item': {gap: '0.5rem'},
                }}}}
            />
        </motion.div>
    );
};

export default ExpenseChart;