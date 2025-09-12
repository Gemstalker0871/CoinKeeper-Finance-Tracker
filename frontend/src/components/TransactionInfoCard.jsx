import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuCoins } from 'react-icons/lu'

const TransactionInfoCard = ({ title, date, amount, type, hideDeleteBTN, onDelete }) => {
  const getAmountStyles = () => 
    type === "income" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
  console.log("type:", type, "classes:", getAmountStyles());

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100 justify-between">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full">
        <LuCoins />
      </div>

      {/* Left content: title/date */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>

      {/* Right content: amount + delete */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
          <h6 className="text-xs font-medium">
            {type === "income" ? "+" : "-"} ${amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        {!hideDeleteBTN && (
          <button
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
    
  )
}

export default TransactionInfoCard
