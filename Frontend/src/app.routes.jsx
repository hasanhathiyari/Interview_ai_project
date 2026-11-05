import {createBrowserRouter } from "react-router";
import Login from "./Feature/Auth/pages/Login.jsx"
import Register from "./Feature/Auth/pages/Register.jsx"



export const router = createBrowserRouter([
    {
        path:"/Login",
        element:<Login />
    },{
        path:"/register",
        element:<Register />
    }
])