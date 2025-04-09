// import MyCommunitiesPanel from '@/components/MyCommunitiesPanel';
import NavBarComponent from '@/components/NavBarComponent';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        <NavBarComponent/>
        {/* <MyCommunitiesPanel/> */}
        {children}
    </div>
  )
}

export default layout