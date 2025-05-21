'use client'
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Trash } from 'lucide-react'
import { currentUser, deleteCommunity, getCommunityById, getLoggedInUserData, getMyCommunities, getToken, removeMember } from '@/utils/Services/DataServices'
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces'
// import { useAppContext } from '@/context/CommunityContext'

interface LeaveOrDeleteProps {
    updateFunction: (owned: number[], joined: number[]) => void
    communityURL: string
}

const LeaveOrDelete: React.FC<LeaveOrDeleteProps> = ({
    updateFunction,
    communityURL
}) => {

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

    const handleActiveState = () => {
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
            } else {
                console.log("Failed to leave community");
            }
            setIsActive(false);

        } else {
            const result = await deleteCommunity(community, getToken());
            const newCommunityData = await getLoggedInUserData(currentUser());
            console.log("Updated Joined Communities: ", result);

            if (result.success == true && newCommunityData?.success == true) {
                console.log(result);
                updateFunction(newCommunityData?.user.ownedCommunitys, newCommunityData?.user.joinedCommunitys);
            } else {
                console.log("Failed to delete community");
            }
            setIsActive(false);
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
        setCommunityId(Number(urlArray[2]))

        getLoggedInData();
    }, [])


    useEffect(() => {
        const getCommunityDetails = async () => {
            console.log("id to apply to getCommunityById(id)", Number(urlArray[2]))
            const returnedCommunity = await getCommunityById(Number(urlArray[2]));
            returnedCommunity.community.communityIsDeleted = true;
            console.log(returnedCommunity)
            // returnedCommunity.community.communityIsDeleted 
            setCommunity(returnedCommunity.community);
        }
        getCommunityDetails();
    }, [])



    return (
        <>
            {community.id !== 0 &&
                (<AlertDialog>
                    <AlertDialogTrigger onClick={handleActiveState} className='hover:bg-[rgba(129,140,248,0.25)] cursor-pointer rounded-full p-2'>
                
                        <Trash className={`${isActive ? "stroke-red-500" : "dark:stroke-white stroke-black"}`} />

                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='font-bold text-red-500'>{`${ownedCommunities.includes(communityId) ? `Are you sure you want to delete ${community.communityName}?` : `Are you sure you want to leave ${community.communityName}?`}`}</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleActiveState}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleRemovalAction}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>)
            }
        </>
    )
}

export default LeaveOrDelete