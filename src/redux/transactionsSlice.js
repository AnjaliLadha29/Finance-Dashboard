import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../data/mockData";

const transactionsSlice = createSlice({

  name: "transactions",
  initialState: {
    list: mockTransactions,
    filter: "all",
    search: ""
  },

  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
  
});

export const { addTransaction, setFilter, setSearch } = transactionsSlice.actions;
export default transactionsSlice.reducer;