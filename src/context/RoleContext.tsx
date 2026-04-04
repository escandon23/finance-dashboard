import { createContext , useContext , type ReactNode , type FC ,  useState } from "react";
import { type RoleType } from "../types/types";




interface RoleContextType {
    role : RoleType,
    setRole : (role : RoleType) => void
}

const RoleContext  = createContext<RoleContextType | undefined>(undefined)

interface RolesProviderProps {
    children : ReactNode
}

export const RolesProvider : FC<RolesProviderProps> = ({children}) => {

    const [role , setRole] = useState<RoleType>("user")

    return(
        <RoleContext.Provider value={{role , setRole}}>
            {children}
        </RoleContext.Provider>
    )

}

export const useRole = () => {
    const context = useContext(RoleContext)

    if(!context){
        throw new Error("useRole must be used within a role provider")
    }

    return context
}