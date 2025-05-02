"use client"
import React, { useEffect, useState } from 'react';
import ViewCommunityButton from './ViewCommunityButton';
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { currentUser, getLoggedInUserData, getMyCommunities, getToken } from '@/utils/Services/DataServices';
import Link from 'next/link';
import { useAppContext } from '@/context/CommunityContext';
// import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";


const MyCommunitiesPanel = () => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  // const [communityGroups, setCommunityGroups] = useState<ICommunityData[]>([]);
  const { communityGroups, setCommunityGroups } = useAppContext();


  useEffect(() => {
    const fetchMyCommunities = async () => {
      const loggedInUser = await getLoggedInUserData(currentUser());
      if(loggedInUser) {
        const data = await getMyCommunities(loggedInUser.user.id, getToken());
        setCommunityGroups(data);
        console.log(data);
      } else {
        console.log("You are logged out")
      }
    }
    fetchMyCommunities();
  }, []);

  useEffect(() => {
    console.log(communityGroups);
  }, [communityGroups])

  return (
    <main className='lg:flex flex-col w-1/5 h-auto hidden shadow-[0_0px_5px_rgba(0,0,0,0.25)] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] rounded-lg p-4'>
      <h1 className='text-center text-2xl font-bold m-2'>My Communities</h1>
      <div className='flex flex-col gap-2'>
        {/* Map of communities */}
        {communityGroups.map((communityGroup: ICommunityData , idx: number) => (
          <Link key={idx} href={`/communities/${communityGroup.id}`} >
              <ViewCommunityButton
                communityName={communityGroup.communityName}
                isActive={activeCommunity === communityGroup.communityName}
                onClick={() => setActiveCommunity(communityGroup.communityName)}
              />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MyCommunitiesPanel;
