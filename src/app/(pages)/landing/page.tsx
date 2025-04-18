import CommunityContainer from '@/components/CommunityContainer'
import CommunityDashboard from '@/components/CommunityDashboard'
import MyCommunitiesPanel from '@/components/MyCommunitiesPanel'
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className='bg-white'>
      <section className='flex flex-row gap-6 lg:p-6 dark:bg-[#110C29]'>
        <MyCommunitiesPanel />
        {/* <CommunityContainer /> */}
        <CommunityDashboard/>
      </section>
    </div>
  )
}

export default Dashboard;
