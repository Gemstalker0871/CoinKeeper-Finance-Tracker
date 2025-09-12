import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {type: String, ref: "User", required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
}, {timestamps: true})

 const ExpenseSchema = mongoose.model('Expense', expenseSchema)

 export default ExpenseSchema