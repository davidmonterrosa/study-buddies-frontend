'use client'
import React, { useEffect, useState } from "react";
import ViewCommunityButton from "./ViewCommunityButton";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { currentUser, getMyCommunities, getToken } from "@/utils/Services/DataServices";

const MyCommunitiesSidebar = () => {
    const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
    const [communityGroups, setcommunityGroups] = useState<ICommunityData[]>([]);
  
    useEffect(() => {
      const fetchMyCommunities = async () => {
        const loggedInUser = currentUser();
        if(loggedInUser) {
          const data = await getMyCommunities(loggedInUser.user.id, getToken());
          setcommunityGroups(data);
          console.log(data);
        }
      }
      fetchMyCommunities();
    }, []);
  
  return (
    <div className="lg:hidden flex flex-col w-64 h-full rounded-r-[15px] bg-white bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] p-4 shadow-lg">
      <h1 className="text-center text-2xl font-bold m-4 text-black dark:text-white">My Communities</h1>
      <div className="space-y-4">
      <div className='flex flex-col gap-2'>
        {/* Map of communities */}
      {communityGroups.map((communityGroup: ICommunityData, idx: number) => (
          <ViewCommunityButton
            key={idx}
            communityName={communityGroup.communityName}
            isActive={activeCommunity === communityGroup.communityName}
            onClick={() => setActiveCommunity(communityGroup.communityName)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default MyCommunitiesSidebar;
