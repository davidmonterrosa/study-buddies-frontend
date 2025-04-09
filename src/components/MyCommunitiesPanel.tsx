"use client"
import React, { useEffect, useState } from 'react';
import ViewCommunityButton from './ViewCommunityButton';
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { currentUser, getMyCommunities, getToken } from '@/utils/Services/DataServices';


const MyCommunitiesPanel = () => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const [communityGroups, setCommmunityGroups] = useState<ICommunityData[]>([]);

  useEffect(() => {
    const fetchMyCommunities = async () => {
      const loggedInUser = currentUser();

      // const data = await getAllCommunities(getToken());
      const data = await getMyCommunities(loggedInUser.user.id, getToken());
      console.log(data.communities);
      setCommmunityGroups(data.communities);
    }
    fetchMyCommunities();
  }, []);
  // const communities = ['Spanish', 'French', 'German', 'Italian'];

  return (
    <main className='lg:flex flex-col w-1/5 h-auto hidden shadow-[0_0px_5px_rgba(0,0,0,0.25)] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] rounded-lg p-4'>
      <h1 className='text-center text-2xl font-bold m-4'>My Communities</h1>
      <div className='flex flex-col gap-2'>
        {/* Map of communities */}
      {communityGroups.map((communityGroup: ICommunityData , idx: number) => (
          <ViewCommunityButton
            key={idx}
            communityName={communityGroup.communityName}
            isActive={activeCommunity === communityGroup.communityName}
            onClick={() => setActiveCommunity(communityGroup.communityName)}
          />
        ))}
      </div>
    </main>
  );
};

export default MyCommunitiesPanel;
