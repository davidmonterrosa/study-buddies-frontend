"use client";
import {
  Drawer,
  Modal,
  ModalBody,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Popover,
} from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import { Input } from "./ui/input";

const NavBarComponent = () => {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const closeMyCommunities = () => setIsOpenLeft(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  const closeNotifications = () => setIsOpenRight(false);
  const [openModal, setOpenModal] = useState(false);

  const content = (
    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Popover title
        </h3>
      </div>
      <div className="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
    </div>
  );

  return (
    <Navbar className=" bg-[#818CF8] dark:bg-[#110C29]" fluid>
      {/* Open My Communities panel button*/}
      <div className="flex lg:hidden items-center justify-center">
        <button className="size-10" onClick={() => setIsOpenLeft(true)}>
          <img
            className="size-10"
            src="/assets/menu-burger.svg"
            alt="Open My Communities panel"
          />
        </button>
      </div>
      <Drawer open={isOpenLeft} onClose={closeMyCommunities}>
        {/* This is where the My Communities panel will be located on tablet and smaller */}
      </Drawer>

      <NavbarBrand as={Link} href="/" className="">
        <img
          src="/assets/SBLogo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-[32px] font-semibold dark:text-white">
          Study Buddies
        </span>
      </NavbarBrand>

      {/* Search Bar */}
      <div className="flex bg-white items-center w-2xl rounded-2xl border-2 px-3 py-[3px]">
        <button className="size-10 mx-2.5 cursor-pointer">
          <img
            className="w-[25px] h-[25px]"
            src="../assets/searchIcon.svg"
            alt="Search Icon"
          />
        </button>
        <Input
          className="border-0 "
          placeholder="Search for Learning Communities"
        />
      </div>

      {/* Create Button modal */}
      <button
        className="flex items-center justify-center cursor-pointer bg-[#4F46E5] text-white dark:bg-linear-to-r from-[#6F58DA] to-[#5131E7] rounded-full px-[18px] py-2.5 gap-1"
        onClick={() => setOpenModal(true)}
      >
        <p className="text-xl">+</p>
        <p className="hidden lg:block">Create</p>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="flex items-center justify-center">
          <div className="bg-[#818CF8] w-[50px] h-[50px] rounded-full flex items-center justify-center">
            <img className="w-[25px] h-[25px]" src="/assets/join.svg" alt="" />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </ModalBody>
      </Modal>

      {/* Notifications Panel */}
      <div className="flex items-center justify-center">
        <button onClick={() => setIsOpenRight(true)}>
          <img
            className="cursor-pointer"
            src="/assets/Bell.svg"
            alt="Notification Bell"
          />
        </button>
      </div>
      <Drawer open={isOpenRight} onClose={closeNotifications} position="right">
        {/* Notifications Panel */}
      </Drawer>
      <Popover content={content} placement="bottom">
        <button className="rounded-full size-12 font-bold bg-white dark:bg-linear-to-b from-[#6F58DA] to-[#5131E7] cursor-pointer">
          AL
        </button>
      </Popover>
    </Navbar>
  );
};

export default NavBarComponent;
