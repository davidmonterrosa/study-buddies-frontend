import CommunityContainer from '@/components/CommunityContainer'
import MyCommunitiesPanel from '@/components/MyCommunitiesPanel'
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#110C29] min-h-screen flex flex-col">
      <section className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 flex-grow">
        <MyCommunitiesPanel />
        <CommunityContainer />
      </section>
    </div>
  )
}

export default Dashboard;
