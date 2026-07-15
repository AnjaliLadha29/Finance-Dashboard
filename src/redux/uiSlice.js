import { useState } from "react";

import Dashboard from "./components/Dashboard/Dashboard";

import Transactions from "./components/Transactions/Transactions";

import Insights from "./components/Insights/Insights";

export default function App()

{

  const [open, setOpen] = useState(false);

  return (

    <main className="app">

      <header className="app-header">

        <h1>
          Smart Mini Ledger
        </h1>

        <p>
          Track your income and expenses easily
        </p>

      </header>


      <section className="dashboard-section">

        <Dashboard />

      </section>


      <section className="transactions-section">

        <Transactions
          open={open}
          setOpen={setOpen}
        />

      </section>


      <section className="insights-section">

        <Insights />

      </section>


      <button
        className="fab"
        onClick={() => setOpen(true)}
        aria-label="Add transaction"
      >
        +
      </button>


    </main>

  );
}
