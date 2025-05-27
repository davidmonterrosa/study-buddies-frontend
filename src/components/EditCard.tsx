import React, { useState } from "react";
import { getDifficultyColor } from "@/utils/Services/StyleHelpers";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import CommunityPreview from "./Preview";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import LeaveOrDelete from "@/components/LeaveOrDelete";

interface CommunityCardProps {
    communityId: number;
    directLink: string;
    communityName: string;
    subject: string;
    buddies: number;
    difficulty: string;
    initials: string;
    userName: string;
    isPublic: boolean;
    description: string;
    cardType?: 'joined' | 'owned';
    currentUserId?: number;
    showDropdown?: boolean;
    updateCommunities?: (owned: number[], joined: number[]) => void;
    closeParentDialog?: () => void;
}

const EditCard: React.FC<CommunityCardProps> = ({
    communityId,
    directLink,
    communityName,
    subject,
    buddies,
    difficulty,
    initials,
    userName,
    isPublic,
    description,
    cardType,
    // currentUserId,
    showDropdown,
    updateCommunities,
    // closeParentDialog
}) => {
    const [open, setOpen] = useState(false);

    const handleOptions = () => {
        if (open === true) {
            setOpen(false);
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <article className="bg-linear-to-b from-[#473FCB] to-[#231E6D] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] dark:hover:shadow-[0_2px_15px_#6f58da] w-full h-[150px] rounded-[15px] text-white p-2 light:drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]"
            >
                {/* <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="flex justify-self-end" asChild>
                        <button className=" p-1 rounded-full hover:bg-[rgba(129,140,248,0.25)] focus:outline-none hover:cursor-pointer" onClick={e => e.stopPropagation()}>
                            <EllipsisVertical className="w-6 h-6 text-white" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end"> */}
                        {updateCommunities && (
                            <div className="flex justify-end">
                                <LeaveOrDelete
                                    updateFunction={updateCommunities}
                                    communityURL={`communities/${communityId}`}
                                    closeParentDialog={() => setOpen(false)}
                                    cardType={cardType}
                                />

                            </div>
                        )}
                {/* //     </DropdownMenuContent>
                // </DropdownMenu> */}
                <DialogTrigger asChild>
                    <div className="mt-[-36px]">
                        <h1 className="font-bold text-[20px] overflow-hidden text-nowrap">
                            {communityName}
                        </h1>
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
                    </div>
                </DialogTrigger>
            </article>

            <DialogContent aria-description="Preview of Community Content">
                <DialogTitle className="text-4xl font-bold text-black dark:text-white"> {communityName} </DialogTitle>
                <CommunityPreview
                    communityId={communityId}
                    directLink={directLink}
                    communityName={''}
                    subject={subject}
                    buddies={buddies}
                    difficulty={difficulty}
                    initials={initials}
                    userName={userName}
                    isPublic={isPublic}
                    description={description}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditCard;
