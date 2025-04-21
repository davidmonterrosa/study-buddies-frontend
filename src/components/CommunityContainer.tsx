'use client'
import CommunityCard from '@/components/CommunityCard'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { getAllCommunities, getToken } from '@/utils/Services/DataServices';
import React, { useEffect, useState } from 'react'

const CommunityContainer: React.FC = () => {
  const [communityGroups, setcommunityGroups] = useState<ICommunityData[]>([])

  useEffect(() => {
      const fetchMyCommunities = async () => {  
        const data = await getAllCommunities(getToken());
        console.log("Shape of Data from getAllCommunities:", data);
        setcommunityGroups(data.communities);
      }
      fetchMyCommunities();
    }, []);

  return (
    <div className='w-full bg-white rounded-lg dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] max-w-full lg:max-w-[80%] h-auto p-4 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]'>
      <h1 className="text-2xl text-center sm:text-left font-bold mb-4 text-black dark:text-white">
        Explore Learning Communities
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-4 gap-4'>
        {
          communityGroups.map((communityGroup: ICommunityData, idx: number) => (
            <CommunityCard
              key={idx} 
              communityName={communityGroup.communityName}
              subject={communityGroup.communitySubject}
              buddies={communityGroup.communityMemberCount}
              difficulty={communityGroup.communityDifficulty}
              initials="xx"
              userName={communityGroup.communityOwnerName}
              isPublic={communityGroup.communityIsPublic}
            />
          ))

        }
      </div>
    </div>
  )
}

export default CommunityContainer;
