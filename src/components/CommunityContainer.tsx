'use client'
import CommunityCard from '@/components/CommunityCard'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { getAllCommunities, getToken } from '@/utils/Services/DataServices';
import { PanelLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import MyCommunitiesPanel from './MyCommunitiesPanel';
import { useIsMobile } from '@/hooks/use-mobile';

const CommunityContainer: React.FC = () => {
  const [communityGroups, setCommunityGroups] = useState<ICommunityData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isMobile = useIsMobile();
  const pageSize = isMobile ? 6 : 12;

  useEffect(() => {
    const fetchMyCommunities = async () => {
      const data = await getAllCommunities(getToken());
      console.log("Data to paginate:", data.communities)
      setCommunityGroups(data.communities);
    };
    fetchMyCommunities();

  }, []);

  useEffect(() => {
    setCurrentPage(1)
  }, [isMobile])

  const paginatedCommunities = communityGroups.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(communityGroups.length / pageSize);

  return (
    <div className={`flex w-full ${sidebarOpen ? 'lg:gap-4' : ''}`}>
      {/* Sidebar: Only show on lg and when open */}
      {sidebarOpen && (
        <div className="hidden lg:block w-[250px]">
          <MyCommunitiesPanel visible={sidebarOpen} />
        </div>
      )}

      {/* Main content area */}
      <div className={`transition-all duration-400 w-full min-h-[calc(0.68*100vh)] bg-white rounded-lg dark:bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] p-4 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] flex flex-col`}>

        {/* Header */}
        <div className='flex items-center gap-2 mb-4'>
          <button onClick={() => setSidebarOpen(prev => !prev)} className="text-black dark:text-white hidden lg:block">
            <PanelLeft />
          </button>
          <h1 className="text-2xl text-center font-bold text-black dark:text-white">
            Explore Learning Communities
          </h1>
        </div>

        {/* Scrollable content area */}
        <div style={{ height: 'calc(0.80 * 100vh - 1rem)' }}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${sidebarOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4 2xl:grid-cols-5'} xl:grid-cols-4 gap-4`}
          >
            {
              paginatedCommunities.map((communityGroup: ICommunityData, idx: number) => (
                <CommunityCard
                  key={idx}
                  communityId={communityGroup.id}
                  directLink={`communities/${communityGroup.id}`}
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
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === idx + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityContainer;
