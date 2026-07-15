import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, deleteTransaction } from "../../redux/transactionsSlice";

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

  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState("");

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
    
    const handleAdd = () => {
      
      const newErrors = {};
      
      if (!form.amount || Number(form.amount) <= 0)
      {
        newErrors.amount = "Amount must be greater than 0";
      }
      
      if (!form.category.trim())
      {
        newErrors.category = "Please select a category";
      }
      
      if (Object.keys(newErrors).length > 0)
      {
        setErrors(newErrors);
        return;
      }
      
      dispatch(
        addTransaction({
          id: Date.now(),
          amount: Number(form.amount),
          category: form.category,
          type: form.type,
          date: new Date().toISOString().slice(0, 10),
        })
      );
      
      setToast("✅ Transaction Added Successfully!");
      
      setTimeout(() => {
        setToast("");
      }, 2500);
      
      setErrors({});
      
      setForm({
        amount: "",
        category: "",
        type: "expense",
      });
      
      setOpen(false);
    };

    const handleDelete = (id) => {
      
      const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
      
      if(confirmDelete)
      {
        dispatch(deleteTransaction(id));
        setToast("🗑️ Transaction Deleted Successfully!");
        setTimeout(() => {
          setToast("");
        }, 2500);
      }
    };

    const filteredList = list.filter((t) => {
      
      const keyword = search.toLowerCase();
      
      const matchesSearch = t.category.toLowerCase().includes(keyword) || t.type.toLowerCase().includes(keyword) || t.amount.toString().includes(keyword);
      
      const matchesFilter = filter === "all" ? true : t.type === filter;
      
      return matchesSearch && matchesFilter;
    
    });
      
      return (

        <div>
          
          <div className="filters">

            <input type="text" placeholder="Search by category, type or amount..." value={search} onChange={(e) => setSearch(e.target.value)}/>

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

                  <span>
                    
                    {new Date(t.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  
                </div>

              </div>
              
              <div className="txn-right">
                
                <div className={t.type === "income" ? "green" : "red"}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </div>
                
                <button className="delete-btn" onClick={() => handleDelete(t.id)}>🗑️</button>
              
              </div>

            </div>
          ))}

          {filteredList.length === 0 && (
            
            <div className="empty-state">
              
              <h2>📭</h2>
              <p>No transactions found.</p>
              <small>
                Try another search or add a new transaction.
              </small>

            </div>
          )}
          
          {/* Modal */}
          
          {open && (
            
            <div className="modal" onClick={() => setOpen(false)}>
              
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

                <h3>Add Transaction</h3>

                <input type="number" min="1" placeholder="Enter Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}/>

                {errors.amount && ( <small className="error"> {errors.amount} </small>)}

                <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value,})}>
                  
                  <option value="">Select Category</option>
                  
                  <option value="Food">Food</option>
                  
                  <option value="Transport">Transport</option>
                  
                  <option value="Shopping">Shopping</option>
                  
                  <option value="Salary">Salary</option>
                  
                  <option value="Entertainment">Entertainment</option>
                  
                  <option value="Bills">Bills</option>
                  
                  <option value="Other">Other</option>
                  
                </select>

                {errors.category && (<small className="error"> {errors.category} </small>)}

                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>

                <button onClick={handleAdd} disabled={ !form.amount || !form.category}>
                  Add Transaction
                </button>

              </div>

            </div>

          )}

        </div>

      );
      
}
