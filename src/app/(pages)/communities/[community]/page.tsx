import CommunityDashboard from '@/components/Dashboard';
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