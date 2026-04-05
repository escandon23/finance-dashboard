import { useTransactions } from "../context/TransactionsContext";



const Summary = () =>  {
    const {transactions} = useTransactions()

    const income = transactions.filter(transaction => transaction.type == "income")
    const expense = transactions.filter(transaction => transaction.type == "expense")

 

    const totalExpense = expense.reduce((sum, transaction) => sum + transaction.amount, 0)
    const totalIncome = income.reduce((sum, transaction) => sum + transaction.amount, 0)

    const totalBalance = totalIncome - totalExpense

        return (
            <div className="flex gap-2">
                <div>
                    <h1>Balance ${totalBalance.toLocaleString()}</h1>

                </div>
                   <div>
                    <h1>Total Epense ${totalExpense.toLocaleString()}</h1>

                </div>
                   <div>
                    <h1>Total Income ${totalIncome.toLocaleString()}</h1>

                </div>
                
            </div>
        );
}


export default Summary;