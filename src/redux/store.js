import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import uiReducer from "./uiSlice";

const loadState = () => {

  try
  {
    const saved = localStorage.getItem("state");
    return saved ? JSON.parse(saved) : undefined;
  }
  catch (e)
  {
    return undefined;
  }

};

const store = configureStore({

  reducer: {
    transactions: transactionsReducer,
    ui: uiReducer
  },

  preloadedState: loadState()

});

store.subscribe(() => {

  try
  {
    const state = store.getState();
    
    localStorage.setItem(
      "state",
      JSON.stringify({
        transactions: state.transactions,
        ui: state.ui
      })
    );
  }
  catch (e)
  {
    console.log("Error saving state", e);
  }

});

export default store;