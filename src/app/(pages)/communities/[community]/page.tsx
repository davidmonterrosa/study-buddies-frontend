import CommunityDashboard from '@/components/CommunityDashboard';
import { getCommunityById, getToken } from '@/utils/Services/DataServices';
import React from 'react'

const CommunityPage = async ({ params }: {params: Promise<{community: number}>}) => {
  const {community} = await params;  
  
  return (
    <>
      <CommunityDashboard communityId={community}/>
    </>
  )
}

export default CommunityPage