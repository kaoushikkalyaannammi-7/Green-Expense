import { useEffect, useState } from "react";
import AddExpenseModal from "../components/AddExpenseModal.jsx";
import './Expenses.css';
import ExpenseCard from "../components/ExpenseCard.jsx";
import {
  fetchExpensesThunk,
  removeExpenseThunk,
} from "../redux/slices/expensesSlice.js";

import { useSelector, useDispatch } from "react-redux";

function Expenses() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { list: expenses, loading, error } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    dispatch(fetchExpensesThunk());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(removeExpenseThunk(id));
  };

  // helper to format Month Year
  const formatMonthYear = (date) => {
    return new Date(date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="app-content">
        <h1>Expenses Page</h1>

        <button
          onClick={() => {
            setEditingExpense(null);
            setShowModal(true);
          }}
        >
          Add Expense
        </button>
        {showModal && (
          <AddExpenseModal
            expense={editingExpense}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              dispatch(fetchExpensesThunk());
            }}
          />
        )}

        <div>
          {expenses.length === 0 && <p>No expenses Added Yet</p>}

          {(() => {
            let lastMonth = null;

            return expenses.map((expense) => {
              const month = formatMonthYear(expense.date);
              const showHeader = month !== lastMonth;
              lastMonth = month;

              return (
                <div key={expense._id}>
                  {showHeader && (
                    <div className="month-separator">{month}</div>
                  )}

                  <ExpenseCard
                    expense={expense}
                    onDelete={() => handleDelete(expense._id)}
                    onEdit={(expense) => {
                      setEditingExpense(expense);
                      setShowModal(true);
                    }}
                  />
                </div>
              );
            });
          })()}
        </div>

        
      </div>
    </>
  );
}

export default Expenses;