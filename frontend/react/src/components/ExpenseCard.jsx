import axios from "axios";
import "./ExpenseCard.css";

function ExpenseCard(props) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${props.expense._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Expense deleted successfully");
      props.onDelete(props.expense._id);
    } catch (err) {
      console.log("Error deleting expense:", err);
      alert("Error occurred while deleting expense");
    }
  };

  return (
   <div className="expense-card">
  <h3>{props.expense.title}</h3>

  <div className="expense-row">
    <p><strong>Amount:</strong> ₹{props.expense.amount}</p>
    <p><strong>Category:</strong> {props.expense.category}</p>
  </div>

  <div className="expense-row">
    <p><strong>Expense Type:</strong> {props.expense.expenseType}</p>
    <p><strong>Payment Method:</strong> {props.expense.paymentMethod}</p>
  </div>

  {props.expense.frequency && (
    <div className="expense-row">
      <p><strong>Frequency:</strong> {props.expense.frequency}</p>
    </div>
  )}

  <div className="expense-row">
    <p><strong>Date:</strong> {new Date(props.expense.date).toLocaleDateString()}</p>
  </div>

  {props.expense.notes && (
    <p><strong>Notes:</strong> {props.expense.notes}</p>
  )}

  <div className="expense-card-actions">
    <button onClick={()=>props.onEdit(props.expense)}>Update</button>
    <button onClick={handleDelete}>Delete</button>
  </div>
</div>
  );
}

export default ExpenseCard;