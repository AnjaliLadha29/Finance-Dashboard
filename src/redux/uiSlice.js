import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  theme: "light",
  loading: false,
  toast: null
};

const uiSlice = createSlice({

  name: "ui",
  initialState,

  reducers: {

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    showToast: (state, action) => {
      state.toast = action.payload;
    },

    hideToast: (state) => {
      state.toast = null;
    }

  }

});

export const
{
  setTheme,

  setLoading,

  showToast,

  hideToast

} = uiSlice.actions;

export default uiSlice.reducer;
