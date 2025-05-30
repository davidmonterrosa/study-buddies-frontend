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
  Moon,
  Sun,
  // Trash
} from "lucide-react";
import { useAppContext } from "@/context/CommunityContext";
import Link from "next/link";
import Image from 'next/image';
import CreateCommunityModal from "./CreateModal";
import { currentUser, getAllRequestsToOwner, getLoggedInUserData, getToken } from "@/utils/Services/DataServices";
import { IRequestData } from "@/utils/Interfaces/UserInterfaces";


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
  // Use a unique key for each section
  const storageKey = `sidebarCollapse_${label.replace(/\s+/g, '')}`;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      setIsOpen(JSON.parse(stored));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOpen));
  }, [isOpen, storageKey]);

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
  updateFunction: (owned: number[], joined: number[]) => void;
}) => (
  <div className={`flex justify-between items-center `}>
    <Link
      href={href}
      onClick={onClick}
      className={`hover:cursor-pointer text-sm w-full py-2 px-3 rounded-md transition ${isActive
        ? "bg-[#818df8] text-white dark:bg-[#6f58da]"
        : "bg-transparent text-black dark:text-white hover:bg-[rgba(129,140,248,0.25)]"
        }`}
    >
      <p >
        {text}
      </p>
    </Link>
    {/* <LeaveOrDelete updateFunction={updateFunction} communityURL={href}/> */}
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
  const [userId, setUserId] = useState<number>(-1)
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [ownedCommunities, setOwnedCommunities] = useState<number[]>([])
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([])
  const [requestNotifications, setRequestNotifications] = useState<IRequestData[]>([]);
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
        const notificationData = await getAllRequestsToOwner(loggedIn.user.id, getToken())
        setUserId(loggedIn.user.id)
        setUserName(loggedIn.user.username || "");
        setFirstName(loggedIn.user.firstName || "");
        setLastName(loggedIn.user.lastName || "");
        setOwnedCommunities(loggedIn.user.ownedCommunitys);
        setJoinedCommunities(loggedIn.user.joinedCommunitys);
        console.log("Request data: ", notificationData)
        setRequestNotifications(notificationData)
      }
    };

    getLoggedInData();
  }, []);

  const updateSideBarData = (owned: number[], joined: number[]) => {
    console.log("Updating Sidebar with: ", )
    setOwnedCommunities(owned);
    setJoinedCommunities(joined);
  }

  useEffect(() => {
    console.log("Owned: ", ownedCommunities)
    console.log("Joined: ", joinedCommunities)
  }, [ownedCommunities, joinedCommunities])

  useEffect(() => {
    const getUpdatedNotifications = async () => {
      if(userId != -1) {
        const notificationData = await getAllRequestsToOwner(userId, getToken())
        console.log("This is the shape of the request data: ", notificationData)
        setRequestNotifications(notificationData)
      }
    }
    getUpdatedNotifications()

  }, [])

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
              <Image src="/assets/panelClose.svg" className="cursor-pointer size-6 dark:invert" alt="Close panel Icon" width={24} height={24} />
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
              {communityGroups.filter((community) => ownedCommunities.includes(community.id)).map((communityGroup, idx) => {
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
              })}
            </CollapseSection>

            <CollapseSection label="Joined Communities" icon={Group}>
              {communityGroups.filter((community) => joinedCommunities.includes(community.id)).map((communityGroup, idx) => {
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
                {
                  requestNotifications ?
                  <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
                    {requestNotifications.length}
                  </span>
                  : null
                }
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
                    <EllipsisVertical className="w-5 h-5 text-black dark:text-white cursor-pointer" />
                  </button>
                )}
                className="w-full -translate-y-3 border border-gray-200 dark:border-[#aa7dfc] bg-white dark:bg-[#140D34]"
              >
                <div className="py-0">
                  <Link href="/profile" passHref legacyBehavior>
                    <a className="flex items-center gap-2 py-2 px-3 rounded-md text-sm transition hover:bg-[rgba(129,140,248,0.25)]">
                      <User className="w-4 h-4" /> Account
                    </a>
                  </Link>
                  <DropdownItem
                    icon={Bell}
                    className="rounded-md"
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.currentTarget.style.backgroundColor = 'rgba(129,140,248,0.25)'; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.currentTarget.style.backgroundColor = ''; }}
                    onClick={openNotificationsSidebar}
                  >
                    Notifications
                    {
                      requestNotifications && requestNotifications.length > 0 ?
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {requestNotifications[0].communityRequestCountNumber}
                      </span>
                      : null
                    }
                  </DropdownItem>
                  
                  <button
                    className="flex items-center gap-2 py-2 px-3 rounded-md text-sm transition hover:bg-[rgba(129,140,248,0.25)] w-full"
                    onClick={() => {
                      const storedTheme = localStorage.getItem("theme");
                      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                      const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);
                      const newTheme = isDark ? "light" : "dark";
                      document.documentElement.classList.toggle("dark", newTheme === "dark");
                      localStorage.setItem("theme", newTheme);
                    }}
                  >
                    {/* Use current theme to show correct icon */}
                    {typeof window !== "undefined" && (document.documentElement.classList.contains("dark") ? (
                      <Sun className="mr-2 h-4 w-4 text-black dark:text-white" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4 text-black" />
                    ))}
                    Theme
                  </button>
                 
                  <hr className="my-1" />
                  <DropdownItem
                    icon={LogOut}
                    className="text-red-600 dark:text-red-500 rounded-md"
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.currentTarget.style.backgroundColor = 'rgba(129,140,248,0.25)'; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { e.currentTarget.style.backgroundColor = ''; }}
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

      <CreateCommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
    </>
  );
};

export default MyCommunitiesSidebar;
