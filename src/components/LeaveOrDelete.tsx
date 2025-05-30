'use client'
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Trash } from 'lucide-react'
import { currentUser, deleteCommunity, getCommunityById, getLoggedInUserData, /*getMyCommunities,*/ getToken, removeMember } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { toast } from "sonner";
// import { useAppContext } from '@/context/CommunityContext'

interface LeaveOrDeleteProps {
    updateFunction: (owned: number[], joined: number[]) => void
    communityURL: string
    closeParentDialog?: () => void
    cardType?: 'joined' | 'owned'
}

const LeaveOrDelete: React.FC<LeaveOrDeleteProps> = ({
    updateFunction,
    communityURL,
    closeParentDialog,
    cardType
}) => {
    // const router = useRouter();
    const [isActive, setIsActive] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>(-1)
    // const [userName, setUserName] = useState<string>("");
    // const [firstName, setFirstName] = useState<string>("");
    // const [lastName, setLastName] = useState<string>("");
    const [ownedCommunities, setOwnedCommunities] = useState<number[]>([])
    // const [isDark, setIsDark] = useState<boolean>(checkTheme() === "dark");
    // const [joinedCommunities, setJoinedCommunities] = useState<number[]>([])
    const [communityId, setCommunityId] = useState<number>(-1)
    const [community, setCommunity] = useState<ICommunityData>({
        id: 0,
        communityOwnerID: 0,
        isCommunityOwner: false,
        communityIsPublic: false,
        communityIsDeleted: false,
        communityOwnerName: "",
        communityName: "",
        communitySubject: "",
        communityMemberCount: 1,
        communityChats: [],
        communityMembers: [],
        communityRequests: [-1],
        communityDifficulty: "",
        communityDescription: "",
    })

    const urlArray = communityURL.split('/');

    const getCommunityDetails = async () => {
        console.log("id to apply to getCommunityById(id)", Number(urlArray[1]))
        const returnedCommunity = await getCommunityById(Number(urlArray[1]));
        let communityData = null;

        if (returnedCommunity) {
            if (returnedCommunity.community) {
                communityData = returnedCommunity.community;
            } else if (returnedCommunity.id) {
                communityData = returnedCommunity;
            }
        }

        if (!communityData) {
            console.error("Community not found or API error");
            return;
        }

        communityData.communityIsDeleted = true;
        console.log(communityData)
        setCommunity(communityData);
    }

    const handleActiveState = async () => {
        if (!isActive) {
            await getCommunityDetails();
        }
        setIsActive(!isActive);
    }

    const handleRemovalAction = async () => {
        if(!community || community.id === 0) {
            console.log("Community Data not yet loaded")
            return;
        }
        if (!ownedCommunities.includes(communityId)) {
            const result = await removeMember(userId, communityId, getToken());
            const newCommunityData = await getLoggedInUserData(currentUser());
            console.log("Updated Joined Communities: ", result.success);
            if (result.success == true && newCommunityData?.success == true) {
                updateFunction(newCommunityData?.user.ownedCommunitys, newCommunityData?.user.joinedCommunitys);
                setIsActive(false);
                if (closeParentDialog) closeParentDialog();
                localStorage.setItem("postReloadToast", JSON.stringify({
                  type: "success",
                  message: "Left Community",
                  description: `You have left ${community.communityName}.`
                }));
                window.location.reload();
            } else {
                toast.error("Error", { description: "Failed to leave community." })
            }
        } else {
            const result = await deleteCommunity(community, getToken());
            const newCommunityData = await getLoggedInUserData(currentUser());
            console.log("Updated Joined Communities: ", result);
            if (result.success == true && newCommunityData?.success == true) {
                console.log(result);
                updateFunction(newCommunityData?.user.ownedCommunitys, newCommunityData?.user.joinedCommunitys);
                setIsActive(false);
                if (closeParentDialog) closeParentDialog();
                localStorage.setItem("postReloadToast", JSON.stringify({
                  type: "success",
                  message: "Community Deleted",
                  description: `You have deleted ${community.communityName}.`
                }));
                window.location.reload();
            } else {
                toast.error("Error", { description: "Failed to delete community." })
            }
        }
    }

    useEffect(() => {

        const getLoggedInData = async () => {
            const user = await getLoggedInUserData(currentUser());
            if (!user || !user.user.username) return;

            const loggedIn = await getLoggedInUserData(user.user.username);
            console.log(loggedIn);
            if (loggedIn) {
                setUserId(loggedIn.user.id)
                // setUserName(loggedIn.user.username || "");
                // setFirstName(loggedIn.user.firstName || "");
                // setLastName(loggedIn.user.lastName || "");
                setOwnedCommunities(loggedIn.user.ownedCommunitys);
                // setJoinedCommunities(loggedIn.user.joinedCommunitys);
            }
        };
        console.log(urlArray)
        setCommunityId(Number(urlArray[1]))

        getLoggedInData();
    }, [])


    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div
                        className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[rgba(129,140,248,0.10)] rounded"
                        onClick={e => { e.stopPropagation(); handleActiveState(); }}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Trash className={`${isActive ? "stroke-red-500" : "dark:stroke-white stroke-black"}`} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span className="text-sm dark:text-black text-white select-none">
                                        {cardType === 'owned' ? 'Delete Community' : 'Leave Community'}
                                    </span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </AlertDialogTrigger>
                {community.id !== 0 ? (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='font-bold text-red-500'>{`${ownedCommunities.includes(communityId) ? `Are you sure you want to delete ${community.communityName}?` : `Are you sure you want to leave ${community.communityName}?`}`}</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => { handleActiveState(); if (closeParentDialog) closeParentDialog(); }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={e => { e.stopPropagation(); handleRemovalAction(); }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                ) : null}
            </AlertDialog>
        </>
    )
}

export default LeaveOrDelete