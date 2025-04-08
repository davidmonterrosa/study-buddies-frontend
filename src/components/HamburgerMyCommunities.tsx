import React, { useState } from "react";
import ViewCommunityButton from "./ViewCommunityButton";

const MyCommunitiesSidebar = () => {
    const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  
    // List of communities user is apart of example
    const communities = ['Spanish', 'French', 'German', 'Italian'];

  return (
    <div className="flex flex-col w-64 h-full rounded-r-[15px] bg-white bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] p-4 shadow-lg">
      <h1 className="text-center text-2xl font-bold m-4 text-black dark:text-white">My Communities</h1>
      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default MyCommunitiesSidebar;
