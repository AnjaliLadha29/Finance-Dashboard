import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../data/mockData";

const initialState = {
  list: mockTransactions
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,

  reducers: {

    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },

    deleteTransaction: (state, action) => {
      state.list = state.list.filter(
        (transaction) => transaction.id !== action.payload
      );
    }

  }

});

export const {
  addTransaction,
  deleteTransaction
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
