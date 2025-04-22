"use client"
import { getDifficultyColor } from '@/utils/Services/StyleHelpers'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'

interface CommunityDashboardProps {
    communityId: number
}

const CommunityDashboard: React.FC<CommunityDashboardProps> = ({
    communityId
}) => {
    return (
        <main className='w-full bg-white rounded-lg dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] max-w-full lg:max-w-[80%] h-auto p-4 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]'>
            <header className='flex mb-4'>
                <h1 className='text-[2rem] text-center sm:text-left font-bold text-black dark:text-white mr-16'>Community Name</h1>

                <span className='flex place-items-center text-center gap-5'>
                    <div className={`${getDifficultyColor("Beginner")} text-black rounded-[10px] py-[2px] px-[5px] max-h-10 w-36`}>
                        <p>Beginner</p>
                    </div>
                    <div className='bg-[#818CF8] rounded-[10px] py-[2px] px-[5px] max-h-10 w-36'>
                        <p>Subject</p>
                    </div>
                </span>
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
              disabled
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

          <TabsContent value="communityBoardTab">
            <section className="flex flex-col min-h-[calc(0.68*100vh)]   overflow-hidden mt-4">
              {/* Messages Area */}

              {/* Time Stamp */}
              <div className="flex justify-center pb-4">
                <div className="bg-[#F3F3F3] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] rounded-[10px] py-[2px] px-[5px] max-h-10  flex items-center justify-center">
                  <p className="text-center font-bold">4/22/25</p>
                </div>
              </div>

              <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
                {/* Example received message */}
                <div className="flex items-start gap-2">
                  <div className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
                    <div className="flex mt-2 gap-2 items-center">
                      <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[14px] font-bold text-black">ML</p>
                      </div>
                      <p className="font-semibold text-sm">Maria lopez</p>
                      <p>3:45 PM</p>
                    </div>
                    <p>
                      Hola amigos! I'm organizing a study session for tomorrow
                      at 7 PM to review verb conjugations. Anyone interested in
                      joining?
                    </p>
                    {/* Likes and Reply */}
                    <div className="flex row justify-end gap-3">
                      {/* Likes */}
                      <div className="flex row items-center gap-1">
                        <p>12</p>
                        <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                          <p className="text-[14px] font-bold text-black">ML</p>
                        </div>
                      </div>
                      {/* Reply */}
                      <div className="flex row items-center gap-1">
                        <p>2</p>
                        <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                          <p className="text-[14px] font-bold text-black">ML</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example sent message */}
                <div className="flex justify-end">
                  <div className="bg-[#CBD0FF] dark:bg-[#3D3179] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
                    <div className="flex mt-2 gap-2 items-center">
                      <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[14px] font-bold text-white">AL</p>
                      </div>
                      <p className="font-semibold text-sm">You</p>
                      <p>6:55 PM</p>
                    </div>
                    <p>
                      Just found this amazing resource for Spanish vocabulary:
                      link.com/spanish-vocab. It has flashcards and spaced
                      repetition features!
                    </p>
                    {/* Likes and Reply */}
                    <div className="flex row justify-end gap-3">
                      {/* Likes */}
                      <div className="flex row items-center gap-1">
                        <p>12</p>
                        <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                          <p className="text-[14px] font-bold text-white">ML</p>
                        </div>
                      </div>
                      {/* Reply */}
                      <div className="flex row items-center gap-1">
                        <p>2</p>
                        <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                          <p className="text-[14px] font-bold text-white">ML</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input Bar */}
              <div className="p-3 flex items-center gap-2 ">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-[15px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]  text-sm bg-[#F6F6F6] dark:bg-transparent dark:border-[1px] dark:border-[#aa7dfc40] focus:outline-none focus:ring-2 focus:ring-[#818CF8] dark:focus:ring-[#a97dfc96]"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                  Send
                </button>
              </div>
            </section>
          </TabsContent>
          <TabsContent value="sessionsTab">
            Sessions content goes here
          </TabsContent>
          <TabsContent value="buddiesTab">
            Buddies Content goes here
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default CommunityDashboard;
