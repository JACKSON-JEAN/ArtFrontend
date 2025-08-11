import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}>
        <nav>
            <Link to="/dashboard">Artwork</Link>
            <Link to="/users">Users</Link>
        </nav>
    </div>
  )
}

export default Dashboard