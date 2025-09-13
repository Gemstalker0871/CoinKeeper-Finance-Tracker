import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import IncomeOverview from '../components/IncomeOverview'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import Modal from '../components/Modal';
import AddIncomeForm from '../components/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import DeleteAlert from '../components/DeleteAlert';

const Income = () => {

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: false
})
  const [ openAddIncomeModal ,setOpenAddIncomeModal] = useState(false)

  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

      if (response.data){
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }

  }
  const handleAddIncome = async (income) => {
    const {source, amount, date} = income

    if(!source.trim()){
      toast.error("Source is required")
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date
      })

      setOpenAddIncomeModal(false)
      toast.success("Added Income")
      fetchIncomeDetails()

    } catch (error) {
      console.log(error.response?.data.message || error.message);
      
    }


  }
  const deleteIncome = async (id) => {
      try {
        await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

        setOpenDeleteAlert({show: false, data: null})
        toast.success("Deleted")
        fetchIncomeDetails()
      } catch (error) {
        console.log(error.response?.data.message || error.message);
      }
  }
  const handleDownloadIncomeDetails = async () => {
try {
          const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
            responseType: "blob",
          })

          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement("a")
          link.href =url
          link.setAttribute("download", "income_details.xlsx")
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link)
          window.URL.revokeObjectURL(url)
        } catch (error) {
          console.log(error.response?.data.message || error.message);
          toast.error("Failed to download")
        }
  }

  useEffect(() => {
    fetchIncomeDetails()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu ="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions = {incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
            />

          </div>


          <IncomeList transactions ={incomeData}
          onDelete ={(id) => {
            setOpenDeleteAlert({show: true, data: id})
          }}
          onDownload = {handleDownloadIncomeDetails} />

        </div>

        <Modal isOpen={openAddIncomeModal}
        onClose={()=>setOpenAddIncomeModal(false)}
        title="Add Income" >
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome}/>
          </div>
        </Modal>

        <Modal isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income" >
          <DeleteAlert
          content ="Are you sure?"
          onDelete={()=> deleteIncome(openDeleteAlert.data)} 
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income