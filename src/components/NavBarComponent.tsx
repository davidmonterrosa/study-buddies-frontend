"use client";
import { Navbar, NavbarBrand } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import NotificationsSidebar from "./NotificationsSidebar";
import CreateCommunityModal from "./CreateModal";
import MyCommunitiesSidebar from "./MobileSidebar";
// import Dropdown from "./FilterDropdown";
// import { currentUser, getLoggedInUserData } from "@/utils/Services/DataServices";
// import { DropdownMenu } from "./ui/dropdown-menu";
import DropdownMenuProfile from "./ProfileMenu";
import CommunityAutoSuggest from "./CommunityAutoSuggest";


const NavBarComponent: React.FC = () => {
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  // const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);


  const closeMyCommunities = () => setIsOpenRight(false);

  // Function to open notifications sidebar
  const openNotificationsSidebar = () => {
    setIsOpenNotifications(true);
  };


  // User data state
  // const [userName, setUserName] = useState<string>("");
 

  // Fetch user data
  // useEffect(() => {
  //   const getLoggedInData = async () => {
  //     const user = await getLoggedInUserData(currentUser());
  //     if (!user || !user.user.username) return;

  //     const loggedIn = await getLoggedInUserData(currentUser());

  //     if (loggedIn) {
  //       setUserName(loggedIn.user.username || "");
  //     }
  //   };

  //   getLoggedInData();
  // }, []);

  return (
    <>
      <Navbar className="bg-[#818CF8] dark:bg-[#110C29] w-full px-4 py-2" fluid>
        <div className="flex w-full justify-between items-center gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <NavbarBrand as={Link} href="/landing" className="flex items-center">
              <img src="/assets/SBLogo.png" className="h-9" alt="Logo" />
              <span className="hidden md:block text-nowrap text-[18px] lg:text-[32px] font-semibold dark:text-white ml-2">
                Study Buddies
              </span>
            </NavbarBrand>
          </div>

          {/* Search Bar with Auto-Suggest */}
          <CommunityAutoSuggest/>

          {/* Right-side controls */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center justify-center cursor-pointer text-white bg-gradient-to-r from-[#6F58DA] to-[#5131E7] rounded-full px-[18px] py-2.5 gap-1"
              onClick={() => setIsOpenModal(true)}
            >
              <p className="text-xl">+</p>
              <p className="">Create</p>
            </button>
            {/* Button for dropdown */}
            <DropdownMenuProfile openNotificationsSidebar={openNotificationsSidebar}/>

            {/* Hamburger Icon */}
            <button className="lg:hidden cursor-pointer" onClick={() => setIsOpenRight(true)}>
              <img className="size-10 dark:invert" src="/assets/menu-burger.svg" alt="Menu" />
            </button>
          </div>
        </div>
      </Navbar>

      {/* Sidebars and Modals */}
      <MyCommunitiesSidebar isOpen={isOpenRight} onClose={closeMyCommunities} openNotificationsSidebar={openNotificationsSidebar} />
      <NotificationsSidebar isOpen={isOpenNotifications} onBack={() => setIsOpenNotifications(false)} onClose={() => { setIsOpenNotifications(false);  /*setIsOpenProfile(false);*/ }}/> 
      <CreateCommunityModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default NavBarComponent;