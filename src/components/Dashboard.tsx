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
// import MyCommunitiesPanel from './SidePanel'
import { PanelLeft } from 'lucide-react'
import SessionsComponent from './SessionsComponent'

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateSessionModal from './CreateSession'
import { DialogHeader } from './ui/dialog'
import { useSidebar } from '@/app/(pages)/layout'

interface CommunityDashboardProps {
  communityId: number;
}

const CommunityDashboard: React.FC<CommunityDashboardProps> = ({ communityId }) => {
  const [communityData, setCommunityData] = useState<ICommunityData>()
  const [showDM, setShowDM] = useState(false)
  const [buddyToDM, setBuddyToDm] = useState<number>(-1)
  const [activeTab, setActiveTab] = useState('communityBoardTab');
  const messageContainerRef = useRef<HTMLDivElement | null>(null)
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState<any>(null);

  const { toggleSidebar } = useSidebar();

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

  useEffect(() => {
    const stored = localStorage.getItem('dashboardTab');
    if (stored && stored !== activeTab) {
      setActiveTab(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardTab', activeTab);
  }, [activeTab]);

  const handleMessaging = (buddyId: number) => {
    setBuddyToDm(buddyId);
    setShowDM(true)
  }
  const handleSessionCreated = (session: any) => {
    setNewSession(session);
    setShowModal(false);
  };

  return (
    <>
      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center gap-0 lg:flex-row md:items-center md:justify-between">
        {/* Button + Title + Badges as one group */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
          {/* Sidebar button (only visible on lg) */}
          <button
            onClick={toggleSidebar}
            className="text-black cursor-pointer dark:text-white hidden lg:block"
          >
            <PanelLeft />
          </button>
          {/* Title and badges together */}
          <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-5">
            <h1 className="text-xl md:text-2xl lg:text-[30px] font-bold text-black dark:text-white">
              {communityData?.communityName || 'Community'}
            </h1>
            {/* Difficulty & Subject badges */}
            <div className="flex flex-wrap justify-center mb-1 lg:mb-0 gap-4 md:gap-5">
              <div className={`${getDifficultyColor(communityData?.communityDifficulty || 'Beginner')}
                 text-center text-black rounded-[10px] py-[2px] px-[5px] max-h-10 w-25 text-sm font-semibold`}>
                <p>{communityData?.communityDifficulty || 'Beginner'}</p>
              </div>
              <div className="bg-[#818CF8] text-center rounded-[10px] py-[2px] px-[5px] max-h-10 w-25 text-sm font-semibold">
                <p>{communityData?.communitySubject || 'Subject'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col  h-[90%] lg:h-[94%] xl:h-[96%]">
        <TabsList className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border dark:border-[#aa7dfc40] lg:border-0 lg:bg-transparent lg:dark:bg-transparent lg:dark:border-0  w-full rounded-lg">
          <TabsTrigger value="communityBoardTab" className="tab-trigger cursor-pointer">Community Board</TabsTrigger>
          <TabsTrigger value="sessionsTab" className="tab-trigger cursor-pointer">Sessions</TabsTrigger>
          <TabsTrigger value="buddiesTab" className="tab-trigger cursor-pointer">Buddies</TabsTrigger>
        </TabsList>

        <Separator className="rounded-sm dark:border-white border-[1px]" />

        <div className="flex flex-col flex-grow min-h-0 overflow-hidden">
          <TabsContent value="communityBoardTab" className="flex flex-col flex-grow min-h-0 overflow-hidden">
            {communityData ? (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <CommunityBoard
                    communityGroupId={communityId}
                    chats={communityData.communityChats}
                  />
                </div>
                {/* The input bar in CommunityBoard should be sticky or fixed as needed */}
              </div>
            ): <h1 className='text-2xl text-center'>This community no longer exists</h1>
            }
          </TabsContent>

          <TabsContent value="sessionsTab" className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Scrollable content */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar pt-4 pb-3"> {/* Add padding bottom so sticky button isn't overlapped */}
              <SessionsComponent communityId={communityId} newSession={newSession} fetchAfterCreate={true} />
            </div>

            {/* Sticky Button at Bottom (small screens only) */}
            <div className="sticky bottom-0 h-[50px] z-10 p-2 border-t border-gray-200 dark:border-[#ffffff0f] bg-white dark:bg-[#100B28]">
              <Dialog open={showModal} onOpenChange={setShowModal}>
                <div className="flex justify-center">
                  <DialogTrigger asChild>
                    <button className="w-[50%] cursor-pointer min-w-[185px] max-w-[700px] flex items-center justify-center px-4 py-2 text-white bg-gradient-to-r from-[#6F58DA] to-[#5131E7] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 rounded-full shadow-md gap-2">
                      <img
                        className="w-[25px] h-[25px] invert"
                        src="/assets/sessions.svg"
                        alt="Join Sessions"
                      />
                      <span className="text-md font-medium">Create Session</span>
                    </button>
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#818CF8] w-[50px] h-[50px] rounded-full flex items-center justify-center">
                        <img
                          className="w-[35px] h-[35px]"
                          src="/assets/sessions.svg"
                          alt="Join Sessions"
                        />
                      </div>
                      <DialogTitle className="text-xl font-bold mt-2">Create a Session</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to schedule your session.
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                  <CreateSessionModal communityId={communityId} onSessionCreated={handleSessionCreated} />
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>


          <TabsContent value="buddiesTab" className="flex-grow overflow-y-auto scrollbar">
            {(communityData && !showDM) ? (
              <BuddiesComponent
                communityGroupId={communityId}
                buddyCount={communityData.communityMemberCount}
                buddies={communityData.communityMembers}
                onMessageClick={ handleMessaging }
              />
            ): <h1 className='text-xl text-center'>This community no longer exists</h1>
            }
            {showDM && <DirectMessage buddy={buddyToDM} onBackClick={() => setShowDM(false)} />}
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export default CommunityDashboard;
