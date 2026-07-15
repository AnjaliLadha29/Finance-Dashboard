import { useSelector } from "react-redux";

export default function Insights()
{
  const transactions = useSelector( state => state.transactions.list);

  const categoryTotals = {};

  let totalExpenses = 0;

  transactions.forEach((transaction) => {

    if(transaction.type === "expense")
    {
      totalExpenses += transaction.amount;

      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;

    }

  });

  const topSpending = Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1])[0];

  if(!topSpending)
  {
    return (

      <div className="insights-card">

        <h3>
          📊 Smart Spending Insights
        </h3>

        <p>
          Add expenses to generate insights.
        </p>

      </div>

    );

  }

  const category = topSpending[0];

  const amount = topSpending[1];

  const percentage = ((amount / totalExpenses) * 100).toFixed(1);

  let message;

  if(percentage >= 60)
  {
    message = `⚠️ ${category} takes ${percentage}% of your spending. Try reducing this category.`;
  }
  else if(percentage >= 40)
  {
    message = `💡 ${category} is your highest expense category. Keep monitoring it.`;
  }
  else
  {
    message = `🎉 Your expenses are distributed well across categories.`;
  }

  return (

    <div className="insights-card">

      <h3>
        📊 Smart Spending Insights
      </h3>

      <div className="top-spending">

        <div className="star-container">

          <svg
            className="star-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#FFFF55"
          >

            <path d="M864-224 742-345l66-65 120 121-64 65ZM714-692l-65-64 121-121 65 64-121 121Zm-467 0L126-813l64-64 122 121-65 64ZM98-224l-65-65 121-121 65 65L98-224ZM219-99l71-296L59-596l304-26 117-280 119 280 303 26-231 201 70 296-261-159L219-99Z"/>

          </svg>

          <span className="star-text">
            {category}
          </span>

        </div>

        <h2>
          ₹{amount.toLocaleString("en-IN")}
        </h2>

        <p>
          {percentage}% of total expenses
        </p>

      </div>

      <div className="alert-box">
        {message}
      </div>

    </div>
    
  );

}
