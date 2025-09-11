import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId: {type: String, ref: "User", required: true},
    source: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
}, {timestamps: true})

 const IncomeSchema = mongoose.model('Income', incomeSchema)

 export default IncomeSchema