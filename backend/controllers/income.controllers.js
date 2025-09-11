import xlsx from 'xlsx'
import Income from "../models/Income.model.js"

export const addIncome = async (req, res) => {
    const userId = req.auth.userId;
    try {
        const { source, amount , date } = req.body;

        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"})
        }

        const newIncome = new Income ({
            userId,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()
        res.json({success: true, newIncome})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllIncome = async (req, res) => {
    try {
        const userId = req.auth?.userId;
        const income = await Income.find({userId}).sort({date: -1})
        res.json(income)
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteIncome = async (req, res) => {
    try {
        
        await Income.findByIdAndDelete(req.params.id)
        res.json({message: "Deleted successfully Income"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const downloadIncome = async (req, res) => {
    const userId = req.auth?.userId;
    try {
        const income = await Income.find({userId}).sort({date: -1});

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb, 'income_details.xlsx')
        res.download('income_details.xlsx')
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}