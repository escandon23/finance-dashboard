import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type FC } from 'react';
import type { FilterType } from '../../types/types';

// Props for the transaction type filter dropdown component.
interface TransactionTypeSwitchProps {
    type : FilterType,
    onChange : (e:SelectChangeEvent) => void

}

// Dropdown selector for filtering transactions by type.
// Displays a custom filter icon and provides category options.
const TransactionTypeSwitch: FC<TransactionTypeSwitchProps> = ({type,onChange}) => {
  return (
    // Wrapper with no padding to align with surrounding elements.
    <div className="p-0">
      <FormControl fullWidth>
        <Select
          value={type}
          onChange={onChange}
          sx={{
            '.MuiSelect-select': {padding: 0,paddingRight: '12px'},'.MuiOutlinedInput-notchedOutline': { border: 'none'}
          }}
          // Hide the default dropdown arrow icon.
          IconComponent={() => null}
          // Custom render function to display the filter icon instead of text.
          renderValue={(selected: FilterType) => {
            if (selected) {
              return (
                <div>
                  <img src="/transactions/filter-dark.png" alt="filter" className="w-[30px] h-[30px]"/>
                </div>
              );
            }
          }}
        >
          {/* Transaction type filter options. */}
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TransactionTypeSwitch ;



