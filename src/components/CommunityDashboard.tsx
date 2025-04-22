"use client"
import { getDifficultyColor } from '@/utils/Services/StyleHelpers'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { getCommunityById } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'

interface CommunityDashboardProps {
  communityId: number;
}

const CommunityDashboard: React.FC<CommunityDashboardProps> = ({
  communityId
}) => {

  const [communityData, setCommunityData] = useState<ICommunityData>()
  useEffect(() => {
    const fetchCommunityInfo = async () => {
      console.log("This is the id being passed", communityId)
      const data = await getCommunityById(communityId);
      console.log(data.community.communityName);
      setCommunityData(data.community);
    }
    fetchCommunityInfo();
  }, [])

  useEffect(() => {
    console.log(communityData)
  }, [communityData])

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

          {/* Community Board */}
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
              <div className="p-3 flex items-center w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full pr-10 px-4 py-2 rounded-[15px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] text-sm bg-[#F6F6F6] dark:bg-transparent dark:border-[1px] dark:border-[#aa7dfc40] focus:outline-none focus:ring-2 focus:ring-[#818CF8] dark:focus:ring-[#a97dfc96]"
                  />
                  {/* Send Icon */}
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                    <svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
                      {/* Define the gradient */}
                      <defs>
                        <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1" >
                          <stop offset="0%" stopColor="#6F58DA" />
                          <stop offset="100%" stopColor="#5131E7" />
                        </linearGradient>
                      </defs>

                      <path d="M3.9696 3.01198L23.6529 12.4257C24.2346 12.704 24.4807 13.4011 24.2025 13.9829C24.0874 14.2235 23.8935 14.4174 23.6529 14.5325L3.9696 23.9462C3.38783 24.2245 2.69066 23.9784 2.41242 23.3966C2.29151 23.1438 2.26555 22.856 2.33929 22.5856L4.30801 15.3668C4.35733 15.1859 4.51 15.0521 4.69575 15.0268L14.2337 13.7312C14.3159 13.7195 14.384 13.6655 14.4155 13.5917L14.4319 13.5331C14.4475 13.4236 14.3846 13.3211 14.2859 13.2825L14.2337 13.2689L4.70691 11.9733C4.52118 11.9481 4.36855 11.8142 4.31924 11.6334L2.33929 4.3726C2.16961 3.75044 2.53641 3.10853 3.15857 2.93885C3.42893 2.86512 3.71679 2.89107 3.9696 3.01198Z"
                        fill="currentColor"
                        className="text-[#818CF8] dark:fill-[url(#darkGradient)]"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Sessions */}
          <TabsContent value="sessionsTab">
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
              <div className="p-3 flex items-center w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full pr-10 px-4 py-2 rounded-[15px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] text-sm bg-[#F6F6F6] dark:bg-transparent dark:border-[1px] dark:border-[#aa7dfc40] focus:outline-none focus:ring-2 focus:ring-[#818CF8] dark:focus:ring-[#a97dfc96]"
                  />
                  {/* Send Icon */}
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                    <svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
                      {/* Define the gradient */}
                      <defs>
                        <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1" >
                          <stop offset="0%" stopColor="#6F58DA" />
                          <stop offset="100%" stopColor="#5131E7" />
                        </linearGradient>
                      </defs>

                      <path d="M3.9696 3.01198L23.6529 12.4257C24.2346 12.704 24.4807 13.4011 24.2025 13.9829C24.0874 14.2235 23.8935 14.4174 23.6529 14.5325L3.9696 23.9462C3.38783 24.2245 2.69066 23.9784 2.41242 23.3966C2.29151 23.1438 2.26555 22.856 2.33929 22.5856L4.30801 15.3668C4.35733 15.1859 4.51 15.0521 4.69575 15.0268L14.2337 13.7312C14.3159 13.7195 14.384 13.6655 14.4155 13.5917L14.4319 13.5331C14.4475 13.4236 14.3846 13.3211 14.2859 13.2825L14.2337 13.2689L4.70691 11.9733C4.52118 11.9481 4.36855 11.8142 4.31924 11.6334L2.33929 4.3726C2.16961 3.75044 2.53641 3.10853 3.15857 2.93885C3.42893 2.86512 3.71679 2.89107 3.9696 3.01198Z"
                        fill="currentColor"
                        className="text-[#818CF8] dark:fill-[url(#darkGradient)]"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Buddies */}
          <TabsContent value="buddiesTab">
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
              <div className="p-3 flex items-center w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full pr-10 px-4 py-2 rounded-[15px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] text-sm bg-[#F6F6F6] dark:bg-transparent dark:border-[1px] dark:border-[#aa7dfc40] focus:outline-none focus:ring-2 focus:ring-[#818CF8] dark:focus:ring-[#a97dfc96]"
                  />
                  {/* Send Icon */}
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                    <svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
                      {/* Define the gradient */}
                      <defs>
                        <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1" >
                          <stop offset="0%" stopColor="#6F58DA" />
                          <stop offset="100%" stopColor="#5131E7" />
                        </linearGradient>
                      </defs>

                      <path d="M3.9696 3.01198L23.6529 12.4257C24.2346 12.704 24.4807 13.4011 24.2025 13.9829C24.0874 14.2235 23.8935 14.4174 23.6529 14.5325L3.9696 23.9462C3.38783 24.2245 2.69066 23.9784 2.41242 23.3966C2.29151 23.1438 2.26555 22.856 2.33929 22.5856L4.30801 15.3668C4.35733 15.1859 4.51 15.0521 4.69575 15.0268L14.2337 13.7312C14.3159 13.7195 14.384 13.6655 14.4155 13.5917L14.4319 13.5331C14.4475 13.4236 14.3846 13.3211 14.2859 13.2825L14.2337 13.2689L4.70691 11.9733C4.52118 11.9481 4.36855 11.8142 4.31924 11.6334L2.33929 4.3726C2.16961 3.75044 2.53641 3.10853 3.15857 2.93885C3.42893 2.86512 3.71679 2.89107 3.9696 3.01198Z"
                        fill="currentColor"
                        className="text-[#818CF8] dark:fill-[url(#darkGradient)]"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default CommunityDashboard;
