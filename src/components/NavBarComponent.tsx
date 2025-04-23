"use client";
import { Navbar, NavbarBrand } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import NotificationsSidebar from "./NotificationsSidebar";
import ProfileSidebar from "./ProfileSidebar";
import CreateCommunityModal from "./CreateCommunityModal";
import MyCommunitiesSidebar from "./HamburgerMyCommunities";

const NavBarComponent: React.FC = () => {
  const [isOpenNotifications, setIsOpenNotifications] = useState<boolean>(false);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isOpenLeft, setIsOpenLeft] = useState<boolean>(false);  // State for the sidebar

  const closeMyCommunities = () => setIsOpenLeft(false); // Close sidebar handler
  // const closeNotifications = () => setIsOpenNotifications(false);

  return (
    <Navbar className="bg-[#818CF8] dark:bg-[#110C29]" fluid>
      {/* Hamburger Menu */}
      <div className="flex lg:hidden items-center justify-center">
        <button className="size-10" onClick={() => setIsOpenLeft(true)}>
          <img className="size-10 dark:invert" src="/assets/menu-burger.svg" alt="Open My Communities panel"/>
        </button>
      </div>

      {/* Sidebar - MyCommunitiesSidebar */}
      {isOpenLeft && (
        <div className="fixed top-0 left-0 w-[250px] h-full shadow-lg z-50 transition-transform duration-300 transform translate-x-0">
          <MyCommunitiesSidebar />
          <button className="absolute top-1 right-1 dark:text-white  text-black p-2 rounded-full" onClick={closeMyCommunities}>
            X
          </button>
        </div>
      )}

      <NavbarBrand as={Link} href="/landing">
        <img src="/assets/SBLogo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="hidden lg:block self-center whitespace-nowrap text-[32px] font-semibold dark:text-white">
          Study Buddies
        </span>
      </NavbarBrand>

      {/* Search Bar */}
      <div className="flex bg-white items-center xl:w-2xl w-lg rounded-2xl border-2 px-3 py-[3px] relative">
        <button className="size-10 mx-2.5 cursor-pointer">
          <img className="w-[25px] h-[25px]" src="../assets/searchIcon.svg" alt="Search" />
        </button>
        <input className="border-0 w-full focus:outline-none text-black"
          placeholder="Search for Learning Communities"
          type="text"
        />
        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="relative">
          <img className="w-[25px] h-[25px] cursor-pointer" src="/assets/filter.svg" alt="Filter Icon" />
        </button>

        {/* Dropdown */}
        {isFilterOpen && (
          <div className="absolute bg-white border rounded-lg shadow-lg w-40 mt-2 p-2 z-10 right-0 top-11">
            <ul>
              <li className="py-1 px-2 hover:bg-[#818cf88e] rounded-[10px] text-[16px] text-black cursor-pointer">Option 1</li>
              <li className="py-1 px-2 hover:bg-[#818cf88e] rounded-[10px] text-[16px] text-black cursor-pointer">Option 2</li>
              <li className="py-1 px-2 hover:bg-[#818cf88e] rounded-[10px] text-[16px] text-black cursor-pointer">Option 3</li>
            </ul>
          </div>
        )}
      </div>

      {/* Create Button */}
      <button
        className="flex items-center justify-center cursor-pointer text-white bg-gradient-to-r from-[#6F58DA] to-[#5131E7] rounded-full px-[18px] py-2.5 gap-1"
        onClick={() => setIsOpenModal(true)}
      >
        <p className="text-xl">+</p>
        <p className="hidden lg:block">Create</p>
      </button>

      {/* Notifications Button */}
      <div className="flex items-center justify-center">
        <button onClick={() => setIsOpenNotifications(true)}>
          <img className="cursor-pointer dark:invert" src="/assets/Bell.svg" alt="Notifications" />
        </button>
      </div>

      {/* Profile Button */}
      <div>
        <button
          onClick={() => setIsOpenProfile(true)}
          className="rounded-full size-12 font-bold bg-white dark:bg-gradient-to-b from-[#6F58DA] to-[#5131E7] cursor-pointer"
        >
          AL
        </button>
      </div>

      {/* Sidebars & Modal */}
      <NotificationsSidebar isOpen={isOpenNotifications} onClose={() => setIsOpenNotifications(false)} />
      <ProfileSidebar isOpen={isOpenProfile} onClose={() => setIsOpenProfile(false)} />
      <CreateCommunityModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </Navbar>
  );
};

export default NavBarComponent;
