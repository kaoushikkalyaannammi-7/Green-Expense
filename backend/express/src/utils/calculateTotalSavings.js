import Savings from "../models/Savings.js";
import User from "../models/User.js";
import { syncCompleteSavings } from "./syncCompleteSavings.js";
/**
 * Sums all monthly savings and updates user.totalSavings
 */
export const calculateTotalSavings = async (userId) => {
  const savingsList = await Savings.find({ user: userId });

  const totalSavings = savingsList.reduce(
    (sum, s) => sum + (s.savings || 0),
    0
  );

  await User.findByIdAndUpdate(userId, { totalSavings });

  return totalSavings;
};