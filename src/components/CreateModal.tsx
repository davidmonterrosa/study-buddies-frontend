'use client'

import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import {
  checkToken,
  createNewCommunity,
  currentUser,
  getLoggedInUserData,
  getToken,
} from "@/utils/Services/DataServices";
import { useRouter } from "next/navigation";
import { SwitchToggle } from "./ui/SwitchToggle";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose }) => {
  const [publicOrPrivate, setPublicOrPrivate] = useState(false);

  const [comOwnerId, setComOwnerId] = useState<number>(0);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [ownerName, setOwnerName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [comName, setComName] = useState<string>("");
  const [comSubject, setComSubject] = useState<string>("");
  const [comDifficulty, setComDifficulty] = useState<string>("");
  const [comDescription, setComDescription] = useState<string>("");
  const router = useRouter();

  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);

  const subjectDropdownRef = useRef<HTMLDivElement>(null);
  const difficultyDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = await getLoggedInUserData(currentUser());
      if (loggedIn) {
        setComOwnerId(loggedIn.user.id);
        setOwnerName(loggedIn.user.username);
        setFirstName(loggedIn.user.firstName);
        setLastName(loggedIn.user.lastName);
      }
    };

    if (!checkToken()) {
      router.push("/");
    } else {
      getLoggedInData();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node) &&
        difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSubjectDropdown(false);
        setShowDifficultyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommunityName = (e: React.ChangeEvent<HTMLInputElement>) => setComName(e.target.value);
  const handleCommunityDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComDescription(e.target.value);
  const handlePrivacy = () => {
    setPublicOrPrivate(!publicOrPrivate);
    setIsPublic(!isPublic);
  };

  const handleSubmit = async () => {
    const communityGroup: ICommunityData = {
      id: 0,
      communityOwnerID: comOwnerId,
      isCommunityOwner: true,
      communityIsPublic: isPublic,
      communityIsDeleted: false,
      communityOwnerName: ownerName,
      communityName: comName,
      communitySubject: comSubject,
      communityMemberCount: 1,
      communityChats: [],
      communityMembers: [
        {
          id: 0,
          userId: comOwnerId,
          role: "owner",
          firstName: firstName,
          lastName: lastName,
        },
      ],
      communityRequests: [-1],
      communityDifficulty: comDifficulty,
      communityDescription: comDescription,
    };
    console.log(communityGroup);
    const result = await createNewCommunity(communityGroup, getToken());
    if (result == true) {
      console.log("Successfully created group");
      onClose();
    } else {
      console.log("Not created");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center">
            <div className="bg-[#818CF8] w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <img className="w-[25px] h-[25px]" src="/assets/join.svg" alt="Join Icon" />
            </div>
            <DialogTitle className="text-xl font-bold mt-2">Create a Community</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col">
            <p className="font-medium">Community Name</p>
            <input
              type="text"
              placeholder="Enter community name"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleCommunityName}
            />
          </div>

          <div className="flex flex-col">
            <p className="font-medium mb-2">Privacy</p>
            <SwitchToggle
              checked={isPublic}
              onChange={handlePrivacy}
            />
          </div>

          <div className="flex flex-col">
            <p className="font-medium">Subject Area</p>
            <div ref={subjectDropdownRef} className="relative">
              <button
                className="w-full text-left text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 text-white border rounded-[10px] px-4 py-2 flex justify-between items-center cursor-pointer"
                onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
              >
                {comSubject || "Select a Subject"}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSubjectDropdown && (
                <div className="absolute mt-1 w-full dark:bg-zinc-950  bg-white border rounded-md shadow-lg z-10">
                  {["Exams", "Mathematics", "Science", "Language", "Social Science", "Arts and Humanities"].map(
                    (subject) => (
                      <div
                        key={subject}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer"
                        onClick={() => {
                          setComSubject(subject);
                          setShowSubjectDropdown(false);
                        }}
                      >
                        {subject}
                      </div>
                    )
                  )}
                  <div className="border-t border-slate-200 dark:border-zinc-900 px-4 py-2">
                    <input
                      type="text"
                      className="w-full border rounded border-slate-300 dark:border-zinc-900  px-2 py-1"
                      placeholder="Enter custom subject"
                      value={comSubject}
                      onChange={(e) => setComSubject(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setShowSubjectDropdown(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-medium">Difficulty Level</p>
            <div ref={difficultyDropdownRef} className="relative">
              <button
                className="w-full text-left text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 text-white border rounded-[10px] px-4 py-2 flex justify-between items-center cursor-pointer"
                onClick={() => setShowDifficultyDropdown(!showDifficultyDropdown)}
              >
                {comDifficulty || "Select Difficulty Level"}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDifficultyDropdown && (
                <div className="absolute mt-1 w-full dark:bg-zinc-950  bg-white dark:text-white text-black border rounded-md shadow-lg z-10">
                  {["Beginner", "Intermediate", "Advanced", "Anyone"].map((level) => (
                    <div
                      key={level}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer"
                      onClick={() => {
                        setComDifficulty(level);
                        setShowDifficultyDropdown(false);
                      }}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <p className="font-medium">Community Description</p>
          <textarea
            placeholder="Write a short description..."
            className="w-full p-2 h-32 border rounded-md resize-none"
            value={comDescription}
            onChange={handleCommunityDescription}
          />
        </div>

        <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-6 sm:justify-end">
          <button
            className="bg-red-500 cursor-pointer font-bold text-white rounded-[10px] px-4 py-2 w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gradient-to-r from-[#6F58DA] to-[#5131E7] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 text-white rounded-[10px] font-bold px-4 py-2 w-full sm:w-auto cursor-pointer"
            onClick={handleSubmit}
          >
            Create Community
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
