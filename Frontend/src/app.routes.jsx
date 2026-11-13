import {createBrowserRouter } from "react-router";
import Login from "./Feature/Auth/pages/Login.jsx"
import Register from "./Feature/Auth/pages/Register.jsx"
import Protecteds from "./Feature/Auth/components/Protecteds.jsx";



export const router = createBrowserRouter([
    {
        path:"/Login",
        element:<Login />
    },{
        path:"/register",
        element:<Register />
    },{
        path:"/",
        element:<Protecteds ><h1>Home page </h1></Protecteds>
    }
])