import {useState,useEffect} from 'react';
import axios from 'axios';

function AddExpenseModal(props){
const [formData,setFormData]=useState({
    title:"",
    amount:"",
    category:"Food",
    expenseType:"Daily",
    frequency:"",
    paymentMethod:"Cash",
    date:"",
    notes:"",

});
const token=localStorage.getItem("token");

useEffect(()=>{
    if(props.expense){
        setFormData({
            title:props.expense.title || "",
            amount:props.expense.amount || "",
            category:props.expense.category || "Food",
            expenseType:props.expense.expenseType || "Daily",
            frequency:props.expense.frequency || "",
            paymentMethod:props.expense.paymentMethod || "Cash",
            date:props.expense.date ? new Date(props.expense.date).toISOString().split('T')[0] : "",
            notes:props.expense.notes || "",
        })
    }
},[props.expense]);

const handleSubmit=async(e)=>{
    e.preventDefault();
    const payload={
        ...formData,  
        frequency: formData.frequency==="" ? null : formData.frequency,
        
    };
    try{
        if(props.expense){
            //update expense
            await axios.put(`http://localhost:5000/api/expenses/${props.expense._id}`,payload,{
                headers:{Authorization:`Bearer ${token}`},
            });
            alert("Expense updated successfully");
        }
        else{
            await axios.post("http://localhost:5000/api/expenses",payload,{
                headers:{Authorization:`Bearer ${token}`},
            });
            alert("Expense added successfully");
        }
        props.onSuccess();
        props.onClose();
    }catch(err){
        console.log("error while saving expense:", err);
        alert("Error occurred while saving expense");
    }
}

return(
    <div>
        <div>
            <h2>{props.expense ? "Update Expense" : "Add Expense"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e)=>setFormData({...formData,title:e.target.value})}
                    required
                    ></input>
                </div>
                <div>
                    <label >Amount</label>
                    <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={(e)=>setFormData({...formData,amount:e.target.value})}
                    required
                    ></input>
                </div>
                <div>
                    <label >Category</label>
                    <select 
                    value={formData.category}
                    name='category'
                    onChange={(e)=>setFormData({...formData,category:e.target.value})}
                    >
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Rent">Rent</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label >Expense Type</label>
                    <select 
                    value={formData.expenseType}
                    onChange={(e)=>setFormData({...formData,expenseType:e.target.value})}
                    >
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>

                <div>
                    <label >Frequency</label>
                    <select 
                    value={formData.frequency}
                    onChange={(e)=>setFormData({...formData,frequency:e.target.value})}
                    >
                        <option value="">None</option>
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>

                <div>
                    <label >Payment Method</label>
                    <select 
                    value={formData.paymentMethod}
                    onChange={(e)=>setFormData({...formData,paymentMethod:e.target.value})}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="UPI">UPI</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label >Date</label>
                    <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e)=>setFormData({...formData,date:e.target.value})}
                    ></input>
                </div>
                <div>
                    <label >Notes</label>
                    <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={(e)=>setFormData({...formData,notes:e.target.value})}
                    ></textarea>
                </div>
                <div>
                    <button type="submit">{props.expense ? "Update" : "Add"} Expense</button>
                    <button type="button" onClick={props.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
)
}

export default AddExpenseModal;