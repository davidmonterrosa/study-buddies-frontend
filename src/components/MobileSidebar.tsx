'use client';
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Dropdown,
  DropdownItem
} from "flowbite-react";
import {
  ChevronDown,
  ChevronRight,
  Users,
  Group,
  EllipsisVertical,
  User,
  Bell,
  LogOut,
  PlusCircle,
  Trash
} from "lucide-react";
import { useAppContext } from "@/context/CommunityContext";
import Link from "next/link";
import CreateCommunityModal from "./CreateModal";
import { currentUser, getLoggedInUserData } from "@/utils/Services/DataServices";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface MyCommunitiesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  openNotificationsSidebar: () => void;
}

export const CollapseSection = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        className="cursor-pointer flex items-center justify-between w-full px-4 py-2 text-sm font-medium bg-transparent rounded-md hover:bg-[rgba(129,140,248,0.25)] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Icon size={18} />
          <span className="text-[16px]">{label}</span>
        </div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isOpen && <div className="mt-2 space-y-1">{children}</div>}
    </div>
  );
};

export const SidebarLink = ({
  text,
  href,
  isActive = false,
  onClick,
}: {
  text: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <div className="flex justify-between items-center">
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2 px-3 rounded-md text-sm transition ${isActive
        ? "bg-[#818df8] text-white dark:bg-[#6f58da]"
        : "bg-transparent text-black dark:text-white hover:bg-[rgba(129,140,248,0.25)]"
        }`}
    >
      {text}
    </Link>
    <AlertDialog>
  <AlertDialogTrigger>
    <Trash/>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  </div>
);

const MyCommunitiesSidebar: React.FC<MyCommunitiesSidebarProps> = ({
  isOpen,
  onClose,
  openNotificationsSidebar,
}) => {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { communityGroups } = useAppContext();

  // User data state
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [ownedCommunities, setOwnedCommunities] = useState<number[]>([])
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Fetch user data
  useEffect(() => {
    const getLoggedInData = async () => {
      const user = await getLoggedInUserData(currentUser());
      if (!user || !user.user.username) return;

      const loggedIn = await getLoggedInUserData(user.user.username);

      if (loggedIn) {
        setUserName(loggedIn.user.username || "");
        setFirstName(loggedIn.user.firstName || "");
        setLastName(loggedIn.user.lastName || "");
        setOwnedCommunities(loggedIn.user.ownedCommunitys);
        setJoinedCommunities(loggedIn.user.joinedCommunitys);
      }
    };

    getLoggedInData();
  }, []);

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} position="right" className="p-0 w-full sm:w-[320px]">
        <div className="relative w-full h-full  bg-white dark:bg-[#100B28] flex flex-col">

          {/* Sticky Top Section */}
          <div className="sticky top-0 z-10 bg-white dark:bg-[#100B28] border-b border-gray-200 dark:border-gray-700 px-3 pt-2 pb-3 space-y-2">
            <button className="text-gray-500 hover:text-black dark:hover:text-white"
              onClick={onClose}
              aria-label="Close"
            >
              <img src="/assets/panelClose.svg" className="cursor-pointer size-6 dark:invert" alt="Close panel Icon" />
            </button>

            <button
              className="cursor-pointer flex items-center text-white bg-gradient-to-r from-[#6F58DA] to-[#5131E7] rounded-[7px] px-3 py-[1.5px] gap-1 w-full"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircle size={20} />
              <p className="text-[18px]">Create</p>
            </button>
          </div>

          {/* Scrollable Middle Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
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
                    />
                  )
                }
              })}
            </CollapseSection>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 w-full px-4 py-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#100B28] space-y-3">
            <div className="flex items-center gap-3 w-full relative">
              <div className="relative">
                {/* Avatar */}
                <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                  <p className="text-white text-[18px] font-bold">
                    {userName.slice(0, 1).toUpperCase()}
                  </p>
                </div>

                {/* Notification Badge */}
                <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
                  3
                </span>
              </div>

              <div className="flex-1">
                <p className="text-[16px] font-semibold text-black dark:text-white">
                  {firstName} {lastName}
                </p>
                <p className="text-[14px] text-gray-600 dark:text-gray-300">{userName}</p>
              </div>

              <Dropdown
                placement="top-start"
                renderTrigger={() => (
                  <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                    <EllipsisVertical className="w-5 h-5 text-black dark:text-white" />
                  </button>
                )}
                className="w-full -translate-y-3 border border-gray-200 dark:border-[#aa7dfc] bg-white dark:bg-[#140D34]"
              >
                <div className="py-0">
                  <DropdownItem icon={User}>Account</DropdownItem>
                  <DropdownItem icon={Bell} onClick={openNotificationsSidebar}>Notifications
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </DropdownItem>
                  <hr className="my-1" />
                  <DropdownItem
                    icon={LogOut}
                    className="text-red-600 dark:text-red-500"
                    onClick={() => {
                      localStorage.removeItem("Token");
                      window.location.href = "/";
                    }}
                  >
                    Log out
                  </DropdownItem>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Drawer>

      <CreateCommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MyCommunitiesSidebar;
