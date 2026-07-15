import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import uiReducer from "./uiSlice";

const STORAGE_KEY = "smart-ledger-state";

const loadState = () => {
  try
  {

    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState)
    {
      return undefined;
    }

    const parsedState = JSON.parse(savedState);

    return
    {
      transactions: parsedState.transactions
    };

  }
  catch(error)
  {
    console.error(
      "Failed to load saved state:",
      error
    );
    return undefined;
  }
};

const store = configureStore({

  reducer:
  {
    transactions: transactionsReducer,
    ui: uiReducer
  },

  preloadedState: loadState()

});

store.subscribe(() => {

  try
  {
    const state = store.getState();

    const persistedState =
    {
      transactions: state.transactions
    };

    localStorage.setItem( STORAGE_KEY, JSON.stringify(persistedState));
  }
  catch(error)
  {
    console.error("Failed to save state:", error);
  }
});

export default store;
