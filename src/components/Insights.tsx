import { useInsights } from "../hooks/useInsights";
import { useTheme } from "../context/ThemeConetxt";
import { motion } from "framer-motion";

// Component to display key financial insights in cards
const Insights = () => {
  // Destructure insights data from custom hook
  const { largestExpense , highestSpendingCategory, percentChange } = useInsights();
  const { theme } = useTheme();

  // Determine if spending decreased compared to last month
  const isLess = percentChange < 0;

  return (
    // Animated container with theme-based background
    <motion.div className={`p-5 ${theme == "dark"?"bg-gray-900":"bg-white"}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }} 

    >
     {/* Section title with responsive sizing and theme color */}
      <h2 className={`mb-5 md:mb-10 text-2xl md:text-3xl  ${theme == "dark" ? "text-white" : "text-black"}`}>Insights</h2>

      {/* Grid layout for insight cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

       {/* Largest Expense Card */}
        <div
          className={`p-5 rounded-md ${theme == "dark" ? "border-gray-50 bg-gray-900 shadow-gray-800 shadow-sm" : "border-gray-500 bg-gray-50 shadow-gray-500 shadow-sm"}`}
        >
        <p className="text-sm font-medium mb-3 uppercase tracking-wide text-gray-500">Largest Expense</p>
        <p className="text-lg md:text-4xl font-bold text-blue-500 mb-3"> ${largestExpense.amount.toLocaleString()}</p>
        <p className="text-sm md:text-md text-gray-400">{largestExpense.category.charAt(0).toUpperCase()+largestExpense.category.slice(1) || "N/A"}</p>
        </div>

        {/* Top Spending Category Card */}
        <div
          className={`p-5 rounded-md ${theme == "dark" ? "border-gray-50 bg-gray-900 shadow-gray-800 shadow-sm" : "border-gray-500 bg-gray-50 shadow-gray-500 shadow-sm"}`}
        >
        <p className="text-sm font-medium mb-3 uppercase tracking-wide text-gray-500">Top Spending Category</p>
          <p className="text-lg md:text-4xl font-bold text-blue-500 uppercase mb-3" >{highestSpendingCategory.category || "N/A"}</p>
          <p className="text-sm md:text-md text-gray-400">${highestSpendingCategory.amount?.toLocaleString() || "0"}</p>
        </div>

         {/* Monthly Comparison Card */}
        <div
          className={`p-5 rounded-md ${theme == "dark" ? "border-gray-50 bg-gray-900 shadow-gray-800 shadow-sm" : "border-gray-500 bg-gray-50 shadow-gray-500 shadow-sm"}`}
        >
        <p className="text-sm font-medium mb-3 uppercase tracking-wide text-gray-500">Monthly Comparison</p>
        <p className={`text-lg md:text-4xl font-bold  mb-3 ${isLess ? "text-red-500": "text-green-500" }`} >{Math.abs(percentChange).toFixed(1)}%</p>
        <p className="text-sm md:text-md text-gray-400">
          {isLess ? "Less" : "More"} than last month
        </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;