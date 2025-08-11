import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'

const DashboardLayout = () => {
  return (
    <div className=' relative'>
        <Dashboard/>
        <Outlet />
        heyyyy
    </div>
  )
}

export default DashboardLayout