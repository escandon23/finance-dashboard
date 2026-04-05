import Navbar from "./Navbar"
import Summary from "./Summary"
import BalanceChart from "./BalanceChart"
import ExpenseChart from "./ExpenseChart"
import Insights from "./Insights"
import Transactions from "./Transactions"

const App = () => {

  return (
    <>
      <Navbar/>
      <Summary/>
      <BalanceChart/>
      <ExpenseChart/>
      <Insights/>
      <Transactions/>
    </>
  )
}

export default App
