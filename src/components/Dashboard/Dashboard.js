import { useSelector } from "react-redux";

export default function Dashboard()
{
  const transactions = useSelector((state) => state.transactions.list);

  const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);

  const expenses = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  return (

    <div className="balance-card">

      <p className="balance-title">Available Balance</p>

      <h1 className="balance-amount">

        ₹{balance.toLocaleString("en-IN")}
        <img src="https://img.freepik.com/free-vector/golden-cryptocurrency-coin-vector-illustration_1308-178402.jpg?semt=ais_hybrid&w=740&q=80" alt="coin" className="coin-icon"/>
      
      </h1>

      <p className="balance-status">
        
        {balance >= 0 ? "🎉 You're managing your finances well!" : "⚠️ Your expenses exceed your income."}
        
      </p>

      <div className="summary-container">

        <div className="summary-box income-box">

          <span>Income</span>
          <h3>+ ₹{income.toLocaleString("en-IN")}</h3>

        </div>

        <div className="summary-box expense-box">

          <span>Expense</span>
          <h3>- ₹{expenses.toLocaleString("en-IN")}</h3>

        </div>

      </div>

      <div className="actions">

        <button>Send</button>

        <button>Request</button>

        <button>Top Up</button>

      </div>

    </div>
  );
}
