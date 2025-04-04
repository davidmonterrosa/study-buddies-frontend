import React from "react";

interface ViewCommunityButtonProps {
  communityName: string;
  isActive: boolean;
  onClick: () => void;
}

const ViewCommunityButton: React.FC<ViewCommunityButtonProps> = ({
  communityName,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl p-4 hover:cursor-pointer dark:hover:shadow-[0_2px_15px_#6f58da] transition duration-200
       ${
         isActive
           ? "bg-[#6f58da] text-white"
           : "bg-transparent text-black dark:text-white"
       }`}
    >
      <p className="font-bold text-left">{communityName}</p>
    </button>
  );
};

export default ViewCommunityButton;
