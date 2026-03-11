import BillReminder from "../models/Bills.js";

//to create a bill
export const createBill = async (req, res) => {
  try {
    const bill = await BillReminder.create({
      user: req.user,
      title: req.body.title,
      description: req.body.description,
      amount: Number(req.body.amount),
      dueDate: new Date(req.body.dueDate),
      isRecurring: req.body.isRecurring || false,
      recurrence: req.body.recurrence || null,
      category: req.body.category || "General",
    });

    res.status(201).json(bill);
  } catch (err) {
    console.error("Create Bill Error:", err);
    res.status(500).json({ message: "Failed to create bill" });
  }
};

//to get all bills
export const getBills = async (req, res) => {
  try {
    const bills = await BillReminder.find({ user: req.user }).sort({
      dueDate: 1
    });

    res.status(200).json(bills);
  } catch (error) {
    console.error("Get Bills Error:", error);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
};

//to get bill by id
export const getBillById = async (req, res) => {
  try {
    const bill = await BillReminder.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Get Bill By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch bill" });
  }
};

//to update bill
export const updateBill = async (req, res) => {
  try {
    const bill = await BillReminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true, runValidators: true }
    );

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Update Bill Error:", error);
    res.status(500).json({ message: "Failed to update bill" });
  }
};

// to mark a bill as paid
export const markBillPaid = async (req, res) => {
  try {
    const bill = await BillReminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      {
        status: "paid",
        reminderSent: true
      },
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Mark Paid Error:", error);
    res.status(500).json({ message: "Failed to mark bill as paid" });
  }
};

//to delete a bill
export const deleteBill = async (req, res) => {
  try {
    const bill = await BillReminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Delete Bill Error:", error);
    res.status(500).json({ message: "Failed to delete bill" });
  }
};