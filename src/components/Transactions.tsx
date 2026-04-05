import { useState, type ChangeEvent } from "react"
import { useFilter } from "../context/FiltersContext"
import { useTheme } from "../context/ThemeConetxt"
import { useTransactions } from "../context/TransactionsContext"
import { useRole } from "../context/RoleContext"
import AddTransaction from "./AddTransaction"
import { type FilterType, type SortType, type Transaction } from "../types/types"
import TransactionTypeSwitch from "./ui/TransactionTypeSwitch"
import TransactionSortSwitch from "./ui/TransactionSortSwitch"
import type { SelectChangeEvent } from "@mui/material"
import { Save, Pencil, Trash2, X } from "lucide-react";

const Transactions = () => {
    
    const {filters , setFilters} = useFilter()
    const {role} = useRole()
    const {transactions , setTransactions} = useTransactions()
    const [showAddTransaction , setShowAddTransaction] = useState<boolean>(false)
    const [editingId , setEditingId] = useState<string | null>(null)
    const [editData , setEditData] = useState({ category : "", type : "" as "income" | "expense", amount : "" })
    const {theme} = useTheme()
    let results : Transaction[] = [...transactions]

    results = results.filter((transaction) => transaction.category.toLowerCase().includes(filters.search.toLowerCase()))

    if(filters.type !== "all"){
        results = results.filter((transaction) => transaction.type === filters.type)
    }
    if(filters.sortBy === "amount"){
        results = [...results].sort((a , b) => b.amount - a.amount)
    }
    if(filters.sortBy === "date"){
        results = [...results].sort((a , b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    const handleDelete = (deleteId : string) => {
       const newTransactions =  transactions.filter(transaction => transaction.id !== deleteId)
       
       setTransactions(newTransactions)

       localStorage.setItem("transactions" , JSON.stringify(newTransactions))
    }

    const handleEditChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {   
        const { name, value } = e.target
        setEditData({...editData,[name]: value})
   }

    const handleEdit = (transaction : Transaction ) => {
        setEditingId(transaction.id)
        setEditData({category: transaction.category,type: transaction.type,amount: transaction.amount.toString()})
    }
    const handleSave = (id:string) => {

        const updatedTransactions = transactions.map((transaction) => transaction.id === id ? {...transaction ,
             category : editData.category , type:editData.type as "income" | "expense" , amount:Number(editData.amount)} : transaction)
             
             
             setEditingId(null)

      setTransactions( updatedTransactions);

      localStorage.setItem("transactions",JSON.stringify(updatedTransactions));


    
    }
    const handleCancel = () => {
        setEditingId(null)
    }

     
        const TransactionTypeChange = (e:SelectChangeEvent) => {
            setFilters({...filters , type : e.target.value as FilterType})
        }
          const TransactionSortChange = (e:SelectChangeEvent) => {
            setFilters({...filters , sortBy : e.target.value as SortType})
        }

    const exportToCSV = () => {
        const headers = ["Date", "Category", "Type", "Amount"]

        const rows = transactions.map(t => [t.date,t.category,t.type,t.amount])

        const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = "transactions.csv"
        link.click()

        URL.revokeObjectURL(url)
    }
    
    return(
        <div className={`p-2 flex flex-col gap-5 ${theme==="dark" ? "bg-[#111827] color-white" : "bg-white"}`}>
            <h2 className="text-xl mb-2">Transactions</h2>   

            {showAddTransaction ?  <AddTransaction showAddTransaction={showAddTransaction} setShowAddTransaction={setShowAddTransaction}/> : ""}

            <div className="flex justify-between pr-2 md:pr-10">
                <div className="flex gap-5 md:gap-10">
                    <div className="relative w-[50%] ">
                    <img
                        src="/transactions/search-dark.png" 
                        alt="search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
                    />

                    <input
                        type="text"
                        placeholder="Search Category"
                        onChange={(e) =>setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-2 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-500
                        transition-all duration-200  bg-white text-sm md:text-md"/>
                </div>
                <div className="flex">
                    <TransactionTypeSwitch type={filters.type} onChange={TransactionTypeChange} />
                    <TransactionSortSwitch sortBy={filters.sortBy} onChange={TransactionSortChange} />
                </div>

                </div>
               
                {role === "admin" ? (<button className="bg-blue-500 text-white text-sm md:text-md px-4 py-2 rounded-lg" onClick={() => setShowAddTransaction(true)} >Add</button>) :
                <button className="bg-blue-500 text-white text-sm md:text-md px-4 py-2 rounded-lg" onClick={exportToCSV} >Export</button>} 
              
            </div>
           

            <table className="w-[100%] ">
                <thead>
                    <tr>
                        <th className="text-left ">Date</th>
                        <th className="text-left">Category</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Amount</th> 
                    </tr>
                </thead>
                <tbody>
                    {results.map((transaction , index) => (
                    <tr key={index} className="group">
                        <td className="p-2 pl-0  text-left text-sm md:text-md  border-b border-gray-300">{transaction.date.slice(2)}</td>
                        <td className="text-left text-sm md:text-md border-b border-gray-300">
                        {editingId === transaction.id ? <input className="text-sm w-[70px] md:w-[100px]" type="text" name="category" value={editData.category}  onChange={handleEditChange}/>
                        : transaction.category}</td>
                        <td className="text-left text-sm md:text-md border-b border-gray-300 ">{editingId === transaction.id ? (
                            <select name="type" value={editData.type} onChange={handleEditChange}> 
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        )
                            : transaction.type.charAt(0).toUpperCase()+transaction.type.slice(1)}
                        </td>
                        <td className="text-sm md:text-md text-left border-b border-gray-300">
                            {editingId === transaction.id ? <input className="w-[50px]" type="text" name="amount" value={editData.amount}  onChange={handleEditChange}/> 
                            : "$"+transaction.amount.toLocaleString()}</td>
                        {role == "admin" && ( 
                        <td className="w-[50px] md:w-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                            {editingId === transaction.id ? (
                                <div>
                                    <button onClick={() => handleSave(transaction.id)} className="text-green-500"><Save className="w-4 h-4 md:w-6 md:h-6" /></button>
                                    <button onClick={handleCancel} className="text-gray-500 ml-2"><X className="w-4 h-4 md:w-6 md:h-6" /></button>
                                </div>) : (
                                <div>
                                    <button onClick={() => handleEdit(transaction)} className=" text-blue-500"><Pencil className="w-4 h-4 md:w-6 md:h-6" /></button>
                                    <button onClick={() => handleDelete(transaction.id)} className=" text-red-500 ml-2"><Trash2 className="w-4 h-4 md:w-6 md:h-6" /></button>
                                </div>
                            )}
                        </td> )
                        }
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Transactions