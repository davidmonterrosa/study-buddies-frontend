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
      className={`w-full rounded-2xl p-4 transition duration-200 hover:cursor-pointer
        ${isActive
          ? "bg-[#818df8] text-white dark:bg-[#6f58da]" // active state
          : "bg-transparent text-black dark:text-white hover:bg-[rgba(129,140,248,0.25)]"} 
        dark:hover:shadow-[0_2px_15px_#6f58da] hover:shadow-[0_2px_15px_#818df8bf]`}
    >
      <p className="font-bold text-left">{communityName}</p>
    </button>
  );
};

export default ViewCommunityButton;
