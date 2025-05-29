'use client'
import { CommunityMember } from "@/utils/Interfaces/UserInterfaces";
import { changeRole, currentUser, getLoggedInUserData, getToken, removeMember } from "@/utils/Services/DataServices";
import { capitalizeTitle, getRoleStyling } from "@/utils/Services/StyleHelpers";
import { EllipsisVertical, UserMinus, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
// import { toast } from "sonner";

interface BuddyComponentProps {
  communityGroupId: number;
  buddyCount: number;
  buddies: CommunityMember[];
  onMessageClick: (id: number) => void;
}

const BuddiesComponent: React.FC<BuddyComponentProps> = ({
  communityGroupId,
  buddyCount,
  buddies,
  onMessageClick
}) => {

  const [ownedCommunities, setOwnedCommunities] = useState<number[]>([])
  const [selectedBuddy, setSelectedBuddy] = useState<CommunityMember | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState<boolean>(false);
  const [buddiesList, setBuddiesList] = useState<CommunityMember[]>(buddies);
  const [userId, setUserId] = useState<number>(-1)

  // update buddies list when a new role is selected
  const [updateRole, setUpdateRole] = useState<boolean>(false);

  useEffect(() => {
    if (updateRole) {
      setBuddiesList(buddies);
      setUpdateRole(false);
    }
  }, [buddies, updateRole]);



  useEffect(() => {
    const getUserData = async () => {
      const loggedInUser = await getLoggedInUserData(currentUser());
      console.log(loggedInUser);
      if (loggedInUser) {
        setOwnedCommunities(loggedInUser?.user.ownedCommunitys)
        setUserId(loggedInUser.user.id)
      } else {
        console.log("Failed to return user data.")
      }

    }
    getUserData();
    console.log(communityGroupId, typeof communityGroupId)
    console.log(buddyCount)
  }, [])

  // useEffect(() => {
  //   // setBuddiesList()
  // }, [showRoleDialog])

  // Remove member handler
  const handleRemoveMember = async (buddy: CommunityMember) => {
    await removeMember(buddy.userId, communityGroupId, getToken());
    setBuddiesList(prev => prev.filter(b => b.userId !== buddy.userId));
    localStorage.setItem("postReloadToast", JSON.stringify({
      type: "success",
      message: "Member Removed",
      description: `${buddy.firstName} ${buddy.lastName} has been removed from the community.`
    }));
    window.location.reload();
  };

  // Change role handler
  const handleChangeRole = async (newRole: string) => {
    if (selectedBuddy) {
      await changeRole(communityGroupId, selectedBuddy.userId, newRole, getToken());
      setBuddiesList(prev =>
        prev.map(b =>
          b.userId === selectedBuddy.userId ? { ...b, role: newRole } : b
        )
      );
      setShowRoleDialog(false);
      localStorage.setItem("postReloadToast", JSON.stringify({
        type: "success",
        message: "Role Changed",
        description: `${selectedBuddy.firstName} ${selectedBuddy.lastName} is now a ${capitalizeTitle(newRole)}.`
      }));
      window.location.reload();
    }
  };

  return (
    <>
      {ownedCommunities.length > 0 &&
        (<section className="flex flex-col overflow-hidden mt-4">
          <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
            {
              buddiesList.map((buddy: CommunityMember, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="bg-[#F6F6F6] dark:bg-[#140D34] border-[#CCCCCC] border-[1px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[14px] font-bold text-black">{buddy.firstName.charAt(0).toUpperCase()}</p>
                      </div>
                      <div className="flex flex-row space-x-2">
                        <p className="font-semibold text-sm">{buddy.firstName}</p>
                        <p className="font-semibold text-sm">{buddy.lastName}</p>
                      </div>
                      {
                        buddy.role !== "student" &&
                        <div className={`${getRoleStyling(buddy.role)} place-items-center text-black rounded-[15px] py-[2px] px-[5px] max-h-10 w-28`}>
                          <p className="text-center sm:text-left font-semibold">
                            {capitalizeTitle(buddy.role)}
                          </p>
                        </div>
                      }
                      {
                        buddy.userId !== userId &&
                        <button
                          onClick={() => onMessageClick(buddy.userId)}
                          className="ml-auto bg-[#818CF8] cursor-pointer rounded-full w-[30px] h-[30px] flex items-center justify-center"
                        >
                          <img className="w-5" src="/assets/Message.svg" alt="Message Icon" />
                        </button>
                      }
                      {

                        (ownedCommunities.includes(Number(communityGroupId)) && buddy.role !== "owner") &&
                        (<>

                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild className="relative">
                              <button className="ml-2 p-1 hover:bg-muted hover:cursor-pointer rounded-full transition-colors" aria-label="Actions menu">
                                <EllipsisVertical className="dark:stroke-white stroke-black" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 absolute top-0 right-0">
                              <DropdownMenuLabel>{`Manage ${buddy.firstName} ${buddy.lastName}`}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleRemoveMember(buddy)}>
                                <UserMinus className="w-4 h-4 mr-2 inline text-red-500" />
                                <p className="text-red-500">Remove</p>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:cursor-pointer" onClick={() => { setSelectedBuddy(buddy); setShowRoleDialog(true); }}>
                                <UserCog className="w-4 h-4 mr-2 inline" /> Change Role
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>)

                        // changeRole(communityGroupId, buddy.userId, buddy.role, getToken()))}
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </section>)}

      {/* Role Change Dialog (single, outside the map) */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription className="sr-only">Menu for changing roles of selected buddy</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Assign a new role to <strong>{selectedBuddy?.firstName} {selectedBuddy?.lastName}</strong></p>
            <Select defaultValue={selectedBuddy?.role} onValueChange={handleChangeRole}>
              <SelectTrigger className="hover:cursor-pointer">
                <SelectValue placeholder="Select new role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:cursor-pointer" value="student">Student</SelectItem>
                <SelectItem className="hover:cursor-pointer" value="teacher">Teacher</SelectItem>
                <SelectItem className="hover:cursor-pointer" value="ta">TA/Tutor</SelectItem>
                <Separator className="border-1" />
                <SelectItem className="hover:cursor-pointer font-bold bg-red-500 dark:text-white text-black mt-1" value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button className="bg-red-500 hover:bg-red-500 hover:brightness-110 text-white" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuddiesComponent;
