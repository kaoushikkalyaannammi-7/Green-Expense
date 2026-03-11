import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../../services/api.js";



export const fetchExpensesThunk = createAsyncThunk(
  "expenses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const expenses = await getExpenses();
      return expenses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createExpenseThunk = createAsyncThunk(
  "expenses/create",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const expense = await addExpense(data);

      // Better to trigger savings refresh from component
      // dispatch(fetchSavingsThunk());

      return expense;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editExpenseThunk = createAsyncThunk(
  "expenses/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const expense = await updateExpense(id, data);
      return expense;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeExpenseThunk = createAsyncThunk(
  "expenses/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteExpense(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ======================
   SLICE
====================== */

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchExpensesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createExpenseThunk.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(editExpenseThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (e) => e._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(removeExpenseThunk.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (e) => e._id !== action.payload
        );
      });
  },
});

export default expenseSlice.reducer;
