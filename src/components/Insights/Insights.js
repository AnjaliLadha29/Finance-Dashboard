import { useSelector } from "react-redux";

export default function Insights()
{
  const transactions = useSelector(state => state.transactions.list);

  const categoryTotals = {};

  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const top = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="balance-card" style={{ marginTop: "20px", textAlign: "center" }}>
      
      <p>Top Spending</p>
      
      {top && (

        <div className="star-container">
          <svg className="star-icon" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFF55"><path d="M864-224 742-345l66-65 120 121-64 65ZM714-692l-65-64 121-121 65 64-121 121Zm-467 0L126-813l64-64 122 121-65 64ZM98-224l-65-65 121-121 65 65L98-224ZM219-99l71-296L59-596l304-26 117-280 119 280 303 26-231 201 70 296-261-159L219-99Z"/></svg>
          <span className="star-text">{top[0]}</span>
        </div>
        
      )}

    </div>
  );
}