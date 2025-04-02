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
        {children}
    </div>
  )
}

export default layout