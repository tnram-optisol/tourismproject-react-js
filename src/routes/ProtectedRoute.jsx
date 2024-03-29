import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";




const ProtectedRoute = () =>{
    const role = useSelector((state)=>state.auth.value.role);
    if(role === 2){
        return <Outlet/>
    }
    if(role === 1){
        return <Outlet/>
    }
    if(role === 3){
        return <Outlet/>
    }
    if(role === 4){
        return <Outlet/>
    }
    return <Navigate to="/signin" replace /> 
    
}

export default ProtectedRoute;