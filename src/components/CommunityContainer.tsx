'use client'
import CommunityCard from '@/components/CommunityCard'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { getAllCommunities, getToken } from '@/utils/Services/DataServices';
import { PanelLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import MyCommunitiesPanel from './MyCommunitiesPanel';

const CommunityContainer: React.FC = () => {
  const [communityGroups, setCommunityGroups] = useState<ICommunityData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchMyCommunities = async () => {
      const data = await getAllCommunities(getToken());
      setCommunityGroups(data.communities);
    };
    fetchMyCommunities();
  }, []);

  return (
    <div className="flex gap-4 w-full">
      <MyCommunitiesPanel visible={sidebarOpen} />

      <div className={`transition-all duration-400 ${sidebarOpen ? 'w-full lg:max-w-[80%]' : 'w-full'} min-h-[calc(0.68*100vh)] bg-white rounded-lg dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] p-4 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] flex flex-col`}>

        {/* Header */}
        <div className='flex items-center gap-2 mb-4'>
          <button onClick={() => setSidebarOpen(prev => !prev)} className="text-black dark:text-white hidden lg:block">
            <PanelLeft />
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Explore Learning Communities
          </h1>
        </div>

        {/* Scrollable content area */}
        <div className="md:overflow-y-auto scrollbar" style={{ height: 'calc(0.80 * 100vh - 1rem)' }}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${sidebarOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4 2xl:grid-cols-5'
              } xl:grid-cols-4 gap-4`}
          >
            {
              communityGroups.map((communityGroup: ICommunityData, idx: number) => (
                <CommunityCard
                  key={idx}
                  communityId={communityGroup.id}
                  communityName={communityGroup.communityName}
                  subject={communityGroup.communitySubject}
                  buddies={communityGroup.communityMemberCount}
                  difficulty={communityGroup.communityDifficulty}
                  initials={communityGroup.communityOwnerName.charAt(0).toUpperCase()}
                  userName={communityGroup.communityOwnerName}
                  isPublic={communityGroup.communityIsPublic}
                  description={communityGroup.communityDescription}
                />
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityContainer;
