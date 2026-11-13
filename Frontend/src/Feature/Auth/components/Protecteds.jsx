import { useAuth } from '../Hooks/useAuth'
import {Navigate} from "react-router"
import React, { Children } from 'react'

const Protecteds = ({children}) => {
    const {user , loading } = useAuth()
    if(loading){
        return (<main><h1>Loading....</h1></main>)
    }
    if(!user){
        return <Navigate to={'/login'} />  }
 return Children
}

export default Protecteds