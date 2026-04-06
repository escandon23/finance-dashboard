import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Save, X, Pencil, Trash2 } from "lucide-react";
import type { SelectChangeEvent } from "@mui/material";
import AddTransaction from "./AddTransaction";
import { useFilter } from "../context/FiltersContext";
import { useTheme } from "../context/ThemeConetxt";
import { useTransactions } from "../context/TransactionsContext";
import { useRole } from "../context/RoleContext";
import type { FilterType, SortType, Transaction } from "../types/types";
import TransactionTypeSwitch from "./ui/TransactionTypeSwitch";
import TransactionSortSwitch from "./ui/TransactionSortSwitch";

// Main component for displaying and managing transactions
const Transactions = () => {
  const { filters, setFilters } = useFilter();
  const { role } = useRole();
  const { transactions, setTransactions } = useTransactions();

  // UI state for the add transaction modal and inline edit flow.
  const [showAddTransaction, setShowAddTransaction] = useState<boolean>(false);
  const [editTransactionId, setEditTransactionId] = useState<string | null>(null);
  const [saveTransactionId, setSaveTransactionId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state used when editing a transaction inline.
  const [editData, setEditData] = useState({category: "",type: "" as "income" | "expense",amount: ""});
  const { theme } = useTheme();

  // Build a display-ready transaction list by applying search, filter, and sort.
  let results: Transaction[] = [...transactions];

  // Filter transactions by category search text.
  results = results.filter(transaction => transaction.category.toLowerCase().includes(filters.search.toLowerCase()));

  // Filter by transaction type if a specific type is selected.
  if (filters.type !== "all") {results = results.filter(transaction => transaction.type === filters.type);}

  // Sort by amount if requested.
  if (filters.sortBy === "amount") {results = [...results].sort((a, b) => b.amount - a.amount);}

  // Sort by date if requested.
  if (filters.sortBy === "date") {results = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());}

  // Initiate edit mode for a transaction (admin only) - but not if already editing
  const initiateEdit = (transaction: Transaction) => {
    if (role === "admin" && editingId !== transaction.id) {
      setEditTransactionId(transaction.id);
    } else {
      return null;
    }
  };

  // Handle edit button click: set up edit state and data
  const handleEdit = (transaction: Transaction) => {
    setEditTransactionId(null);
    setSaveTransactionId(transaction.id);
    setEditingId(transaction.id);
    setEditData({category: transaction.category,type: transaction.type,amount: transaction.amount.toString()});
  };

  // Save edited transaction and update state/localStorage
  const handleSave = (id: string) => {
    setSaveTransactionId(null);
    setEditTransactionId(null);

    const updatedTransactions = transactions.map(transaction =>
      transaction.id === id
        ? {
            ...transaction,
            category: editData.category,
            type: editData.type as "income" | "expense",
            amount: Number(editData.amount),
          }
        : transaction,
    );

    setEditingId(null);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  // Delete a transaction and update state/localStorage
  const handleDelete = (deleteId: string) => {
    const newTransactions = transactions.filter(
      transaction => transaction.id !== deleteId,
    );

    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  // Cancel edit mode and reset states
  const handleCancel = () => {
    setSaveTransactionId(null);
    setEditTransactionId(null);
    setEditingId(null);
  };

  // Handle changes in edit form inputs
  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle filter changes for transaction type
  const TransactionTypeChange = (e: SelectChangeEvent) => {
    setFilters({ ...filters, type: e.target.value as FilterType });
  };

  // Handle filter changes for sort type
  const TransactionSortChange = (e: SelectChangeEvent) => {
    setFilters({ ...filters, sortBy: e.target.value as SortType });
  };

  // Export transactions to CSV file
  const exportToCSV = () => {
    const headers = ["Date", "Category", "Type", "Amount"];
    const rows = transactions.map(t => [t.date, t.category, t.type, t.amount]);
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className={`p-2 flex flex-col gap-5 ${
        theme === "dark" ? "bg-[#111827] text-white" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 2 }}
    >
      {/* Section title */}
      <h2 className="text-xl mb-2">Transactions</h2>

      {/* Conditionally render AddTransaction component when the modal is open. */}
      {showAddTransaction ? (
        <AddTransaction
          showAddTransaction={showAddTransaction}
          setShowAddTransaction={setShowAddTransaction}
        />
      ) : (
        ""
      )}

      {/* Controls section: search input, filter selectors, and admin/user action button. */}
      <div className="flex justify-between pr-2 md:pr-10">
        <div className="flex gap-5 md:gap-10">

          {/* Search input with icon */}
          <div className="relative w-[50%]">
            <img
              src={`/transactions/search-${theme === "dark" ? "light" : "dark"}.png`}
              alt="search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
            />
            <input
              type="text"
              placeholder="Search Category"
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              className={`${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } w-full pl-2 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500 transition-all duration-200 text-sm md:text-md`}
            />
          </div>

          {/* Filter switches */}
          <div className="flex gap-2">
            <TransactionTypeSwitch
              type={filters.type}
              onChange={TransactionTypeChange}
            />
            <TransactionSortSwitch
              sortBy={filters.sortBy}
              onChange={TransactionSortChange}
            />
          </div>
        </div>

        {/* Action button: Add for admin, Export for user */}
        {role === "admin" ? (
          <button
            className="bg-blue-500 text-white text-sm md:text-md px-4 py-2 rounded-lg"
            onClick={() => setShowAddTransaction(true)}
          >
            Add
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white text-sm md:text-md px-4 py-2 rounded-lg"
            onClick={exportToCSV}
          >
            Export
          </button>
        )}
      </div>

      {/* Transactions table */}
      <table className="w-full">

        {/* Transaction Headers */}
        <thead>
          <tr>
            <th className="text-left pb-4">Date</th>
            <th className="text-left pb-4">Category</th>
            <th className="text-left pb-4">Type</th>
            <th className="text-left pb-4">Amount</th>
          </tr>
        </thead>

        {/* Transaction Body */}
        <tbody>
          {results.map((transaction, index) => (
            <tr key={index} onClick={() => initiateEdit(transaction)}>

                {/* Transaction Date */}
              <td className="p-2 pl-0 text-left text-sm md:text-md border-b border-gray-500">
                {transaction.date.slice(2)}
              </td>

                {/* Transaction Category and Input Transaction Category */}
              <td className="text-left text-sm md:text-md border-b border-gray-500">
                {editingId === transaction.id ? (
                  <input
                    className="text-sm w-[70px] md:w-[100px]"
                    type="text"
                    name="category"
                    value={
                      editData.category.charAt(0).toUpperCase() +
                      editData.category.slice(1)
                    }
                    onChange={handleEditChange}
                  />
                ) : (
                  transaction.category.charAt(0).toUpperCase() +
                  transaction.category.slice(1)
                )}
              </td>
                
                {/* Transaction Type and Select Transaction Type */}
              <td className="text-left text-sm md:text-md border-b border-gray-500">
                {editingId === transaction.id ? (
                  <select
                    className={`${
                      theme === "dark" ? "bg-gray-900 border" : "bg-white"
                    } rounded-md px-2 py-1 border border-gray-300`}
                    name="type"
                    value={editData.type}
                    onChange={handleEditChange}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                ) : (
                  transaction.type.charAt(0).toUpperCase() +
                  transaction.type.slice(1)
                )}
              </td>

              {/* Transacaction Amount and Input Transaction Amount */}
              <td className="text-sm md:text-md text-left border-b border-gray-500">
                {editingId === transaction.id ? (
                  <input
                    className="w-[50px] rounded-md border border-gray-300 px-2 py-1"
                    type="text"
                    name="amount"
                    value={editData.amount}
                    onChange={handleEditChange}
                  />
                ) : (
                  `$${transaction.amount.toLocaleString()}`
                )}
              </td>

              {/* Edit/Delete and Save/Cancel Buttons */}
              <td className="w-[50px] md:w-[70px]">
                {editTransactionId === transaction.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => {e.stopPropagation();handleEdit(transaction)}}
                      className="text-blue-500"
                    >
                      <Pencil className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={e => {e.stopPropagation();handleDelete(transaction.id);}}
                      className="text-red-500 ml-2"
                    >
                      <Trash2 className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </div>
                ) : saveTransactionId === transaction.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => {e.stopPropagation();handleSave(transaction.id);}}
                      className="text-green-500"
                    >
                      <Save className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={e => {e.stopPropagation(); handleCancel();}}
                      className="text-gray-500 ml-2"
                    >
                      <X className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Transactions;
