import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AdSection from '../components/AdSection'

const Layout = () => {
  return (
    <div className=' relative'>
        <AdSection/>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout