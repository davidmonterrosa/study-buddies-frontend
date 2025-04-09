'use client'
import React, { useEffect, useState } from "react";
import { Modal, Dropdown, DropdownItem, DropdownDivider } from "flowbite-react";
import { ICommunityData } from "@/utils/Interfaces/UserInterfaces";
import { checkToken, createNewCommunity, currentUser, getToken } from "@/utils/Services/DataServices";
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
  const [comName, setComName] = useState<string>("")
  const [comSubject, setComSubject] = useState<string>("")
  // const [comMembers, setComMembers] = useState<CommunityMember[]>()
  // const [comRequests, setComRequests] = useState<number[]>([])
  const [comDifficulty, setComDifficulty] = useState<string>("")
  const [comDescription, setComDescription] = useState<string>("")
  // const [communityGroup, setCommunityGroup] = useState<ICommunityData>({
  //   id: 0,
  //   communityOwnerId: ,
  //   communityIsCommunityOwner: ,
  //   communityIsPublic: ,
  //   communityIsDeleted: ,
  //   communityOwnerName: ,
  //   communityName: ,
  //   communitySubject: ,
  //   communityMemberCount: ,
  //   communityMembers: ,
  //   communityRequests: ,
  //   communityDifficulty: ,
  //   communityDescription: ,
  // })

  const router = useRouter();

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = currentUser();
      setComOwnerId(loggedIn.id);
      setOwnerName(loggedIn.username);

    }

    if(!checkToken()) {
      router.push('/');
    } else {
      getLoggedInData()
    }
  }, [])

  // useEffect(() => {
  //   const newMember: CommunityMember = {
  //       id: 0,
  //       userId: comOwnerId,
  //       role: "owner",
  //   }
  //   if(!checkToken()) {
  //     router.push('/');
  //   } else {
  //     setComMembers([newMember]);
  //   }

  // }, [comOwnerId])

  const handleCommunityName = (e: React.ChangeEvent<HTMLInputElement>) => setComName(e.target.value);
  const handleCommunityDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComDescription(e.target.value);
  const handleCommunitySubject = (subject: string) => setComSubject(subject);
  const handleCommunityDifficulty = (experienceLevel: string) => setComDifficulty(experienceLevel);
  const handlePrivacy = () => {
    setPublicOrPrivate(!publicOrPrivate)
    setIsPublic(!isPublic);
  };
  

  const handleSubmit = async () => {
    console.log(comOwnerId);
    console.log(ownerName);

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
      communityMembers:  [{
        id: 0,
        userId: comOwnerId,
        role: "owner",
      }],
      communityRequests: [-1],
      communityDifficulty: comDifficulty,
      communityDescription: comDescription,
    }
    console.log(communityGroup);
    const result = await createNewCommunity(communityGroup, getToken());
    if(result == true) {
      console.log("Successfully created group")
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
          <label className="flex justify-between items-center mb-5 cursor-pointer text-darkGrayishBlue dark:text-textDesaturatedBlue dark:hover:text-white">
            <span className="md:mr-3 text-sm font-normal">Public</span>
            <input type="checkbox" value="" className="sr-only peer"  onChange={handlePrivacy}/>
            <div className="relative w-11 h-6 bg-[#aeb3cb] peer-checked:bg-gradient-to-r peer-checked:from-[#6F58DA] peer-checked:to-[#5131E7] hover:brightness-110  peer-focus:outline-none hover:outline-none peer-focus:ring-2 hover:ring-2 peer-focus:ring-blue-300
            hover:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-gray-800 dark:after:border-gray-600 after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 "></div>
            <span className="md:ml-3 text-sm font-normal">Private</span>
          </label>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="flex flex-col">
          <p className="font-medium">Subject Area</p>
          <Dropdown className="w-full text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px]" label="Select a subject" >
            <DropdownItem onClick={() => handleCommunitySubject('Mathematics')}>Mathematics</DropdownItem>
            <DropdownItem onClick={() => handleCommunitySubject('Science')}>Science</DropdownItem>
            <DropdownItem onClick={() => handleCommunitySubject('Language Arts')}>Language Arts</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => handleCommunitySubject('Other')}>Other</DropdownItem>
          </Dropdown>
        </div>

        {/* Difficulty Level */}
        <div className="flex flex-col">
          <p className="font-medium">Difficulty Level</p>
          <Dropdown className="w-full text-[16px] bg-gradient-to-r from-[#6F58DA] to-[#5131E7] text-white rounded-[10px]" label="Select difficulty level">
            <DropdownItem onClick={() => handleCommunityDifficulty('Beginner')}>Beginner</DropdownItem>
            <DropdownItem onClick={() => handleCommunityDifficulty('Intermediate')}>Intermediate</DropdownItem>
            <DropdownItem onClick={() => handleCommunityDifficulty('Advanced')}>Advanced</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => handleCommunityDifficulty('Anyone')}>Anyone</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col p-4">
        <p className="font-medium">Community Description</p>
        <textarea placeholder="Write a short description..." className="w-full p-2 h-32 border rounded-md resize-none" value={comDescription} onChange={handleCommunityDescription}/>
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
