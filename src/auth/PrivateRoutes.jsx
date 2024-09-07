import React, { useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authContext } from '../context/DataShare'

function PrivateRoutes() {
    const {auth} = useContext(authContext)
  return (
    <>
        {auth?<Outlet/>:<Navigate to={'/'}/>}
    </>
  )
}

export default PrivateRoutes