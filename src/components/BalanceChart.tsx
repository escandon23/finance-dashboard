import { LineChart } from "@mui/x-charts/LineChart";
import { useTransactions } from "../context/TransactionsContext";

const BalanceChart = () => {

  const { transactions } = useTransactions();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const seriesData = months.map((_, i) => {
    const monthTx = transactions.filter(transaction => new Date(transaction.date).getMonth() === i);
    const income = monthTx.filter(transaction => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = monthTx.filter(transaction => transaction.type === "expense").reduce((acc, transaction)  => acc + transaction.amount, 0);
    return income - expense;
  });

  return (
     <div className="bg-white p-4 rounded-lg shadow-md">
     <h2 className="text-lg font-semibold mb-4">Balance Trend</h2>
    <LineChart series={[{ data: seriesData}]} xAxis={[{ data: months, scaleType: "band"}]} height={300}/>
    </div>
  );
};

export default BalanceChart;