import xlsx from 'xlsx'
import Expense from "../models/Expense.model.js"

export const addExpense = async (req, res) => {
    const userId = req.auth.userId;
    try {
        const { category, amount , date } = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"})
        }

        const newExpense = new Expense ({
            userId,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save()
        res.json({success: true, newExpense})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllExpense = async (req, res) => {
    try {
        const userId = req.auth?.userId;
        const expense = await Expense.find({userId}).sort({date: -1})
        res.json(expense)
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteExpense = async (req, res) => {
    try {
        
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message: "Deleted successfully Expense"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const downloadexpense = async (req, res) => {
    const userId = req.auth?.userId;
    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}