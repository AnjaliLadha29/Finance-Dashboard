import { useSelector } from "react-redux";

export default function Dashboard()
{
  const transactions = useSelector(state => state.transactions.list);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (

    <div className="balance-card">

      <h2 className="balance-text">

        ₹{income - expenses}
        <img src="https://img.freepik.com/free-vector/golden-cryptocurrency-coin-vector-illustration_1308-178402.jpg?semt=ais_hybrid&w=740&q=80" alt="coin" className="coin-icon"/>
      
      </h2>
      
      <p>Available Balance</p>

      <div className="actions">

        <button>Send</button>
        <button>Request</button>
        <button>Topup</button>
        
      </div>

    </div>

  );
}