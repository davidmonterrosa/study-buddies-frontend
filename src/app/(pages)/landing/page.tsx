import NavBarComponent from '@/components/NavBarComponent'
import React from 'react'

const Dashboard = () => {
  return (
      <div className='bg-white'>
        <NavBarComponent/>
        <h1 className='text-black'> Welcome to the Dashboard</h1>
    </div>
  )
}

export default Dashboard