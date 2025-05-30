// import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { checkToken, currentUser, getLoggedInUserData, getToken, joinCommunity, requestJoin } from "@/utils/Services/DataServices";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface PreviewProps {
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
  onCancel: () => void;
  onJoinOrVisit?: () => void;
}

const CommunityPreview: React.FC<PreviewProps> = ({
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
  onCancel,
  onJoinOrVisit,
}) => {

  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null)
  const [myCommunities, setMyCommunities] = useState<number[]>([])

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = await getLoggedInUserData(currentUser());
      if (loggedIn) {
        setUserId(loggedIn.user.id);
        setMyCommunities(loggedIn.user.ownedCommunitys.concat(loggedIn.user.joinedCommunitys))
      }
    }

    if (!checkToken()) {
      router.push('/');
    } else {
      getLoggedInData()
    }
  }, [])

  const handleJoinBtn = async () => {
        if(userId === null) return;
        if(!myCommunities.includes(communityId)){
          const result = await joinCommunity(userId, communityId, getToken());
          if(result) {
            toast.success("Joined Community", {
              description: `You have joined ${communityName} successfully!`
            });
            setTimeout(() => {
              if (onJoinOrVisit) onJoinOrVisit();
              router.push(directLink);
            }, 1000);
          } else {
            toast.error("Error", {
              description: `Failed to join ${communityName}.`
            });
          }
          console.log(result)
        } else {
          if (onJoinOrVisit) onJoinOrVisit();
          router.push(directLink)
        }
        // if (result.valueOf() == true) {
        //   console.log("Successfully created group")
        // } else {
        //   console.log("Not created")
        // }
  }

  const handleRequestBtn = async () => {
    if(userId === null) return;
    if(!myCommunities.includes(communityId)) {
      const result = await requestJoin(userId, communityId, getToken());
      if(result) {
        onCancel();
      }
      console.log(result)
    } else {
      router.push(directLink)
    }
  }

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
        <div className="flex items-center gap-2">
          <div className="bg-[#818CF8] rounded-full w-[35px] h-[35px] flex items-center justify-center">
            <p className="text-[18px] font-bold text-black">{initials}</p>
          </div>
          <p className="font-semibold text-[18px]">{userName}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 hover:brightness-110 bg-[#FF5C7F] text-white rounded-lg cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          {userId && (
            isPublic ?
              <button className="px-4 py-2 hover:brightness-110 bg-[#0E9E6E] text-white rounded-lg cursor-pointer" onClick={handleJoinBtn}>
                {myCommunities.includes(communityId) ? "Visit" : "Join"}
              </button>
            :
              <button className="px-4 py-2 hover:brightness-110 bg-[#0E9E6E] text-white rounded-lg cursor-pointer" onClick={handleRequestBtn}>
                {myCommunities.includes(communityId) ? "Visit" : "Request"}
              </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityPreview;
