import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import ExpenseOverview from '../components/ExpenseOverview'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import Modal from '../components/Modal';
import AddExpenseForm from '../components/AddExpenseForm';
import { toast } from 'react-hot-toast';
import ExpenseList from '../components/ExpenseList';
import DeleteAlert from '../components/DeleteAlert';

const Expenses = () => {

  const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: false
  })
    const [ openAddExpenseModal ,setOpenAddExpenseModal] = useState(false)



      const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)

      if (response.data){
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }

  }
  const handleAddExpense = async (expense) => {
    const {category, amount, date} = expense

    if(!category.trim()){
      toast.error("Category is required")
      return
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Valid amount")
      return
    }
    if(!date){
      toast.error("Date is required")
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date
      })

      setOpenAddExpenseModal(false)
      toast.success("Added Expense")
      fetchExpenseDetails()

    } catch (error) {
      console.log(error.response?.data.message || error.message);
      
    }


  }

    const deleteExpense = async (id) => {
      try {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

        setOpenDeleteAlert({show: false, data: null})
        toast.success("Deleted")
        fetchExpenseDetails()
      } catch (error) {
        console.log(error.response?.data.message || error.message);
      }
  }
  const handleDownloadExpenseDetails = async () => {

  }




    useEffect(() => {
        fetchExpenseDetails()
    
        return () => {}
      }, [])

  return (
    <DashboardLayout activeMenu ="Expenses"> 
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
            transactions = {expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
            />

          </div>


          <ExpenseList transactions ={expenseData}
          onDelete ={(id) => {
            setOpenDeleteAlert({show: true, data: id})
          }}
          onDownload = {handleDownloadExpenseDetails} />

        </div>

        <Modal isOpen={openAddExpenseModal}
        onClose={()=>setOpenAddExpenseModal(false)}
        title="Add Expense" >
          <div>
            <AddExpenseForm onAddExpense={handleAddExpense}/>
          </div>
        </Modal>

        <Modal isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show: false, data: null})}
        title="Delete Expense" >
          <DeleteAlert
          content ="Are you sure?"
          onDelete={()=> deleteExpense(openDeleteAlert.data)} 
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expenses