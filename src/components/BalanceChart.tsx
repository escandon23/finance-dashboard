import { LineChart } from "@mui/x-charts/LineChart";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeConetxt";
const BalanceChart = () => {
  const { transactions } = useTransactions();
  const { theme } = useTheme();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const seriesData = months.map((_, i) => {
    const monthTx = transactions.filter(t => new Date(t.date).getMonth() === i);
    const income = monthTx.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
    const expense = monthTx.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
    return income - expense;
  });

  // Define theme-based colors
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
    <div className={`p-4 rounded-lg shadow-md`} style={{ backgroundColor: colors.background }}>
      <h2 className={`text-lg font-semibold mb-4`} style={{ color: colors.axis }}>
        Balance Trend
      </h2>

      <LineChart
        series={[{ data: seriesData, color: colors.line }]}
        xAxis={[{ 
          data: months, 
          scaleType: "band",
        }]}
        sx={{
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
          '& .MuiChartsGrid-vertical line': {
            stroke: colors.grid,
          },
          '& .MuiChartsGrid-horizontal line': {
            stroke: colors.grid,
          },
        }}
        height={300}
      />
    </div>
  );
};

export default BalanceChart;