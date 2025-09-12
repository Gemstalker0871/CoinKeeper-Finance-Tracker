import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useUser, useClerk, SignedIn, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import Infocard from '../components/Infocard';
import {LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut} from "react-icons/lu"
import {IoMdCard} from 'react-icons/io'
import { addThousandsSeparator } from '../utils/helper';
import RecentTransactions from '../components/RecentTransactions';
import ExpenseTransactions from '../components/ExpenseTransactions';
import Last30DaysExpenses from '../components/Last30DaysExpenses';

const Dashboard = () => {
  const { user } = useUser();

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const fetchDashboardData = async () => {
    if(loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )


      if (response.data){
        setDashboardData(response.data)
      }

    } catch (error) {
        console.log("DIdnt recieve data", error);
        
    } finally{
      setLoading(false)
    }

  }


    useEffect(() => {
      fetchDashboardData()
      return () => {}
    }, [])


  return (
    <DashboardLayout activeMenu ="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

          <Infocard icon = {<IoMdCard/>}
           label="Total Balance"
           value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
           color="bg-red-500"
          />
          
          <Infocard icon = {<LuWalletMinimal/>}
           label="Total Income"
           value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
           color="bg-orange-500"
          />
          <Infocard icon = {<LuHandCoins/>}
           label="Total Expense"
           value={addThousandsSeparator(dashboardData?.totalExpensee || 0)}
           color="bg-pink-500"
          />

        </div>

        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions = {dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
          />


          <ExpenseTransactions transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore = {() => navigate("/expense")}
          />

          <Last30DaysExpenses data={dashboardData?.last30DaysExpenses?.transactions || []} />

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard