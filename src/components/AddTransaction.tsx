import { useState , type FC  } from "react";
import { type Transaction } from "../types/types";
import { useTransactions } from "../context/TransactionsContext";

interface AddTransactionProps {
    showAddTransaction : boolean,
    setShowAddTransaction : (showAddTransaction : boolean) => void

}


const AddTransaction : FC<AddTransactionProps> = ({showAddTransaction , setShowAddTransaction}) =>  {

    const {transactions , setTransactions} = useTransactions()
    const [formData , setFormData] = useState({category : "",type : "",amount : ""})

    const formattedDate = new Date().toISOString().slice(0, 10);

     const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }


    const handleSubmit = async (event : React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const randomId = Math.random()

        const newTransaction : Transaction = {
            id : `${randomId}`,
            date : formattedDate,
            category : formData.category,
            type : formData.type as "income" | "expense",
            amount : Number(formData.amount)
     }

     setTransactions([...transactions , newTransaction])
     setFormData({category : "" , type:"" , amount:""})

       try {

        const res = await fetch(
        "https://69d0e79a90cd06523d5d9ea4.mockapi.io/api/transactions/transactions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTransaction),
        }
      );

      if (!res.ok) throw new Error("Failed to save transaction to API");

      const savedTransaction = await res.json();

      setTransactions([...transactions, savedTransaction]);

      localStorage.setItem("transactions",JSON.stringify(transactions));

      setFormData({ category: "", type: "", amount: "" });

    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };



    
   
   return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
      
      {/* Close button */}
      <button onClick={() => setShowAddTransaction(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
      >
        ❌
      </button>

      <h2 className="text-xl font-semibold mb-6 text-center">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          type="text"
          placeholder="Enter category"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        >
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition
                    appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
            required
        />

        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium" >Add Transaction</button>
      </form>
    </div>
  </div>
);

}

export default AddTransaction;