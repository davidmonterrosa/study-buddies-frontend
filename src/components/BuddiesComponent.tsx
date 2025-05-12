import { CommunityMember } from "@/utils/Interfaces/UserInterfaces";
import { capitalizeTitle, getRoleStyling } from "@/utils/Services/StyleHelpers";
import React, { useEffect } from "react";

interface BuddyComponentProps {
  communityGroupId: number,
  buddyCount: number,
  buddies: CommunityMember[]
}

const BuddiesCompononet: React.FC<BuddyComponentProps> = ({
  communityGroupId,
  buddyCount,
  buddies
}) => {
  useEffect(() => {
    console.log(communityGroupId)
    console.log(buddyCount)
  }, [])
  return (
    <section className="flex flex-col overflow-hidden mt-4">
      <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
        {/* List of Buddies*/}
        {
          buddies.map((buddy: CommunityMember, idx: number) => {
            return (
              <div key={idx} className="flex items-start gap-2">
                <div className="bg-[#F6F6F6] dark:bg-[#140D34] border-[#CCCCCC] border-[1px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
                  <div className="flex items-center gap-2">
                    {/* Initials */}
                    <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                      <p className="text-[14px] font-bold text-black">{buddy.firstName.charAt(0).toUpperCase()}</p>
                    </div>
                    {/* Name */}
                    <div className="flex flex-row space-x-2">
                      <p className="font-semibold text-sm">{buddy.firstName}</p>
                      <p className="font-semibold text-sm">{buddy.lastName}</p>
                    </div>
                    {
                      buddy.role != "student" ?
                        <div className={`${getRoleStyling(`${buddy.role}`)} place-items-center text-black rounded-[15px] py-[2px] px-[5px] max-h-10 w-28`}>
                          <p className="text-center sm:text-left font-semibold">
                            {capitalizeTitle(buddy.role)}
                          </p>
                        </div>
                        : null
                    }
                    {/* Message Button aligned to end */}
                    <button className="ml-auto bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                      <img className="w-5" src="/assets/Message.svg" alt="Message Icon" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        }

        <div className="flex items-start gap-2">
          <div className="bg-[#F6F6F6] dark:bg-[#140D34] border-[#CCCCCC] border-[1px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
            <div className="flex items-center gap-2">
              {/* Initials */}
              <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <p className="text-[14px] font-bold text-black">A</p>
              </div>
              {/* Name */}
              <div className="flex flex-row space-x-2">
                <p className="font-semibold text-sm">A</p>
                <p className="font-semibold text-sm">B</p>
              </div>
              {
               
                  <div className={`${getRoleStyling(`Ta`)} place-items-center text-black rounded-[15px] py-[2px] px-[5px] max-h-10 w-28`}>
                    <p className="text-center sm:text-left font-semibold">
                     TA
                    </p>
                  </div>
                
              }
              {/* Message Button aligned to end */}
              <button className="ml-auto bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <img className="w-5" src="/assets/Message.svg" alt="Message Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuddiesCompononet;
