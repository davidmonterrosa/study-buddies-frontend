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
  Dropdown,
  DropdownItem,
  DropdownDivider,
  ToggleSwitch,
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
  const [publicOrPrivate, setPrivate] = useState(false);

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
      {/* Modal */}
      <Modal
        className="rounded-15px sm:w-full sm:max-h-screen sm:overflow-auto sm:max-w-full"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        {/* Modal Content */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-[#818CF8] w-[50px] h-[50px] rounded-full flex items-center justify-center">
            <img className="w-[25px] h-[25px]" src="/assets/join.svg" alt="" />
          </div>
          <h1 className="text-xl font-bold mt-2">Create a Community</h1>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 p-4">
          {/* Community Name */}
          <div className="flex flex-col">
            <p className="font-medium">Community Name</p>
            <input
              type="text"
              placeholder="Enter community name"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Visibility (Public or Private) */}
          <div className="flex flex-col">
            <p className="font-medium">Privacy</p>
            <div className="flex items-center gap-2">
              <p>Private</p>
              <ToggleSwitch checked={publicOrPrivate} onChange={setPrivate} />
              <p>Public</p>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="flex flex-col">
            <p className="font-medium">Subject Area</p>
            <Dropdown
              className="w-full text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px]"
              label="Select a subject"
            >
              <DropdownItem>Mathematics</DropdownItem>
              <DropdownItem>Science</DropdownItem>
              <DropdownItem>Language Arts</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Other</DropdownItem>
            </Dropdown>
          </div>

          {/* Difficulty Selection */}
          <div className="flex flex-col">
            <p className="font-medium">Difficulty Level</p>
            <Dropdown
              className="w-full text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px]"
              label="Select difficulty level"
            >
              <DropdownItem>Beginner</DropdownItem>
              <DropdownItem>Intermediate</DropdownItem>
              <DropdownItem>Advanced</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Anyone</DropdownItem>
            </Dropdown>
          </div>
        </div>

        {/* Description Field */}
        <div className="flex flex-col p-4">
          <p className="font-medium">Community Description</p>
          <textarea
            placeholder="Write a short description about your community..."
            className="w-full p-2 h-32 border rounded-md resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:w-full sm:justify-between">
          <button className="bg-red-500 font-bold text-white rounded-[10px] px-4 py-2 w-full sm:w-auto">
            Cancel
          </button>
          <button className="bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px] font-bold px-4 py-2 w-full sm:w-auto">
            Create Community
          </button>
        </div>
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
