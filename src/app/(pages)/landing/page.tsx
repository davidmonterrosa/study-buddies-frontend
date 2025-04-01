import CommunityCard from '@/components/CommunityCard'
import NavBarComponent from '@/components/NavBarComponent'
import React from 'react'

const Dashboard = () => {
  return (
      <div className='bg-white'>
        <NavBarComponent/>
        <h1 className='text-black'> Welcome to the Dashboard</h1>
        <CommunityCard/>
    </div>
  )
}

export default Dashboard