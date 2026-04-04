import { useTheme } from "../context/ThemeConetxt";
import { useRole } from "../context/RoleContext";
import { motion} from "framer-motion";
import ThemeSwitch from "./ui/ThemeSwitch";
import RoleSwitch from "./ui/RoleSwitch";
import {type SelectChangeEvent } from "@mui/material/Select";


const Navbar = () =>  {
       
    const {theme ,setTheme} = useTheme()
    const {role , setRole} = useRole()

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as "user" | "admin");
    };

    const toggleTheme = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
       setTheme(checked ? "dark" : "light");
    };

    return(
        <motion.div className={`flex justify-between items-center sticky inset-0 shadow-md p-5 ${theme == "light" ? "bg-white text-black" : "bg-black text-white"} `}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <h1 className="text-lg md:text-2xl tracking-widest ">DASHBOARD</h1>
            <div className="flex items-center gap-2">
                <ThemeSwitch checked={theme === "dark"} onChange={toggleTheme}/>
                <img className="w-[30px] md:ml-5" src={`navbar/user-${theme === "dark"? "light":"dark"}.png`}alt="" />    
                <RoleSwitch role={role} onChange={handleChange}/>
            </div>
                
        </motion.div>
        );
    
}

export default Navbar;


