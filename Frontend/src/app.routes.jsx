import {createBrowserRouter } from "react-router";
import Login from "./Feature/Auth/pages/Login.jsx"
import Register from "./Feature/Auth/pages/Register.jsx"
import Protecteds from "./Feature/Auth/components/Protecteds.jsx";
import Home from "./Feature/Interview/pages/Home.jsx";
import Interview from "./Feature/Interview/pages/Interview.jsx";



export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login />
    },{
        path:"/register",
        element:<Register />
    },{
        path:"/",
        element:<Protecteds ><Home /></Protecteds>
    },{
        path:"/interview/:interviewId",
        element:<Protecteds ><Interview /></Protecteds>
    }
])
