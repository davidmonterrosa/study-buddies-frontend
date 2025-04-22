import CommunityContainer from '@/components/CommunityContainer'
import CommunityDashboard from '@/components/CommunityDashboard'
import MyCommunitiesPanel from '@/components/MyCommunitiesPanel'
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className='bg-white dark:bg-[#110C29] min-h-[calc(100vh-70px)]'>
      <section className='flex flex-row gap-6 lg:p-4
      '>
        <MyCommunitiesPanel />
       {/* <CommunityContainer />  */}
        <CommunityDashboard/>
      </section>
    </div>
  )
}

export default Dashboard;
