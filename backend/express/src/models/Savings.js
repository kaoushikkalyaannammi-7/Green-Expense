import mongoose from "mongoose";

const savingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    month: {
      type: Number, // 0–11
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    income: {
      type: Number,
      default: 0,
      // required: true
    },
    extraIncome: {
        type: Number,
        default: 0,
    },
    incomeType: {
      type: String,
      enum: ["Monthly", "PocketMoney", "Scholarship", "Yearly"],
      // required: true
    },

    expense: {
      type: Number,
      default: 0,
      // required: true
    },

    savings: {
      type: Number,
      default: 0,
      // required: true
    },
    completeSavings:{
      type: Number,
      default: 0,
      // required: true
    }
  },
  { timestamps: true }
);
savingsSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Savings", savingsSchema);