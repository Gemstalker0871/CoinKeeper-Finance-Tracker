export const BASE_URL = "http://localhost:3000"

export const API_PATHS = {
    DASHBOARD: {
        GET_DATA:"/api/v1/dashboard"
    },
    INCOME: {
        ADD_INCOME:"/api/v1/income/add",
        GET_ALL_INCOME:"/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: '/api/v1/income/download'
    },
    EXPENSE: {
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_ALL_EXPENSE:"/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: '/api/v1/expense/download'
    }
}