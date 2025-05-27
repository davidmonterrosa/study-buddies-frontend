"use client";
import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import CommunityCard from "@/components/Card";
import { getLoggedInUserData, getToken, getAllCommunities, currentUser } from "@/utils/Services/DataServices";
import { useBreakpoint } from "@/hooks/use-mobile";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "flowbite-react";
import EditCard from "@/components/EditCard";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [allCommunities, setAllCommunities] = useState<ICommunityData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'joined' | 'owned'>("joined");
  const breakpoint = useBreakpoint();
  const pageSize = (breakpoint === 'xl' || breakpoint === '2xl' || breakpoint === '3xl') ? 16 : breakpoint === 'lg' ? 16 : 10;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = await getLoggedInUserData(currentUser());
      if (loggedInUser) {
        setUser(loggedInUser.user);
        const data = await getAllCommunities(getToken());
        setAllCommunities(data.communities);
        setEditFirstName(loggedInUser.user.firstName);
        setEditLastName(loggedInUser.user.lastName);
        setEditUsername(loggedInUser.user.username);
      }
    };
    fetchData();
  }, []);

  const openEditModal = () => {
    setEditFirstName(user.firstName);
    setEditLastName(user.lastName);
    setEditUsername(user.username);
    setEditPassword("");
    setEditModalOpen(true);
    setTimeout(() => firstInputRef.current?.focus(), 100);
  };

  const handleSaveProfile = () => {
    // Logic to pass the save
    setEditModalOpen(false);
  };

  // Add updateCommunities function
  const updateCommunities = (owned: number[], joined: number[]) => {
    setUser((prev: any) => prev ? { ...prev, ownedCommunitys: owned, joinedCommunitys: joined } : prev);
  };

  if (!user) return null;

  const joinedCommunities = allCommunities.filter((c: ICommunityData) => user.joinedCommunitys.includes(c.id));
  const ownedCommunities = allCommunities.filter((c: ICommunityData) => user.ownedCommunitys.includes(c.id));

  const communitiesToShow = activeTab === 'joined' ? joinedCommunities : ownedCommunities;
  const totalPages = Math.ceil(communitiesToShow.length / pageSize);
  const paginatedCommunities = communitiesToShow.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center gap-0 lg:flex-row md:items-center md:justify-between mb-4">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center w-full justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] rounded-full w-[50px] h-[50px] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{user.firstName?.charAt(0).toUpperCase()}</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-[30px] font-bold text-black dark:text-white">
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <Button className="mt-4 cursor-pointer md:mt-0 bg-gradient-to-r from-[#6F58DA] to-[#5131E7]" onClick={openEditModal}>
            Edit Profile
          </Button>
        </div>
      </header>

      {/* Edit Profile Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSaveProfile();
            }}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1">
              First Name
              <input
                ref={firstInputRef}
                type="text"
                className="border rounded px-2 py-1"
                value={editFirstName}
                onChange={e => setEditFirstName(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              Last Name
              <input
                type="text"
                className="border rounded px-2 py-1"
                value={editLastName}
                onChange={e => setEditLastName(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              Email/Username
              <input
                type="text"
                className="border rounded px-2 py-1"
                value={editUsername}
                onChange={e => setEditUsername(e.target.value)}
                required
              />
            </label>
            {/* <label className="flex flex-col gap-1">
              Password
              <input
                type="password"
                className="border rounded px-2 py-1"
                value={editPassword}
                onChange={e => setEditPassword(e.target.value)}
                placeholder="New password"
              />
            </label> */}
            <DialogFooter>
              <Button color='red-200' className="bg-red-500 cursor-pointer text-white" type="button" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button className="cursor-pointer bg-gradient-to-r from-[#6F58DA] to-[#5131E7]" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={v => { setActiveTab(v as 'joined' | 'owned'); setCurrentPage(1); }} className="flex flex-col flex-grow h-full">
        <TabsList className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border dark:border-[#aa7dfc40] lg:border-0 lg:bg-transparent lg:dark:bg-transparent lg:dark:border-0 gap-6 w-full rounded-lg">
          <TabsTrigger value="joined" className="tab-trigger cursor-pointer">Joined Communities</TabsTrigger>
          <TabsTrigger value="owned" className="tab-trigger cursor-pointer">Owned Communities</TabsTrigger>
        </TabsList>
        <Separator className="rounded-sm dark:border-white border-[1px]" />
        <TabsContent value="joined" className="flex flex-col flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-4 2xl:grid-cols-4 2xl:grid-rows-4 gap-4 pb-15 md:pb-15 lg:pb-0 flex-grow">
            {paginatedCommunities.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 mt-8">No joined communities.</div>
            ) : (
              paginatedCommunities.map((community: ICommunityData, idx: number) => (
                <EditCard
                  key={idx}
                  communityId={community.id}
                  directLink={`communities/${community.id}`}
                  communityName={community.communityName}
                  subject={community.communitySubject}
                  buddies={community.communityMemberCount}
                  difficulty={community.communityDifficulty}
                  initials={community.communityOwnerName.charAt(0).toUpperCase()}
                  userName={community.communityOwnerName}
                  isPublic={community.communityIsPublic}
                  description={community.communityDescription}
                  cardType={activeTab}
                  currentUserId={user.id}
                  showDropdown={true}
                  updateCommunities={updateCommunities}
                />
              ))
            )}
          </div>
          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="w-full flex lg:hidden justify-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === idx + 1
                      ? 'bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="owned" className="flex flex-col flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-4 2xl:grid-cols-4 2xl:grid-rows-4 gap-4 pb-15 md:pb-15 lg:pb-0 flex-grow">
            {paginatedCommunities.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 mt-8">No owned communities.</div>
            ) : (
              paginatedCommunities.map((community: ICommunityData, idx: number) => (
                <EditCard
                  key={idx}
                  communityId={community.id}
                  directLink={`communities/${community.id}`}
                  communityName={community.communityName}
                  subject={community.communitySubject}
                  buddies={community.communityMemberCount}
                  difficulty={community.communityDifficulty}
                  initials={community.communityOwnerName.charAt(0).toUpperCase()}
                  userName={community.communityOwnerName}
                  isPublic={community.communityIsPublic}
                  description={community.communityDescription}
                  cardType={activeTab}
                  currentUserId={user.id}
                  showDropdown={true}
                  updateCommunities={updateCommunities}
                />
              ))
            )}
          </div>
          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="w-full flex lg:hidden justify-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === idx + 1
                      ? 'bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage; 