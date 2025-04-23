import React from "react";

interface PreviewProps {
  communityName: string;
  subject: string;
  buddies: number;
  difficulty: string;
  initials: string;
  userName: string;
  isPublic: boolean;
  description: string;
}

const CommunityPreview: React.FC<PreviewProps> = ({
  communityName,
  subject,
  buddies,
  difficulty,
  initials,
  userName,
  isPublic,
  description,
}) => {
  return (
    <>
      {/* Header with name, then badges below */}
      <div>
        <h1 className="text-4xl font-bold text-black dark:text-white">
          {communityName}
        </h1>
        <div className="flex gap-4 items-center mt-2">
          <p className="bg-[#818CF8] rounded-[10px] py-[2px] px-[5px] text-white text-[14px] font-semibold">
            {buddies} Buddies
          </p>
          <p className="bg-[#12D393] text-black rounded-[10px] py-[2px] px-[5px] text-[14px] font-semibold">
            {difficulty}
          </p>
        </div>
      </div>

      <h2 className="text-xl">{subject}</h2>
      <p className="mt-2 text-sm">{description}</p>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#818CF8] rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <p className="text-[18px] font-bold text-black">{initials}</p>
          </div>
          <p className="font-semibold text-[18px]">{userName}</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#FF5C7F] text-white rounded-lg cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#0E9E6E] text-white rounded-lg cursor-pointer">
            {isPublic ? "Join" : "Request"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityPreview;
