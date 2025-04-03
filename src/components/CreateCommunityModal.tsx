import React from "react";
import { Modal, ToggleSwitch, Dropdown, DropdownItem, DropdownDivider } from "flowbite-react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose }) => {
  const [publicOrPrivate, setPublicOrPrivate] = React.useState(false);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-[#818CF8] w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <img className="w-[25px] h-[25px]" src="/assets/join.svg" alt="Join Icon" />
        </div>
        <h1 className="text-xl font-bold mt-2">Create a Community</h1>
      </div>

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 p-4">
        {/* Community Name */}
        <div className="flex flex-col">
          <p className="font-medium">Community Name</p>
          <input type="text" placeholder="Enter community name" className="w-full p-2 border rounded-md" />
        </div>

        {/* Privacy Toggle */}
        <div className="flex flex-col">
          <p className="font-medium">Privacy</p>
          <div className="flex items-center gap-2">
            <p>Private</p>
            <ToggleSwitch checked={publicOrPrivate} onChange={setPublicOrPrivate} />
            <p>Public</p>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="flex flex-col">
          <p className="font-medium">Subject Area</p>
          <Dropdown className="w-full text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px]" label="Select a subject">
            <DropdownItem>Mathematics</DropdownItem>
            <DropdownItem>Science</DropdownItem>
            <DropdownItem>Language Arts</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Other</DropdownItem>
          </Dropdown>
        </div>

        {/* Difficulty Level */}
        <div className="flex flex-col">
          <p className="font-medium">Difficulty Level</p>
          <Dropdown className="w-full text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px]" label="Select difficulty level">
            <DropdownItem>Beginner</DropdownItem>
            <DropdownItem>Intermediate</DropdownItem>
            <DropdownItem>Advanced</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Anyone</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col p-4">
        <p className="font-medium">Community Description</p>
        <textarea placeholder="Write a short description..." className="w-full p-2 h-32 border rounded-md resize-none" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:w-full sm:justify-between">
        <button className="bg-red-500 font-bold text-white rounded-[10px] px-4 py-2 w-full sm:w-auto cursor-pointer" onClick={onClose}>
          Cancel
        </button>
        <button className="bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px] font-bold px-4 py-2 w-full sm:w-auto cursor-pointer">
          Create Community
        </button>
      </div>
    </Modal>
  );
};

export default CreateCommunityModal;
