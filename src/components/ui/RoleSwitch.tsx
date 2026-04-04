import { type FC } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "../../context/ThemeConetxt";

interface RoleSwitchProps {
  role: string;
  onChange: (event: SelectChangeEvent) => void;
}

const RoleSwitch: FC<RoleSwitchProps> = ({ role, onChange }) => {
    const {theme} = useTheme()

  return (
      <Box className={` ${theme === "dark" ? "border-green-500 text-white border-white-500" : "b-green-500 text-black"}`}>
        <FormControl fullWidth>
      <Select
        value={role}
        onChange={onChange}
        sx={{backgroundColor: theme === "dark" ? "black" : "white", color: theme === "dark" ? "white" : "black",
            "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme === "dark" ? "none" : "white"
          },"& .MuiSelect-icon": {color: theme === "dark" ? "white" : "black"}}}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Box>
  );
};

export default RoleSwitch;