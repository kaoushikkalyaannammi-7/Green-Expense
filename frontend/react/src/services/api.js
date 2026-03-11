import axios from "axios";
const BASE_URL="http://localhost:5000/api";
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ======================
   EXPENSES
====================== */

export const fetchExpenses = async () => {
  const res = await axios.get(`${BASE_URL}/expenses`, authHeader());
  return res.data.expenses;
};


export const getExpenses = async () => {
  const res = await axios.get(`${BASE_URL}/expenses`, authHeader());
  return res.data.expenses;
};

export const addExpense = async (data) => {
  const res = await axios.post(`${BASE_URL}/expenses`, data, authHeader());
  return res.data.expense;
};

export const updateExpense = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/expenses/${id}`, data, authHeader());
  return res.data.expense;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${BASE_URL}/expenses/${id}`, authHeader());
  return id;
};
// 🔐 auth helper

export const fetchSavings = async () => {
  const res = await axios.get(`http://localhost:5000/api/savings/current`, authHeader());
  return res.data.savings;
};

const BILL_URL = "http://localhost:5000/api/bills";

/**
 * Get all bills for the logged-in user
 */
export const getAllBills = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BILL_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Create a new bill
 * @param {Object} billData
 */
export const createBill = async (billData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${BILL_URL}`, billData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Update an existing bill
 */
export const updateBill = async (id, billData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${BILL_URL}/${id}`, billData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Mark a bill as paid
 */
export const markBillPaid = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(`${BILL_URL}/${id}/pay`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Delete a bill
 */
export const deleteBill = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${BILL_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


const DEBT_URL="http://localhost:5000/api/debts";
//to create a new debt
export const createDebt=async(data)=>{
  const res=await axios.post(`${DEBT_URL}`,data,authHeader());
  return res.data.debt;
}
//to  get debts
export const getDebts=async()=>{
  const res=await axios.get(`${DEBT_URL}`,authHeader());
  return res.data;
};
//delete a debt
export const deleteDebt=async(id)=>{
  await axios.delete(`${DEBT_URL}/${id}`,authHeader());
  return id;
}