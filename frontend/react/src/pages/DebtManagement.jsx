import {useEffect,useState} from 'react';
import './DebtManagement.css';
import {useSelector,useDispatch} from "react-redux";
import {fetchDebtsThunk,deleteDebtThunk,createDebtThunk} from "../redux/slices/debtSlice.js";
function DebtManagement(){

    const dispatch=useDispatch();
    const {debts,loading,error}=useSelector((state)=>state.debts);

    const [showForm,setShowForm]=useState(false);
    const [formData,setFormData]=useState({
        title:"",
        principal:"",
        interestRate:"",
        type:"",
        startDate:"",
        durationMonths:"",
    });
const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value,
    });
}

const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(createDebtThunk(formData));    
    setShowForm(false);
    setFormData({
        title:"",
        principal:"",
        interestRate:"",
        type:"",
        startDate:"",
        durationMonths:"",
    });
}

    useEffect(()=>{
        dispatch(fetchDebtsThunk());
    },[dispatch]);
    if(loading)return <p>Loading debts...</p>
    if(error)return <p style={{color: "red"}}>{error}</p>
   return (
    <div className="app-content">

      <div className="debt-header">
        <h1>Debt Management</h1>

        <button
          className="add-debt-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Debt"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="debt-form">

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="principal"
            placeholder="Principal"
            value={formData.principal}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate (%)"
            value={formData.interestRate}
            onChange={handleChange}
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="GIVEN">Given</option>
            <option value="TAKEN">Taken</option>
          </select>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="durationMonths"
            placeholder="Duration (Months)"
            value={formData.durationMonths}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Debt</button>

        </form>
      )}

      {debts.length === 0 && <p>No debts added yet</p>}

      {debts.map((debt) => (
        <div key={debt._id} className="debt-card">

          <h3 className="debt-title">{debt.title}</h3>

          <div className="debt-details">

            <div className="debt-col">
              <p><strong>Principal:</strong> ₹{debt.principal}</p>
              <p><strong>Interest Rate:</strong> {debt.interestRate}%</p>

              <p>
                <strong>Type:</strong>{" "}
                <span
                  className={
                    debt.type === "GIVEN"
                      ? "debt-type-given"
                      : "debt-type-taken"
                  }
                >
                  {debt.type}
                </span>
              </p>
            </div>

            <div className="debt-col">
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(debt.startDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Duration:</strong> {debt.durationMonths} months
              </p>

              <p>
                <strong>Status:</strong> {debt.status}
              </p>
            </div>

          </div>

          <div className="debt-actions">
            <button
              onClick={() => dispatch(deleteDebtThunk(debt._id))}
            >
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default DebtManagement;