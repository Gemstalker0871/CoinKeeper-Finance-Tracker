import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { attachInterceptors } from "../src/utils/axiosInstance.js";
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    attachInterceptors(getToken);
  }, [getToken]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/expenses' element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path='/income' element={<ProtectedRoute><Income /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </div>

  );
}

export default App;
