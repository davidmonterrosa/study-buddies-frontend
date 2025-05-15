'use client'
import React, { useEffect, useState, useRef } from "react";
import { Modal } from "flowbite-react";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { checkToken, createNewCommunity, currentUser, getLoggedInUserData, getToken } from "@/utils/Services/DataServices";
import { useRouter } from "next/navigation";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose }) => {
  const [publicOrPrivate, setPublicOrPrivate] = useState(false);

  // useStates for filling out the create community form inside modal
  const [comOwnerId, setComOwnerId] = useState<number>(0);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [ownerName, setOwnerName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [comName, setComName] = useState<string>("")
  const [comSubject, setComSubject] = useState<string>("")
  const [comDifficulty, setComDifficulty] = useState<string>("")
  const [comDescription, setComDescription] = useState<string>("")
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
    }

    if (!checkToken()) {
      router.push('/');
    } else {
      getLoggedInData()
    }
  }, [])

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
    setPublicOrPrivate(!publicOrPrivate)
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
      communityMembers: [{
        id: 0,
        userId: comOwnerId,
        role: "owner",
        firstName: firstName,
        lastName: lastName
      }],
      communityRequests: [-1],
      communityDifficulty: comDifficulty,
      communityDescription: comDescription,
    }
    console.log(communityGroup);
    const result = await createNewCommunity(communityGroup, getToken());
    if (result == true) {
      console.log("Successfully created group")
      onClose();
    } else {
      console.log("Not created")
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-[#818CF8] w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <img className="w-[25px] h-[25px]" src="/assets/join.svg" alt="Join Icon" />
        </div>
        <h1 className="text-xl font-bold mt-2">Create a Community</h1>
      </div>

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 p-4">
        {/* Community Name */}
        <div className="flex flex-col">
          <p className="font-medium">Community Name</p>
          <input type="text" placeholder="Enter community name" className="w-full p-2 border rounded-md" required onChange={handleCommunityName} />
        </div>

        {/* Privacy Toggle */}
        <div className="flex flex-col">
          <p className="font-medium">Privacy</p>
          <div className="flex items-center gap-2">
            <label className="flex justify-between gap-2 lg:gap-1 items-center mb-5 cursor-pointer text-darkGrayishBlue dark:text-textDesaturatedBlue dark:hover:text-white">
              <span className="md:mr-3 text-sm font-normal">Public</span>
              <input type="checkbox" value="" className="sr-only peer" onChange={handlePrivacy} />
              <div className="relative w-11 h-6 bg-[#aeb3cb] peer-checked:bg-gradient-to-r peer-checked:from-[#6F58DA] peer-checked:to-[#5131E7] hover:brightness-110  peer-focus:outline-none hover:outline-none peer-focus:ring-2 hover:ring-2 peer-focus:ring-blue-300
              hover:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-gray-800 dark:after:border-gray-600 after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 "></div>
              <span className="md:ml-3 text-sm font-normal">Private</span>
            </label>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="flex flex-col">
          <p className="font-medium">Subject Area</p>
          <div ref={subjectDropdownRef} className="relative">
            <button className="w-full text-left text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px] px-4 py-2 flex justify-between items-center cursor-pointer"
              onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            >
              {comSubject || "Select a Subject"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showSubjectDropdown && (
              <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg z-10">
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComSubject("Exams"); setShowSubjectDropdown(false); }}>Exams</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComSubject("Mathematics"); setShowSubjectDropdown(false); }}> Mathematics</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComSubject("Science"); setShowSubjectDropdown(false); }}>Science</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComSubject("Language"); setShowSubjectDropdown(false); }}>Language</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComSubject("Social Science"); setShowSubjectDropdown(false); }}>Social Science</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComSubject("Arts and Humanities"); setShowSubjectDropdown(false); }}>Arts and Humanities</div>
                <div className="border-t dark:border-gray-600 px-4 py-2">
                  <input type="text" className="w-full border dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded px-2 py-1" placeholder="Enter custom subject"
                    value={comSubject} onChange={(e) => setComSubject(e.target.value)} onKeyDown={(e) => {
                      if (e.key === "Enter") setShowSubjectDropdown(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="flex flex-col">
          <p className="font-medium">Difficulty Level</p>
          <div ref={difficultyDropdownRef} className="relative">
            <button className="w-full text-left text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px] px-4 py-2 flex justify-between items-center cursor-pointer"
              onClick={() => setShowDifficultyDropdown(!showDifficultyDropdown)}
            >
              {comDifficulty || "Select Difficulty Level"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDifficultyDropdown && (
              <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg z-10">
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComDifficulty("Beginner"); setShowDifficultyDropdown(false); }}>Beginner</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComDifficulty("Intermediate"); setShowDifficultyDropdown(false); }}>Intermediate</div>
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComDifficulty("Advanced"); setShowDifficultyDropdown(false); }}>Advanced</div>
                <hr className="border-t dark:border-gray-600" />
                <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { setComDifficulty("Anyone"); setShowDifficultyDropdown(false); }}>Anyone</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col px-4">
        <p className="font-medium">Community Description</p>
        <textarea placeholder="Write a short description..." className="w-full p-2 h-32 border rounded-md resize-none" value={comDescription} onChange={handleCommunityDescription} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:w-full sm:justify-between">
        <button className="bg-red-500 font-bold text-white rounded-[10px] px-4 py-2 w-full sm:w-auto cursor-pointer" onClick={onClose}>
          Cancel
        </button>
        <button className="bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px] font-bold px-4 py-2 w-full sm:w-auto cursor-pointer" onClick={handleSubmit}>
          Create Community
        </button>
      </div>
    </Modal>
  );
};

export default CreateCommunityModal;
