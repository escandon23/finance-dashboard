import { LineChart } from "@mui/x-charts/LineChart";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeConetxt";
import { motion } from "framer-motion";

// Component to display a line chart showing monthly balance trends
const BalanceChart = () => {
  // Access transactions and theme from context
  const { transactions } = useTransactions();
  const { theme } = useTheme();

  // Array of month abbreviations for x-axis labels
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate balance (income - expense) for each month
  const seriesData = months.map((_, i) => {
    // Filter transactions for the current month
    const monthTx = transactions.filter(transaction => new Date(transaction.date).getMonth() === i);

    // Calculate total income for the month
    const income = monthTx.filter(transaction => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);
    // Calculate total expenses for the month
    const expense = monthTx.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
    // Return net balance
    return income - expense;
  });

  // Define theme-based colors for the chart
  const colors = theme === "dark"
    ? {
        line: "#60A5FA", // Tailwind blue-400
        grid: "#374151", // Tailwind gray-700
        background: "#111827", // Tailwind gray-800
        axis: "#D1D5DB", // Tailwind gray-300
      }
    : {
        line: "#3B82F6", // Tailwind blue-500
        grid: "#E5E7EB", // Tailwind gray-200
        background: "#FFFFFF",
        axis: "#374151", // Tailwind gray-700
      };

  return (
    // Animated container with theme-based background
    <motion.div className={`p-4 shadow-md ${theme == "dark" ? "bg-gray-900" : "bg-white"}`} 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }} 
    >
      {/* // Chart title with theme-based color */}
      <h2 className={`text-lg font-semibold mb-4`} style={{ color: colors.axis }}>
        
        Balance Trend
      </h2>

      {/* Line chart component from MUI */}
      <LineChart
        series={[{ data: seriesData, color: colors.line }]}
        xAxis={[{ 
          data: months, 
          scaleType: "band",
        }]}
        sx={{
          // Custom styles for axis labels and lines
          '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
            fill: colors.axis,
          },
          '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
            fill: colors.axis,
          },
          '& .MuiChartsAxis-bottom line': {
            stroke: colors.axis,
          },
          '& .MuiChartsAxis-left line': {
            stroke: colors.axis,
          },
          // Custom styles for grid lines
          '& .MuiChartsGrid-vertical line': {
            stroke: colors.grid,
          },
          '& .MuiChartsGrid-horizontal line': {
            stroke: colors.grid,
          },
        }}
        height={300}
      />
    </motion.div>
  );
};

export default BalanceChart;