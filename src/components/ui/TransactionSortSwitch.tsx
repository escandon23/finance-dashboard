import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type FC } from 'react';
import type {  SortType } from '../../types/types';




interface TransactionTypeSwitchProps {
    sortBy : SortType,
    onChange : (e:SelectChangeEvent) => void

}

const TransactionSortSwitch : FC<TransactionTypeSwitchProps> = ({sortBy , onChange}) => {

        return (
                <div className='p-0'>
                    <FormControl fullWidth>
                        <Select         
                        value={sortBy}
                        onChange={onChange}
                        sx={{'.MuiSelect-select': {padding: 0 , paddingRight : "12px"},'.MuiOutlinedInput-notchedOutline': {border: 'none'}}}
                        IconComponent={() => null}
                        renderValue={(selected: SortType) => {
                        if (selected) {
                        return (
                            <div>
                                <img
                                    src="/transactions/sort-dark.png"
                                    alt="sort"
                                    className="w-[30px] h-[30px]"
                                />
                            </div>)

                        }}}

                        
                        >
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            );
    
}

export default TransactionSortSwitch ;



