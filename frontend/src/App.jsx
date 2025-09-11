import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Income from './pages/Income'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          

          <Route path='/login' element ={<Login />} />

          <Route path='/' element ={<Dashboard />} />

          <Route path='/expenses' element ={<Expenses />} />

          <Route path='/income' element ={<Income />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
