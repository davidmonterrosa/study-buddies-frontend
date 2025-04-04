"use client"
import React, { useState } from 'react';
import ViewCommunityButton from './ViewCommunityButton';


const MyCommunitiesPanel = () => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);

  // List of communities user is apart of example
  const communities = ['Spanish', 'French', 'German', 'Italian'];

  return (
    <main className='lg:flex flex-col w-1/5 h-auto hidden shadow-[0_0px_5px_rgba(0,0,0,0.25)] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] rounded-lg p-4'>
      <h1 className='text-center text-2xl font-bold m-4'>My Communities</h1>
      <div className='flex flex-col gap-2'>
        {/* Map of communities */}
      {communities.map((name) => (
          <ViewCommunityButton
            key={name}
            communityName={name}
            isActive={activeCommunity === name}
            onClick={() => setActiveCommunity(name)}
          />
        ))}
      </div>
    </main>
  );
};

export default MyCommunitiesPanel;
