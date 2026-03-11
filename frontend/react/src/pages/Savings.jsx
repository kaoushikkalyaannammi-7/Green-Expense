import { useEffect, useState } from "react";
import BaseIncomeForm from "../components/BaseIncomeForm";
import ExtraIncomeForm from "../components/ExtraIncomeForm";
import {fetchCurrentBalanceThunk} from "../redux/slices/balanceSlice.js";
import { useDispatch,useSelector } from "react-redux";

const Savings = () => {
  const dispatch = useDispatch();
  const { monthlySavings, totalSavings, status, error } = useSelector((state) => state.balance);

  useEffect(() => {
    dispatch(fetchCurrentBalanceThunk());
  }, [dispatch]);

 if(status === 'loading') return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
    <div>
      <h2>Savings Dashboard</h2>

      <BaseIncomeForm refresh={()=>{
        dispatch(fetchCurrentBalanceThunk());
      }} />
      <ExtraIncomeForm refresh={()=>{ 
        dispatch(fetchCurrentBalanceThunk());
      }} />

      {monthlySavings ? (
        <div>
          <p>Base Income: ₹{monthlySavings.baseIncome}</p>
          <p>Extra Income: ₹{monthlySavings.extraIncome}</p>
          <p><b>Total Income:</b> ₹{monthlySavings.totalIncome}</p>

          <p>Expenses: ₹{monthlySavings.expense}</p>
          <p><b>Monthly Savings:</b> ₹{monthlySavings.savings}</p>

          <hr />

          <p><b>Total Savings:</b> ₹{totalSavings}</p>
        </div>
      ) : (
        <p>No savings data for this month</p>
      )}
    </div>
  );
};

export default Savings;
