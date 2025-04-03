import CommunityCard from '@/components/CommunityCard'
import MyCommunitiesPanel from '@/components/MyCommunitiesPanel'
import NavBarComponent from '@/components/NavBarComponent'
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className='bg-white'>
      <section className='flex flex-row gap-6 p-6'>
        <MyCommunitiesPanel/>
        <div className='w-full bg-white rounded-lg dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] max-w-full lg:max-w-[80%] h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-4 2xl:grid-cols-4 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)] p-4'>
          <CommunityCard 
            communityName="Spanish"
            subject="Language"
            buddies={121}
            difficulty="Beginner"
            initials="BB"
            userName="Bea Boeteng"
            isPublic={true}
          />
          <CommunityCard 
            communityName="French"
            subject="Language"
            buddies={98}
            difficulty="Intermediate"
            initials="FB"
            userName="François Boucher"
            isPublic={false}
          />
          <CommunityCard 
            communityName="German"
            subject="Language"
            buddies={50}
            difficulty="Advanced"
            initials="GB"
            userName="Gerhard Becker"
            isPublic={true}
          />
          <CommunityCard 
            communityName="Italian"
            subject="Language"
            buddies={75}
            difficulty="Beginner"
            initials="IB"
            userName="Irene Bellini"
            isPublic={false}
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard;
