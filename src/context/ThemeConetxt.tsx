import { useContext , createContext , useState , type ReactNode , type FC } from "react";
import { type ThemeType } from "../types/types";

interface ThemeContextType {
    theme : ThemeType,
    setTheme : (theme : ThemeType) => void

}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children : ReactNode
}

export const ThemeProvider : FC<ThemeProviderProps> = ({children}) => {

    const [theme , setTheme] = useState<ThemeType>("light")


    return(
        <ThemeContext.Provider value={{theme , setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if(!context){
        throw new Error("useTheme must be used within a provider")
    }

    return context
}


