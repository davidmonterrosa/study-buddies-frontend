'use client'
import { CommunityMember } from "@/utils/Interfaces/UserInterfaces";
import { changeRole, currentUser, getLoggedInUserData, getToken, removeMember } from "@/utils/Services/DataServices";
import { capitalizeTitle, getRoleStyling } from "@/utils/Services/StyleHelpers";
import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface BuddyComponentProps {
  communityGroupId: number;
  buddyCount: number;
  buddies: CommunityMember[];
  onMessageClick: () => void;
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
                        buddy.role !== "owner" &&
                        <button
                          onClick={onMessageClick}
                          className="ml-auto bg-[#818CF8] cursor-pointer rounded-full w-[30px] h-[30px] flex items-center justify-center"
                        >
                          <img className="w-5" src="/assets/Message.svg" alt="Message Icon" />
                        </button>
                      }
                      {

                        (ownedCommunities.includes(Number(communityGroupId)) && buddy.role !== "owner") &&
                        (<>

                          <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild className="relative">
                                <button className="ml-2 p-1 hover:bg-muted hover:cursor-pointer rounded-full transition-colors" aria-label="Actions menu">
                                  <EllipsisVertical className="dark:stroke-white stroke-black" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-80 absolute top-0 right-0">
                                <DropdownMenuLabel>{`Manage ${buddy.firstName} ${buddy.lastName}`}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="hover:cursor-pointer" onClick={(() => removeMember(buddy.userId, communityGroupId, getToken()))}>Remove</DropdownMenuItem>
                                <DropdownMenuItem className="hover:cursor-pointer" onClick={(() => { setSelectedBuddy(buddy); setShowRoleDialog(true); })}>Change Role</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change Role</DialogTitle>
                                <DialogDescription className="sr-only">Menu for changing roles of selected buddy</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
                                <p>Assign a new role to <strong>{selectedBuddy?.firstName} {selectedBuddy?.lastName}</strong></p>
                                <Select defaultValue={selectedBuddy?.role} onValueChange={async (newRole: string) => {
                                  if (selectedBuddy) {
                                    await changeRole(communityGroupId, selectedBuddy.userId, newRole, getToken());
                                    // Update the buddiesList state to reflect the new role immediately
                                    setBuddiesList(prev =>
                                      prev.map(b =>
                                        b.userId === selectedBuddy.userId ? { ...b, role: newRole } : b
                                      )
                                    );
                                    setShowRoleDialog(false);
                                  }
                                }}>
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
                                <Button variant="secondary" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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

    </>
  );
};

export default BuddiesComponent;
