'use client'
import React, { useEffect, useState } from 'react'
import { PanelLeft } from 'lucide-react'
import CommunityCard from '@/components/Card'
import MyCommunitiesPanel from './SidePanel'
import { getAllCommunities, getToken } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'
import { useBreakpoint } from '@/hooks/use-mobile'

const CommunityContainer: React.FC = () => {
  const [communityGroups, setCommunityGroups] = useState<ICommunityData[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const breakpoint = useBreakpoint()
  const pageSize = breakpoint === 'xl' ? 16 : breakpoint === 'lg' ? 12 : 12

  useEffect(() => {
    const fetchMyCommunities = async () => {
      const data = await getAllCommunities(getToken())
      setCommunityGroups(data.communities)
    }
    fetchMyCommunities()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [breakpoint])

  const paginatedCommunities = communityGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const totalPages = Math.ceil(communityGroups.length / pageSize)

  return (
    <div className={`flex w-full ${sidebarOpen ? 'lg:gap-4' : ''}`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="hidden lg:block w-[250px]">
          <MyCommunitiesPanel visible={sidebarOpen} />
        </div>
      )}

      {/* Main Content */}
      <div className="transition-all duration-400 w-full min-h-screen  lg:min-h-[calc(0.90*100vh-1rem)]  bg-white rounded-none lg:rounded-lg dark:bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] lg:dark:border-[2px] lg:dark:border-[#aa7dfc40] p-4 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] flex flex-col relative">

        {/* Header and Desktop Pagination */}
        <div className="flex items-center justify-center lg:justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              className="text-black cursor-pointer dark:text-white hidden lg:block"
            >
              <PanelLeft />
            </button>
            <h1 className="text-2xl text-center font-bold text-black dark:text-white">
              Explore Learning Communities
            </h1>
          </div>
          {/* Desktop Pagination Buttons */}
          <div className="hidden lg:flex gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === idx + 1
                    ? 'bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Grid Section */}
        <div className="w-full flex-1 relative lg:h-[calc(80vh-1rem)]">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ${
              sidebarOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-3 2xl:grid-cols-5'
            } xl:grid-cols-4 gap-4 pb-15 md:pb-15 lg:pb-0`} // padding for mobile pagination
          >
            {paginatedCommunities.map((communityGroup: ICommunityData, idx: number) => (
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
            ))}
          </div>

          {/* Mobile Pagination Buttons (Fixed to Bottom) */}
          <div className="lg:hidden absolute bottom-0 left-0 w-full flex justify-center gap-2  py-2 z-10">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === idx + 1
                    ? 'bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white'
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
  )
}

export default CommunityContainer
