"use client"
import { getDifficultyColor } from '@/utils/Services/StyleHelpers'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { getCommunityById } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'
import BuddiesCompononet from './BuddiesComponent'
import DirectMessage from './DirectMessage'
import CommunityBoard from './GroupMessageBoard'

interface CommunityDashboardProps {
  communityId: number;
}



const CommunityDashboard: React.FC<CommunityDashboardProps> = ({
  communityId
}) => {

  const [communityData, setCommunityData] = useState<ICommunityData>()
  

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    const fetchCommunityInfo = async () => {
      console.log("This is the id being passed", communityId)
      const data = await getCommunityById(communityId);
      console.log(data.community.communityName);
      setCommunityData(data.community);
      console.log(data.community.communityMembers)
    }
    fetchCommunityInfo();
  }, [])



  return (
    <main className='w-full bg-white rounded-lg dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] max-w-full lg:max-w-[80%] h-auto p-4 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]'>
      <header className='flex flex-col sm:flex-row sm:items-center mb-4 gap-4'>
  {
    communityData ? (
      <>
        <h1 className='text-[2rem] text-center sm:text-left font-bold text-black dark:text-white'>
          {communityData.communityName}
        </h1>

              <span className='flex place-items-center text-center gap-5'>
                <div className={`${getDifficultyColor(`${communityData?.communityDifficulty}`)} text-black rounded-[10px] py-[2px] px-[5px] max-h-10 w-36`}>
                  <p>{`${communityData.communityDifficulty}`}</p>
                </div>
                <div className='bg-[#818CF8] rounded-[10px] py-[2px] px-[5px] max-h-10 w-36'>
                  <p>{`${communityData.communitySubject}`}</p>
                </div>
              </span>
            </>
          )
            :
            (<>
              <h1 className='text-[2rem] text-center sm:text-left font-bold text-black dark:text-white mr-16'>Community</h1>

              <span className='flex place-items-center text-center gap-5'>
                <div className={`${getDifficultyColor("Beginner")} text-black rounded-[10px] py-[2px] px-[5px] max-h-10 w-36`}>
                  <p>Beginner</p>
                </div>
                <div className='bg-[#818CF8] rounded-[10px] py-[2px] px-[5px] max-h-10 w-36'>
                  <p>Subject</p>
                </div>
              </span>
            </>)
        }
      </header>

      <div>
        <Tabs defaultValue="communityBoardTab">
          <TabsList className="sm:bg-transparent rounded-none gap-12">
            <TabsTrigger
              value="communityBoardTab"
              className="relative px-5 py-2 text-2xl font-semibold transition data-[state=active]:text-primary after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:h-[5px] after:w-full
                        after:rounded-sm data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-none
                        after:bg-transparent data-[state=active]:after:bg-[#818CF8]
                        data-[state=active]:after:shadow-[0_-2px_8px_#818CF870]after:transition-all after:duration-300 after:ease-in-out"
            >
              Community Board
            </TabsTrigger>

            <TabsTrigger
              value="sessionsTab"
              className="relative px-5 py-2 text-2xl font-semibold transition data-[state=active]:text-primary after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:h-[5px] after:w-full
                        after:rounded-sm data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-none
                        after:bg-transparent data-[state=active]:after:bg-[#818CF8]
                        data-[state=active]:after:shadow-[0_-2px_8px_#818CF870]after:transition-all after:duration-300 after:ease-in-out"
            >
              Sessions
            </TabsTrigger>

            <TabsTrigger
              value="buddiesTab"
              className="relative px-5 py-2 text-2xl font-semibold transition data-[state=active]:text-primary after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:h-[5px] after:w-full
                        after:rounded-sm data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-none
                        after:bg-transparent data-[state=active]:after:bg-[#818CF8]
                        data-[state=active]:after:shadow-[0_-2px_8px_#818CF870]after:transition-all after:duration-300 after:ease-in-out "
            >
              Buddies
            </TabsTrigger>
          </TabsList>

          <Separator className="rounded-sm dark:border-white border-[1px]" />

          {/* Community Board */}
          <TabsContent value="communityBoardTab">
            {
              communityData &&
              <CommunityBoard communityGroupId={communityId} chats={communityData?.communityChats}/>
            }
          </TabsContent>

          {/* Sessions */}
          <TabsContent value="sessionsTab">
            <DirectMessage/>
          </TabsContent>

          {/* Buddies */}
          <TabsContent value="buddiesTab">
            {
              communityData &&
              <BuddiesCompononet communityGroupId={communityId} buddyCount={communityData?.communityMemberCount} buddies={communityData?.communityMembers}/>
            }
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default CommunityDashboard;
