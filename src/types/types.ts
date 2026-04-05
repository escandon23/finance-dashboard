
export type RoleType = "user" | "admin"
export type ThemeType = "dark" | "light"

export type FilterType = "all" | "income" | "expense";
export type SortType = "date" | "amount";

export interface Filters {
  search: string;
  type: FilterType;
  sortBy: SortType;
}



type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string; 
  category: string;
  type: TransactionType;
  amount: number;
}