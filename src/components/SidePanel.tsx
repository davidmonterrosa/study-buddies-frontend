'use client'
import React, { useEffect, useState } from 'react';
import { currentUser, getLoggedInUserData, getMyCommunities, getToken } from '@/utils/Services/DataServices';
import { useAppContext } from '@/context/CommunityContext';
import { Group, Users, /*PanelLeft*/ } from 'lucide-react';
import { CollapseSection, SidebarLink } from './MobileSidebar';
// import { useSidebar } from '@/app/(pages)/layout';

interface Props {
  visible: boolean;
}

const MyCommunitiesPanel: React.FC<Props> = ({ visible }) => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const { communityGroups, setCommunityGroups } = useAppContext();
  const [ownedCommunities, setOwnedCommunities] = useState<number[]>([])
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([])
  // const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const fetchMyCommunities = async () => {
      const loggedInUser = await getLoggedInUserData(currentUser());
      if (loggedInUser) {
        const data = await getMyCommunities(loggedInUser.user.id, getToken());
        setCommunityGroups(data);
        setOwnedCommunities(loggedInUser.user.ownedCommunitys);
        setJoinedCommunities(loggedInUser.user.joinedCommunitys);
        console.log(data);
      } else {
        console.log("You are logged out");
      }
    };
    fetchMyCommunities();
  }, []);

    const updateSideBarData = (owned: number[], joined: number[]) => {
    console.log("Updating Sidebar with: ", )
    setOwnedCommunities(owned);
    setJoinedCommunities(joined);
  }

  return (
    <aside
      className={`
        hidden
        ${visible ? 'lg:flex' : 'lg:hidden'}
        lg:flex-col 
        w-full 
        max-w-[300px]
        transition-all 
        duration-300 
        shadow-[0_0px_5px_rgba(0,0,0,0.25)] 
        dark:bg-gradient-to-b 
        dark:from-[#271E55] 
        dark:to-[#100B28] 
        dark:border-[2px] 
        dark:border-[#aa7dfc40] 
        rounded-lg 
        overflow-hidden 
        h-[calc(0.90*100vh-1rem)]
      `}
    >
      <div className="flex-1 overflow-y-auto scrollbar p-3 space-y-4">
        <CollapseSection label="Owned Communities" icon={Users}>
          {communityGroups.map((communityGroup, idx) => {
            if(ownedCommunities.includes(communityGroup.id)) {
              return (
                <SidebarLink
                  key={idx}
                  text={communityGroup.communityName}
                  href={`/communities/${communityGroup.id}`}
                  isActive={activeCommunity === communityGroup.communityName}
                  onClick={() => setActiveCommunity(communityGroup.communityName)}
                  updateFunction={updateSideBarData}
                />
              )
            }
          })}
        </CollapseSection>

        <CollapseSection label="Joined Communities" icon={Group}>
          {communityGroups.map((communityGroup, idx) => {
            if(joinedCommunities.includes(communityGroup.id)) {
              return (
                <SidebarLink
                  key={idx}
                  text={communityGroup.communityName}
                  href={`/communities/${communityGroup.id}`}
                  isActive={activeCommunity === communityGroup.communityName}
                  onClick={() => setActiveCommunity(communityGroup.communityName)}
                  updateFunction={updateSideBarData}
                />
              )
            }
          })}
        </CollapseSection>
      </div>
    </aside>
  );
};

export default MyCommunitiesPanel;
