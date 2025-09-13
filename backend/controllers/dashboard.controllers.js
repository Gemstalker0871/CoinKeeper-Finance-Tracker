import Expense from "../models/Expense.model.js";
import Income from "../models/Income.model.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.auth?.userId; // Clerk userId is a string

    // --- Aggregations ---
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // --- Last 60 days income ---
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // --- Last 30 days expenses ---
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // --- Recent transactions ---
    const lastIncome = await Income.find({ userId }).sort({ date: -1 }).limit(5);
    const lastExpense = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

    const lastTransactions = [
      ...lastIncome.map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...lastExpense.map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => b.date - a.date);

    // --- Response ---
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
