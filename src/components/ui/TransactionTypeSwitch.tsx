import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type FC } from 'react';
import type { FilterType } from '../../types/types';

interface TransactionTypeSwitchProps {
    type : FilterType,
    onChange : (e:SelectChangeEvent) => void

}

const TransactionTypeSwitch : FC<TransactionTypeSwitchProps> = ({type , onChange}) => {


       return (
              <div className='p-0'>
                    <FormControl fullWidth>
                        <Select         
                        value={type}
                        onChange={onChange}
                        sx={{'.MuiSelect-select': {padding: 0 , paddingRight : "12px"},'.MuiOutlinedInput-notchedOutline': {border: 'none'}}}
                        IconComponent={() => null}
                        renderValue={(selected: FilterType) => {
                        if (selected) {
                        return (
                            <div>
                                <img
                                    src="/transactions/filter-dark.png"
                                    alt="filter"
                                    className="w-[30px] h-[30px]"
                                />
                            </div>)

                        }}}

                        
                        >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                        </Select>
                    </FormControl>
                </div>
        );
    
}

export default TransactionTypeSwitch ;



