'use client';
// import MyCommunitiesPanel from '@/components/MyCommunitiesPanel';
import NavBarComponent from '@/components/NavBarComponent';
import React, { useState, createContext, useContext } from 'react';
import MyCommunitiesPanel from '@/components/SidePanel';
import { usePathname } from 'next/navigation';

// Context for sidebar state
const SidebarContext = createContext<{ sidebarOpen: boolean; toggleSidebar: () => void }>({
  sidebarOpen: true,
  toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

const MainContentContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="transition-all duration-400 w-full h-full lg:h-[calc(0.90*100vh-1rem)] bg-white rounded-none lg:rounded-lg dark:bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] lg:dark:border-[2px] lg:dark:border-[#aa7dfc40] p-2 lg:p-4 lg:drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)] flex flex-col relative">
    {children}
  </div>
);

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const pathname = usePathname();
  const showSidePanel = pathname !== "/profile";

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div className="bg-white dark:bg-[#110C29] h-screen overflow-hidden">
        <NavBarComponent />
        <section className="flex flex-row gap-6 lg:p-4 h-[calc(0.90*100vh-1rem)]">
          {/* Sidepanel for large screens */}
          {showSidePanel && (
            <div className={`hidden lg:block w-[300px] ${!sidebarOpen ? 'lg:hidden' : ''}`}>
              <MyCommunitiesPanel visible={sidebarOpen} />
            </div>
          )}
          {/* Main content container */}
          <MainContentContainer>{children}</MainContentContainer>
        </section>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
