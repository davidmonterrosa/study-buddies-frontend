'use client'

import { getDifficultyColor } from '@/utils/Services/StyleHelpers'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { getCommunityById } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'
import BuddiesComponent from './BuddiesComponent'
import DirectMessage from './DirectMessage'
import CommunityBoard from './GroupMessageBoard'
import MyCommunitiesPanel from './MyCommunitiesPanel'
import { PanelLeft } from 'lucide-react'

interface CommunityDashboardProps {
  communityId: number;
}

const CommunityDashboard: React.FC<CommunityDashboardProps> = ({ communityId }) => {
  const [communityData, setCommunityData] = useState<ICommunityData>()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messageContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchCommunityInfo = async () => {
      const data = await getCommunityById(communityId)
      setCommunityData(data.community)
    }
    fetchCommunityInfo()
  }, [communityId])

  useLayoutEffect(() => {
    const container = messageContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [communityData?.communityChats])

  return (
    <div className={`flex w-full h-screen lg:h-[88vh] ${sidebarOpen ? 'lg:gap-4' : ''}`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="hidden lg:block w-[300px] transition-all duration-300">
          <MyCommunitiesPanel visible={sidebarOpen} />
        </div>
      )}

      {/* Main Content */}
      <main className="w-full p-2 transition-all duration-300 rounded-lg dark:bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] bg-white  lg:p-4 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <header className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="text-black dark:text-white hidden lg:block"
          >
            <PanelLeft />
          </button>
          <h1 className="text-[2rem] font-bold text-black dark:text-white">
            {communityData?.communityName || 'Community'}
          </h1>
          <span className="flex items-center gap-5">
            <div
              className={`${getDifficultyColor(communityData?.communityDifficulty || "Beginner")} text-center text-black rounded-[10px] py-[2px] px-[5px] max-h-10 w-36`}
            >
              <p>{communityData?.communityDifficulty || "Beginner"}</p>
            </div>
            <div className="bg-[#818CF8] text-center rounded-[10px] py-[2px] px-[5px] max-h-10 w-36">
              <p>{communityData?.communitySubject || "Subject"}</p>
            </div>
          </span>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="communityBoardTab" className="flex flex-col h-[calc(90vh-8rem)]">
          <TabsList className="sm:bg-transparent rounded-none gap-12 w-full">
            <TabsTrigger value="communityBoardTab" className="tab-trigger">Community Board</TabsTrigger>
            <TabsTrigger value="sessionsTab" className="tab-trigger">Sessions</TabsTrigger>
            <TabsTrigger value="buddiesTab" className="tab-trigger">Buddies</TabsTrigger>
          </TabsList>

          <Separator className="rounded-sm dark:border-white border-[1px]" />

          <div className="flex flex-col flex-grow overflow-hidden">
            <TabsContent value="communityBoardTab" className="flex flex-col flex-grow overflow-hidden">
              {communityData && (
                <div className="flex flex-col flex-grow h-full">
                  <CommunityBoard
                    communityGroupId={communityId}
                    chats={communityData.communityChats}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="sessionsTab" className="flex-grow overflow-y-auto">
              <DirectMessage />
            </TabsContent>

            <TabsContent value="buddiesTab" className="flex-grow overflow-y-auto">
              {communityData && (
                <BuddiesComponent
                  communityGroupId={communityId}
                  buddyCount={communityData.communityMemberCount}
                  buddies={communityData.communityMembers}
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default CommunityDashboard;
