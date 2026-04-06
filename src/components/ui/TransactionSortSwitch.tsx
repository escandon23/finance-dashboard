import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type FC } from 'react';
import type { SortType } from '../../types/types';

// Props for the transaction sorting dropdown component.
interface TransactionTypeSwitchProps {
    sortBy : SortType,
    onChange : (e:SelectChangeEvent) => void
}

// Dropdown selector for sorting transactions.
// Displays a custom icon and provides sorting options.

const TransactionSortSwitch: FC<TransactionTypeSwitchProps> = ({sortBy,onChange}) => {
  return (
    // Wrapper with no padding to align with surrounding elements.
    <div className="p-0">
      <FormControl fullWidth>
        <Select
          value={sortBy}
          onChange={onChange}
          sx={{'.MuiSelect-select': {padding: 0,paddingRight: '12px'},'.MuiOutlinedInput-notchedOutline': {border: 'none' }}}
          // Hide the default dropdown arrow icon.
          IconComponent={() => null}
          // Custom render function to display the sort icon instead of text.
          renderValue={(selected: SortType) => {
            if (selected) {
              return (
                <div>
                  <img src="/transactions/sort-dark.png" alt="sort" className="w-[30px] h-[30px]"/>
                </div>
              );
            }
          }}
        >
          {/* Sort options available to the user. */}
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="amount">Amount</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TransactionSortSwitch;

