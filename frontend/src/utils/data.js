import {LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut} from "react-icons/lu"

export const SIDE_MENU_DATA =[
    {
        id:"01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Expenses",
        icon: LuWalletMinimal,
        path: "/expenses",
    },
    { 
        id: "03",
        label: "Income",
        icon: LuHandCoins,
        path: "/income",
    },
    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "logout", // you can handle this with a button instead of a route
    },
]