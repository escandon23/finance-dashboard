import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Transaction } from "../types/types";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeConetxt";

// Props interface for the AddTransaction component
interface AddTransactionProps {
  showAddTransaction: boolean;
  setShowAddTransaction: (showAddTransaction: boolean) => void;
}

// Component to add a new transaction with form and modal
const AddTransaction: FC<AddTransactionProps> = ({showAddTransaction,setShowAddTransaction}) => {
  // Access transactions from context
  const { transactions, setTransactions } = useTransactions();
  // Local form state for transaction data
  const [formData, setFormData] = useState({category: "",type: "",amount: "",});
  const { theme } = useTheme();

  // Get today's date in ISO format
  const formattedDate = new Date().toISOString().slice(0, 10);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and add new transaction
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Generate random ID for new transaction
    const randomId = Math.random();

    // Create new transaction object
    const newTransaction: Transaction = {
      id: `${randomId}`,
      date: formattedDate,
      category: formData.category,
      type: formData.type as "income" | "expense",
      amount: Number(formData.amount),
    };

    // Add new transaction to list
    const updatedTransactions = [...transactions, newTransaction];

    // Update state and localStorage
    setTransactions(updatedTransactions);

    // Reset form fields
    setFormData({ category: "", type: "", amount: "" });

    // Save to localStorage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    // Close modal after successful submission
    setShowAddTransaction(false);
  };

  return (
    // AnimatePresence allows animations when component unmounts
    <AnimatePresence>
      {showAddTransaction && (
        <>
          {/* Animated overlay background */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowAddTransaction(false)}
          />

          {/* Animated modal form */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              className={`rounded-xl shadow-lg p-8 w-full max-w-md relative ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowAddTransaction(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
              >
                ❌
              </button>

              {/* Form title */}
              <h2 className="text-xl font-semibold mb-6 text-center">Add Transaction</h2>

              {/* Transaction form with inputs */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Category input */}
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter category"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />

                {/* Transaction type select */}
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`${
                    theme === "dark" ? "bg-gray-900" : "bg-white"
                  } border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                  required
                >
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                {/* Amount input */}
                <input
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  type="number"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                  required
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  Add Transaction
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTransaction;