'use client'
import React, { useEffect, useState } from 'react'
import { PanelLeft } from 'lucide-react'
import CommunityCard from '@/components/Card'
import { getAllCommunities, getToken } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'
import { useBreakpoint } from '@/hooks/use-mobile'

const CommunityContainer: React.FC = () => {
  const [communityGroups, setCommunityGroups] = useState<ICommunityData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  // const { /*sidebarOpen,*/ toggleSidebar } = useSidebar();
  const breakpoint = useBreakpoint()
  const pageSize = (breakpoint === 'xl' || breakpoint === '2xl' || breakpoint === '3xl') ? 16 : breakpoint === 'lg' ? 12 : 12

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
    <>
      {/* Header and Desktop Pagination */}
      <div className="flex items-center justify-center lg:justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            // onClick={toggleSidebar}
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
                  : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Grid Section */}
      <div className="w-full flex-1 relative h-full overflow-y-auto scrollbar">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-4 2xl:grid-cols-4 2xl:grid-rows-4 gap-4 flex-grow"
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
        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="w-full flex lg:hidden justify-center gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === idx + 1
                    ? 'bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CommunityContainer
