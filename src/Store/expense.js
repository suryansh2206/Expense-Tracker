import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    totalExpense: 0,
  },
  reducers: {
    addExpense(state, action) {
      const key = action.payload.key;
      const expense = action.payload.expense;
      const description = action.payload.description;
      const category = action.payload.category;
      state.expenses.push({
        key,
        expense,
        description,
        category,
      });
    },
    removeExpense(state, action) {
      let res = state.expenses.find((item) => item.key === action.payload);
      state.expenses = state.expenses.filter(
        (item) => item.key !== action.payload
      );
      state.totalExpense = state.totalExpense - res.expense;
    },
    replaceExpense(state, action) {
      state.expenses = action.payload.items;
      state.totalExpense = action.payload.totalExpense;
    },
  },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice;
