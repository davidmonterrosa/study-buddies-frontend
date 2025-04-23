import React from "react";
import { getDifficultyColor } from "@/utils/Services/StyleHelpers";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import CommunityPreview from "./CommunityPreview";

interface CommunityCardProps {
  communityName: string;
  subject: string;
  buddies: number;
  difficulty: string;
  initials: string;
  userName: string;
  isPublic: boolean;
  description: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  communityName,
  subject,
  buddies,
  difficulty,
  initials,
  userName,
  isPublic,
  description
}) => {
  // Function to determine background color based on difficulty level

  return (
    <Dialog>
      <DialogTrigger>
        <article className="bg-linear-to-b from-[#473FCB] to-[#231E6D] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] dark:hover:shadow-[0_2px_15px_#6f58da] w-full h-[175px] rounded-[15px] text-white p-2 cursor-pointer light:drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]">
          <div className="flex justify-between">
            <h1 className="font-bold text-[20px] overflow-hidden text-nowrap  ">
              {communityName}
            </h1>
            {/* Conditional rendering for lock/unlock icon */}
            <img
              className="w-[30px]"
              src={isPublic ? "/assets/Unlock.svg" : "/assets/Lock.svg"}
              alt={isPublic ? "Public Community" : "Private Community"}
            />
          </div>
          <h2 className="font-semibold text-[16px] text-left">{subject}</h2>
          <div className="flex flex-wrap gap-2 text-[14px] font-semibold mt-2">
            <p className="bg-[#818CF8] rounded-[10px] py-[2px] px-[5px]">
              {buddies} Buddies
            </p>
            <p
              className={`${getDifficultyColor(
                difficulty
              )} text-black rounded-[10px] py-[2px] px-[5px]`}
            >
              {difficulty}
            </p>
          </div>
          <div className="flex mt-2 gap-2 items-center">
            <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
              <p className="text-[14px] font-bold text-black">{initials}</p>
            </div>
            <p className="font-semibold text-sm">{userName}</p>
          </div>
        </article>
      </DialogTrigger>

      <DialogContent aria-description="Preview of Community Content">
        <DialogTitle className="invisible"> Preview </DialogTitle>
        <CommunityPreview
          communityName={communityName}
          subject={subject}
          buddies={buddies}
          difficulty={difficulty}
          initials={initials}
          userName={userName}
          isPublic={isPublic}
          description={description}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CommunityCard;
