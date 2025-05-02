'use client'
import React, { useEffect, useState } from 'react';
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { currentUser, getMyCommunities, getToken } from '@/utils/Services/DataServices';
import { useAppContext } from '@/context/CommunityContext';
import { CollapseSection, SidebarLink } from './HamburgerMyCommunities';
import { Group, Users } from 'lucide-react';

interface Props {
  visible: boolean;
}

const MyCommunitiesPanel: React.FC<Props> = ({ visible }) => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const { communityGroups, setCommunityGroups } = useAppContext();

  useEffect(() => {
    const fetchMyCommunities = async () => {
      const loggedInUser = currentUser();
      if (loggedInUser) {
        const data = await getMyCommunities(loggedInUser.user.id, getToken());
        setCommunityGroups(data);
      }
    };
    fetchMyCommunities();
  }, []);

  return (
    <aside
      className={`
        lg:${visible ? 'flex' : 'hidden'} 
        lg:flex-col 
        w-1/5 
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
          {communityGroups.map((communityGroup, idx) => (
            <SidebarLink
              key={idx}
              text={communityGroup.communityName}
              href={`/communities/${communityGroup.id}`}
              isActive={activeCommunity === communityGroup.communityName}
              onClick={() => setActiveCommunity(communityGroup.communityName)}
            />
          ))}
        </CollapseSection>

        <CollapseSection label="Joined Communities" icon={Group}>
          <SidebarLink text="Design Club" href="/communities/design-club" />
          <SidebarLink text="Tech Talk" href="/communities/tech-talk" />
          <SidebarLink text="Code Masters" href="/communities/code-masters" />
        </CollapseSection>
      </div>
    </aside>
  );
};

export default MyCommunitiesPanel;
