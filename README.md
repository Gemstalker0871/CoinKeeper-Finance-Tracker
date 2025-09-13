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

## Getting Started

### Prerequisites

- Node.js v18+  
- MongoDB running locally or a cloud instance  
- Clerk account (for authentication)  

---

### Setup Backend

1. Navigate to the backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file with:

env
Copy code
PORT=5000
MONGO_URI=<your_mongodb_uri>
NODE_ENV=development
CLERK_SECRET_KEY=<your_clerk_secret_key>
Start the backend server in development:

bash
Copy code
npm run dev
Setup Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file with:

env
Copy code
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
VITE_BASE_URL=http://localhost:5000
Start the frontend development server:

bash
Copy code
npm run dev
Production Build
Build frontend:

bash
Copy code
npm run build --prefix frontend
Start backend (it will serve the frontend statically in production):

bash
Copy code
npm start --prefix backend
API Endpoints
Feature	Endpoint	Method
Dashboard	/api/v1/dashboard	GET
Add Income	/api/v1/income/add	POST
Get Income	/api/v1/income/get	GET
Delete Income	/api/v1/income/:id	DELETE
Download Income	/api/v1/income/download	GET
Add Expense	/api/v1/expense/add	POST
Get Expense	/api/v1/expense/get	GET
Delete Expense	/api/v1/expense/:id	DELETE
Download Expense	/api/v1/expense/download	GET

All API routes are protected by Clerk (via ClerkExpressWithAuth middleware on the backend).
