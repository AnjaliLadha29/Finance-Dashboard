import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import Insights from "./components/Insights/Insights";

export default function App()
{
  const [open, setOpen] = useState(false);

  return (

    <div className="container">

      <Dashboard />
      <Transactions open={open} setOpen={setOpen} />
      <Insights />
      <button className="fab" onClick={() => setOpen(true)}>+</button>

    </div>
    
  );

}