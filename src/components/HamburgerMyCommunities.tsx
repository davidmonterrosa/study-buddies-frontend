'use client'
import React, { useEffect, useState } from "react";
import ViewCommunityButton from "./ViewCommunityButton";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { currentUser, getMyCommunities, getToken } from "@/utils/Services/DataServices";
import { useAppContext } from "@/context/CommunityContext";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

const MyCommunitiesSidebar = () => {
    const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
    // const [communityGroups, setcommunityGroups] = useState<ICommunityData[]>([]);
    const {communityGroups} = useAppContext(); 

    console.log("This is the communityGroups:", communityGroups);
  
  return (
    <div className="lg:hidden flex flex-col w-64 h-full rounded-r-[15px] bg-white bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] p-4 shadow-lg">
      <h1 className="text-center text-2xl font-bold m-4 text-black dark:text-white">My Communities</h1>
      <div className="space-y-4">
      <div className='flex flex-col gap-2'>
        {/* Map of communities */}
        {communityGroups.map((communityGroup: ICommunityData , idx: number) => (
          <Link key={idx} href={`/communities/${communityGroup.id}`}>
              <ViewCommunityButton
                communityName={communityGroup.communityName}
                isActive={activeCommunity === communityGroup.communityName}
                onClick={() => setActiveCommunity(communityGroup.communityName)}
              />
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MyCommunitiesSidebar;
