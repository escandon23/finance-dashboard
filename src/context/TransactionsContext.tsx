import {createContext , useContext , useState , useEffect , type ReactNode , type FC} from "react"
import { type Transaction } from "../types/types"

interface TransactionContextType {
    transactions : Transaction[],
    setTransactions : (transactions : Transaction[]) => void
}

const TransactionsContext = createContext<TransactionContextType | undefined>(undefined)

interface TransactionsProviderProps {
    children : ReactNode
}

export const TransactionsProvider : FC<TransactionsProviderProps> = ({children}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const fetchTransactions = async () => {
            const stored = localStorage.getItem("transactions");
            if (stored) {
                setTransactions(JSON.parse(stored));
            }else{
                try {
                    const res = await fetch("https://69d0e79a90cd06523d5d9ea4.mockapi.io/api/transactions/transactions");
                    const data: Transaction[] = await res.json();

                    setTransactions(data);
                    localStorage.setItem("transactions", JSON.stringify(data))
                }catch (error) {
                    throw new Error(`Error fetching transactions: ${error}`)
                }       
            }
        }

    fetchTransactions();
    }, []);


    return (
        <TransactionsContext.Provider value={{transactions , setTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
    
}

export const useTransactions = () => {
    const context = useContext(TransactionsContext)

    if(!context){
        throw new Error("useTransactions must be used within a provider")
    }

    return context

}
