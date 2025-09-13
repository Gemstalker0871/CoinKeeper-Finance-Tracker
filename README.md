# CoinKeeper

CoinKeeper is a full-stack web application to help users securely **track their finances**, including income and expenses. Users can add, remove, and download their financial data, with an intuitive dashboard to visualize their finances. The app uses **Clerk for authentication**, **React with Vite** for the frontend, and **Express + MongoDB** for the backend.  

---

## Features

- **User Authentication with Clerk**: Secure sign-up, sign-in, and session management (no need to handle JWT manually).  
- **Income & Expense Tracking**: Add, remove, and view income and expense entries.  
- **Dashboard**: Visual representation of financial data with charts.  
- **Data Export**: Download your income and expense data as Excel files.  
- **Responsive Design**: Works on both desktop and mobile devices.  
- **Secure Backend**: Express API connected to MongoDB, protected via Clerk middleware.  

---

## Technologies Used

### Frontend
- React 19
- Vite
- Tailwind CSS
- Clerk React SDK
- Axios
- React Router DOM
- Recharts
- React Hot Toast
- Moment.js

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Clerk SDK for Node (auth & user management)
- CORS
- dotenv
- XLSX for Excel exports
- Nodemon for development

---

## Project Structure

coinkeeper/
├─ backend/ # Express backend
│ ├─ routes/ # API routes for income, expense, dashboard
│ ├─ middleware/ # Clerk auth middleware
│ ├─ config/ # DB connection
│ └─ server.js # Main backend server
├─ frontend/ # React frontend
│ ├─ src/
│ │ ├─ components/ # React components
│ │ ├─ pages/ # Pages like Login, Dashboard
│ │ ├─ utils/ # API paths, axios instance
│ │ └─ main.jsx # Entry point
│ ├─ public/ # Public assets
│ └─ vite.config.js # Vite config
└─ package.json # Root scripts & dependencies

yaml
Copy code

---

e backend).
