'use client';
// import MyCommunitiesPanel from '@/components/MyCommunitiesPanel';
import NavBarComponent from '@/components/NavBarComponent';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-white dark:bg-[#110C29] min-h-[calc(100vh-70px)]">
      <NavBarComponent />
      <section className="flex flex-row gap-6 lg:p-4">
        {children}
      </section>
    </div>
  );
};

export default Layout;
