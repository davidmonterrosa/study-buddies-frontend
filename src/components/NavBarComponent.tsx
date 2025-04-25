"use client";
import { Navbar, NavbarBrand } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import NotificationsSidebar from "./NotificationsSidebar";
import ProfileSidebar from "./ProfileSidebar";
import CreateCommunityModal from "./CreateCommunityModal";
import MyCommunitiesSidebar from "./HamburgerMyCommunities";

const NavBarComponent: React.FC = () => {
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOpenLeft, setIsOpenLeft] = useState(false);

  const closeMyCommunities = () => setIsOpenLeft(false);

  return (
    <>
      <Navbar className="bg-[#818CF8] dark:bg-[#110C29] w-full px-4 py-2" fluid>
        <div className="flex w-full justify-between items-center gap-2">
          {/* Left Side: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button className="lg:hidden" onClick={() => setIsOpenLeft(true)}>
              <img className="size-10 dark:invert" src="/assets/menu-burger.svg" alt="Menu" />
            </button>
            <NavbarBrand as={Link} href="/landing" className="flex items-center">
              <img src="/assets/SBLogo.png" className="h-9" alt="Logo" />
              <span className="hidden lg:block text-[32px] font-semibold dark:text-white ml-2">
                Study Buddies
              </span>
            </NavbarBrand>
          </div>

          {/* Center: Search bar - show from md and up */}
          <div className="hidden sm:flex bg-white items-center xl:w-2xl w-lg rounded-2xl border-2 px-3 py-[3px] relative">
            <button className="size-10 mx-2.5 cursor-pointer">
              <img className="w-[25px] h-[25px]" src="../assets/searchIcon.svg" alt="Search" />
            </button>
            <input
              className="border-0 w-full focus:outline-none text-black"
              placeholder="Search for Learning Communities"
              type="text"
            />
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="relative">
              <img className="w-[25px] h-[25px] cursor-pointer" src="/assets/filter.svg" alt="Filter" />
            </button>

            {isFilterOpen && (
              <div className="absolute bg-white border rounded-lg shadow-lg w-40 mt-2 p-2 z-10 right-0 top-11">
                <ul>
                  <li className="py-1 px-2 hover:bg-[#818cf88e] rounded-[10px] text-[16px] text-black cursor-pointer">
                    Option 1
                  </li>
                  <li className="py-1 px-2 hover:bg-[#818cf88e] rounded-[10px] text-[16px] text-black cursor-pointer">
                    Option 2
                  </li>
                  <li className="py-1 px-2 hover:bg-[#818cf88e] rounded-[10px] text-[16px] text-black cursor-pointer">
                    Option 3
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Side: Create, Notifications, Profile */}
          <div className="flex items-center gap-3">
            {/* Create Button (always shown, text hidden <lg) */}
            <button className=" hidden sm:flex items-center justify-center cursor-pointer text-white bg-gradient-to-r from-[#6F58DA] to-[#5131E7] rounded-full px-[18px] py-2.5 gap-1"
              onClick={() => setIsOpenModal(true)}
            >
              <p className="text-xl">+</p>
              <p className="hidden lg:block">Create</p>
            </button>

            <button onClick={() => setIsOpenNotifications(true)}>
              <img className="cursor-pointer dark:invert" src="/assets/Bell.svg" alt="Notifications" />
            </button>

            <button
              onClick={() => setIsOpenProfile(true)}
              className="rounded-full size-12 font-bold bg-white dark:bg-gradient-to-b from-[#6F58DA] to-[#5131E7] cursor-pointer"
            >
              AL
            </button>
          </div>
        </div>
      </Navbar>

      {/* Modals and Sidebars */}
      <MyCommunitiesSidebar isOpen={isOpenLeft} onClose={closeMyCommunities} />
      <NotificationsSidebar isOpen={isOpenNotifications} onClose={() => setIsOpenNotifications(false)} />
      <ProfileSidebar isOpen={isOpenProfile} onClose={() => setIsOpenProfile(false)} />
      <CreateCommunityModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default NavBarComponent;
