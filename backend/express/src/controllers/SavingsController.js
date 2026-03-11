import Expense from "../models/Expenses.js";
import Savings from "../models/Savings.js";
import User from "../models/User.js";
import { calculateTotalSavings } from "../utils/calculateTotalSavings.js";
import { recalculateSavings } from "../utils/recalculateSavings.js";
import { syncCompleteSavings } from "../utils/syncCompleteSavings.js";
// Helper to get current month/year
const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth(), // 0-11
    year: now.getFullYear(),
  };
};

// Calculate monthly savings
export const calculateMonthlySavings = async (req, res) => {
    try{
  const userId = req.user;
  const { month, year } = getCurrentMonthYear();
  const { income, incomeType } = req.body;

  if (!income || income <= 0) {
  return res.status(400).json({ message: "Invalid income amount" });
}

  let totalIncome =
    incomeType === "Monthly" || incomeType === "PocketMoney"
      ? Number(income)
      : Number(income) / 12;

  // Save income
  let savingsDoc= await Savings.findOne({ user: userId, month, year });
  if(!savingsDoc){
    savingsDoc=new Savings({
        user:userId,
        month,
        year,
        income: totalIncome,
        incomeType,
        extraIncome:0,
        expense:0,
        savings:0,
    })
  }
  else{
    savingsDoc.income=totalIncome;
    savingsDoc.incomeType=incomeType; 
  }

  await savingsDoc.save();
  // 🔁 Recalculate savings
  const updatedSavings = await recalculateSavings(userId, month, year);
  const totalSavings = await syncCompleteSavings(userId);

  res.status(200).json({
    monthlySavings: updatedSavings,
    totalSavings,
  });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 





//// ➕ Add extra income for current month
export const addExtraIncome = async (req, res) => {
  try {
    const userId = req.user;
    const { month, year } = getCurrentMonthYear();
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    let savingsDoc = await Savings.findOne({ user: userId, month, year });

    if (!savingsDoc) {
      savingsDoc = new Savings({
        user: userId,
        month,
        year,
        income: 0,
        extraIncome: Number(amount),
        expense: 0,
        savings: 0,
      });
    } else {
      savingsDoc.extraIncome =
        (savingsDoc.extraIncome || 0) + Number(amount);
    }

    await savingsDoc.save();

    // 🔁 Recalculate everything
    const updatedSavings = await recalculateSavings(userId, month, year);
    const totalSavings = await syncCompleteSavings(userId);
    res.status(200).json({
      message: "Extra income added successfully",
      monthlySavings: updatedSavings,
      totalSavings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get current month savings + total savings
export const getCurrentSavings = async (req, res) => {
  try {
    const userId = req.user;
    const { month, year } = getCurrentMonthYear();

    // 1️⃣ Get current month savings document
    const currentSavings = await Savings.findOne({
      user: userId,
      month,
      year,
    });

    // 2️⃣ If no savings calculated yet
    if (!currentSavings) {
      return res.status(200).json({
        savings: null,
        message: "No savings calculated for current month",
      });
    }

    // 3️⃣ Get total savings (all time)
    const totalSavings =currentSavings.completeSavings;

    const baseIncome= currentSavings.income|| 0;
    const extraIncome= currentSavings.extraIncome || 0;
    const totalIncome= baseIncome + extraIncome;
    // 4️⃣ Send structured response
    res.status(200).json({
      savings: {
        month: currentSavings.month,
        year: currentSavings.year,
        baseIncome: baseIncome,
        extraIncome: extraIncome,
        totalIncome: totalIncome,
        expense: currentSavings.expense,
        savings: currentSavings.savings,          // monthly savings
        completeSavings: totalSavings,             // all-time savings
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSavingsHistory=async(req,res)=>{
  try{
const userId=req.user;

const now=new Date();
const currentMonth=now.getMonth();
const currentYear=now.getFullYear();

const history=await Savings.find({
  user:userId,
  $or:[
    {year:{$lt:currentYear}},
    {year:currentYear,month:{$lt:currentMonth}}
  ]
})
.sort({year:-1,month:-1})
.select("month year savings expense income extraIncome");
res.status(200).json({history});
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
}