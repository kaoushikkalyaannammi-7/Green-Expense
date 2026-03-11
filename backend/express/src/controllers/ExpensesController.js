import Expense from "../models/Expenses.js";
 import { recalculateSavings } from "../utils/recalculateSavings.js";
 import { syncCompleteSavings } from "../utils/syncCompleteSavings.js";          

export const addExpense=async(req,res)=>{
    try{
        const{
            title,
            amount,
            category,
            expenseType,
            frequency,
            date,
            paymentMethod,
            expenseLimit,
            notes,
        }=req.body;

        const requiredFields={
            title,
            amount,
            category,
            expenseType,
            paymentMethod,
        }
        for(const [key,value] of Object.entries(requiredFields)){
            if(value===undefined || value===null || value===''){    
                return res.status(400).json({message:`${key} is required`});
            }
        }
//create expense
        const expense=await Expense.create({
            user:req.user,
            title,
            amount,
            category,
            expenseType,
            frequency,
            date,
            paymentMethod,
            expenseLimit,
            notes,
        });
        const now=new Date(date);
        const month=now.getMonth();
        const year=now.getFullYear();

        await recalculateSavings(req.user,month,year);
        await syncCompleteSavings(req.user);
        res.status(201).json({
            message:"Expense added successfully",
            expense,
        });
    }catch(error){
        console.error("Error adding expense:",error);
        res.status(500).json({
            message:"Server Error",
        })

    }
}

//delete expense
export const deleteExpense=async(req,res)=>{
    try{
        const expense=await Expense.findOne({
            _id:req.params.id,
            user:req.user,
        });
        if(!expense){
            return res.status(404).json({
                message:"Expense not found",
            });
        }
        const now=new Date(expense.date);
        const month=now.getMonth();
        const year=now.getFullYear();

        await expense.deleteOne();

        await recalculateSavings(req.user,month,year);
        await syncCompleteSavings(req.user);
        return res.status(200).json({
            message:"Expense deleted successfully",
        });
    }catch(error){
        console.error("Error deleting expense:",error);
        res.status(500).json({
            message:"Server Error",
        })
    }   
}

//get all expenses
export const getExpenses=async(req,res)=>{
    
    try{
        const expenses=await Expense.find({
            user:req.user,
        }).sort({date:-1});
        res.status(200).json({
            message:"Expenses fetched successfully",
            expenses,
    });
    }
    catch(error){
        console.error("Error fetching expenses:",error);
        res.status(500).json({
            message:"Server Error",
        })
    }
}

//get expense by id
export const getExpenseById=async(req,res)=>{
    try{
        const expense=await Expense.findOne({
            _id:req.params.id,
            user:req.user,
        })

        if(!expense){
            return res.status(404).json({
                message:"Expense not found",
            });
        }   
        res.status(200).json({
            message:"Expense fetched successfully",
            expense,
        });

    }
    catch(error){
        console.error("Error fetching expense by id:",error);
        res.status(500).json({
            message:"Server Error",
            error:error.message,
        })
    }
}

//update expense 
export const updateExpense=async(req,res)=>{
    try{
        const expense=await Expense.findOne({
            _id:req.params.id,
            user:req.user
        });
        if(!expense){
            return res.status(404).json({
                message:"Expense not found",
            });
        }
 const allowedUpdates = [
      "title",
      "amount",
      "category",
      "expenseType",
      "frequency",
      "date",
      "paymentMethod",
      "expenseLimit",
      "notes",
    ];

const updates={};
allowedUpdates.forEach((field)=>{
    if(req.body[field]!==undefined){
        updates[field]=req.body[field];
    }
});
        Object.assign(expense,updates);
        await expense.save();

        const now=new Date(expense.date);
        const month=now.getMonth();
        const year=now.getFullYear();
        await recalculateSavings(req.user,month,year);
        await syncCompleteSavings(req.user);

        res.status(200).json({
            message:"Expense updated successfully",
            expense,
        });

    }
    catch(error){
        console.error("Error updating expense:",error);
        res.status(500).json({
            message:"Server Error.failed to update the expense",
            error:error.message,
        })
    }
}