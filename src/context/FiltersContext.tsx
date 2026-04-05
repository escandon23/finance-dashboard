import { createContext , useContext , useState , type ReactNode } from "react";
import { type Filters } from "../types/types";


interface FiltersContextType {
    filters : Filters,
    setFilters : (filters : Filters) => void;
}


const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({children} : {children : ReactNode}) => {

    const [filters , setFilters ] = useState<Filters>({
        search : "",
        type : "all",
        sortBy : "date"
    })

 return (
    <FiltersContext.Provider value={{filters , setFilters}}>
        {children}
    </FiltersContext.Provider>
 )
}

export const useFilter = () => {
    const context = useContext(FiltersContext)
    if(!context){
        throw new Error("useFilter must be used inside a context provider")
    }
    return context
} 
