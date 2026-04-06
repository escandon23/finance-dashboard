import { useState } from "react";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeConetxt";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Summary = () => {
  // Fetch transaction data and theme from app context.
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);

  // Separate income and expense transactions.
  const income = transactions.filter(t => t.type === "income");
  const expense = transactions.filter(t => t.type === "expense");

  // Calculate totals for each category.
  const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  // Format numerical values or hide them when visibility is toggled off.
  const format = (value: number) =>
    visible ? `$${value.toLocaleString()}` : "••••••";

  const isDark = theme === "dark";


  return (
    <motion.div className={`p-4  shadow-md ${ isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }} 
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold"> Summary </h2>

        <button
          onClick={() => setVisible(prev => !prev)}
          className={`p-2 rounded-full transition ${isDark ? "hover:bg-gray-700": "hover:bg-gray-200"}`}
        >
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className={`p-4 rounded-xl shadow transition ${isDark? "bg-blue-600 text-white": "bg-blue-100 text-blue-900"}`} >
          <p className="text-sm opacity-80">Balance</p>
          <h1 className="text-xl font-bold">{format(totalBalance)}</h1>
        </div>

        <div className={`p-4 rounded-xl shadow transition ${isDark? "bg-red-600 text-white" : "bg-red-100 text-red-900"}`} >
          <p className="text-sm opacity-80">Expenses</p>
          <h1 className="text-xl font-bold">{format(totalExpense)}</h1>
        </div>

        <div className={`p-4 rounded-xl shadow transition ${isDark? "bg-green-600 text-white" : "bg-green-100 text-green-900"}`} >
          <p className="text-sm opacity-80">Income</p>
          <h1 className="text-xl font-bold">{format(totalIncome)}</h1>
        </div>

      </div>
    </motion.div>
  );
};
export default Summary;