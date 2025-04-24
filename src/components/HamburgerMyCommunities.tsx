'use client';
import React, { useState } from "react";
import { Drawer } from "flowbite-react";
import ViewCommunityButton from "./ViewCommunityButton";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { useAppContext } from "@/context/CommunityContext";
import Link from "next/link";
import { X } from "lucide-react";

interface MyCommunitiesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyCommunitiesSidebar: React.FC<MyCommunitiesSidebarProps> = ({ isOpen, onClose }) => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const { communityGroups } = useAppContext();

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      position="left"
      className="p-0"
    >
      <div className="relative w-full h-full sm:max-w-sm bg-white dark:bg-[#100B28]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content Container - scrollable only when overflowing */}
        <div className="h-full overflow-y-auto p-6 pt-14">
          <h1 className="text-center text-2xl font-bold mb-4 text-black dark:text-white">
            My Communities
          </h1>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              {communityGroups.map((communityGroup: ICommunityData, idx: number) => (
                <Link key={idx} href={`/communities/${communityGroup.id}`}>
                  <ViewCommunityButton
                    communityName={communityGroup.communityName}
                    isActive={activeCommunity === communityGroup.communityName}
                    onClick={() => setActiveCommunity(communityGroup.communityName)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MyCommunitiesSidebar;
