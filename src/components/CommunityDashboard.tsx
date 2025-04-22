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
                <Tabs defaultValue='communityBoardTab'>
                    <TabsList className='sm:bg-transparent rounded-none gap-12'>
                        <TabsTrigger value='communityBoardTab' className="relative px-5 py-2 text-2xl font-semibold transition data-[state=active]:text-primary after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:h-[5px] after:w-full
                        after:rounded-sm data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-none
                        after:bg-transparent data-[state=active]:after:bg-[#818CF8]
                        data-[state=active]:after:shadow-[0_-2px_8px_#818CF870]after:transition-all after:duration-300 after:ease-in-out">Community Board</TabsTrigger>

                        <TabsTrigger disabled value='sessionsTab' className="relative px-5 py-2 text-2xl font-semibold transition data-[state=active]:text-primary after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:h-[5px] after:w-full
                        after:rounded-sm data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-none
                        after:bg-transparent data-[state=active]:after:bg-[#818CF8]
                        data-[state=active]:after:shadow-[0_-2px_8px_#818CF870]after:transition-all after:duration-300 after:ease-in-out">Sessions</TabsTrigger>

                        <TabsTrigger value='buddiesTab' className="relative px-5 py-2 text-2xl font-semibold transition data-[state=active]:text-primary after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:h-[5px] after:w-full
                        after:rounded-sm data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-none
                        after:bg-transparent data-[state=active]:after:bg-[#818CF8]
                        data-[state=active]:after:shadow-[0_-2px_8px_#818CF870]after:transition-all after:duration-300 after:ease-in-out ">Buddies</TabsTrigger>
                    </TabsList>

                    <Separator className='rounded-sm dark:border-white border-[1px]' />

                    <TabsContent value='communityBoardTab'>
                        <section className="flex flex-col min-h-[calc(0.71*100vh)]  border rounded-lg bg-muted/30 dark:bg-muted/20 overflow-hidden mt-4">
                            {/* Messages Area */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                {/* Example received message */}
                                <div className="flex items-start gap-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg max-w-[75%] text-sm">
                                        Welcome to the community! 🎉
                                    </div>
                                </div>

                                {/* Example sent message */}
                                <div className="flex justify-end">
                                    <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-[75%] text-sm shadow">
                                        Thanks! Glad to be here 😄
                                    </div>
                                </div>
                            </div>

                            {/* Message Input Bar */}
                            <div className="border-t p-3 flex items-center gap-2 bg-white dark:bg-background">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 rounded-full border text-sm bg-muted/50 dark:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                                    Send
                                </button>
                            </div>
                        </section>
                    </TabsContent>
                    <TabsContent value='sessionsTab'>
                        Sessions content goes here
                    </TabsContent>
                    <TabsContent value='buddiesTab'>
                        Buddies Content goes here
                    </TabsContent>

                </Tabs>
            </div>
    </main >
  )
}

export default CommunityDashboard