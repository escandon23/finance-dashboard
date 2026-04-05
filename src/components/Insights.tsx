import { useInsights } from "../hooks/useInsights";


const Insights = () => {
  const { largestExpense,highestSpendingCategory,percentChange} = useInsights();

  const isLess = percentChange < 0;

  return (
    <div>
      <h2>Insights</h2>

      <p>Largest Expense: ${largestExpense.amount.toLocaleString()}</p>
      <p>Highest Spending Category :  {highestSpendingCategory.category}</p>

      <p>You spent {Math.abs(percentChange).toFixed(1)}%{isLess ? " less" : " more"} than last month </p>   
    </div>
  );
};

export default Insights