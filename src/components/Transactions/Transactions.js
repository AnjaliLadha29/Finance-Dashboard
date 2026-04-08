import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../../redux/transactionsSlice";

const categoryIcons =
{
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍",
  Salary: "💼",
  Entertainment: "🎬",
  Bills: "💡"
};

const categoryColors =
{
  Food: "#f97316",
  Transport: "#3b82f6",
  Shopping: "#ec4899",
  Salary: "#22c55e",
  Entertainment: "#8b5cf6",
  Bills: "#f59e0b"
};

export default function Transactions({ open, setOpen })
{
  const { list } = useSelector(state => state.transactions);

  const [search, setSearch] = useState("");
  
  const [filter, setFilter] = useState("all");
  
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense"
  });

  useEffect(() =>
    {
      if (!open) return;
      
      const handleEsc = (e) =>
        {
          if (e.key === "Escape") setOpen(false);
        };

      window.addEventListener("keydown", handleEsc);
      
      return () =>
        {
          window.removeEventListener("keydown", handleEsc);
        };

    }, [open]);
    
    const handleAdd = () =>
      {
        if (!form.amount || !form.category) return;
        
        dispatch(addTransaction({
          id: Date.now(),
          amount: Number(form.amount),
          category: form.category,
          type: form.type,
          date: new Date().toISOString().slice(0,10)
        }));
        
        setForm({ amount: "", category: "", type: "expense" });
        setOpen(false);
      };
      
      const filteredList = list.filter(t =>
        {
          const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
          
          const matchesFilter = filter === "all" ? true : t.type === filter;
          
          return matchesSearch && matchesFilter;
        });
      
      return (

        <div>
          
          <div className="filters">

            <input type="text" placeholder="Search by category..." value={search} onChange={(e) => setSearch(e.target.value)}/>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>

              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>

            </select>

          </div>

          <h3>Recent Transactions</h3>
          
          {filteredList.map(t => (

            <div className="txn-card" key={t.id}>

              <div className="txn-left">

                <div className="icon" style={{
                  background: categoryColors[t.category] || "#e0e7ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px"}}>
                    {categoryIcons[t.category] || "💸"}
                </div>
                
                <div>
                  <p>{t.category}</p>
                  <span>{t.date}</span>
                </div>

              </div>
              
              <div className={t.type === "income" ? "green" : "red"}>
                {t.type === "income" ? "+" : "-"}₹{t.amount}
              </div>

            </div>
          ))}

          {filteredList.length === 0 && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>No transactions found</p>
          )}
          
          {/* Modal */}
          
          {open && (
            
            <div className="modal" onClick={() => setOpen(false)}>
              
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

                <h3>Add Transaction</h3>

                <input placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}/>

                <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})}/>

                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>

                <button onClick={handleAdd}>Add</button>

              </div>

            </div>

          )}

        </div>

      );
      
}
