import React, { useEffect, useRef, useState } from 'react';
import Dropdown from './FilterDropdown';
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';
import { useRouter } from "next/navigation";
import PrivateCommunityModal from './PrivateCommunityModalProps ';
import { currentUser, getLoggedInUserData, getToken, requestJoin } from '@/utils/Services/DataServices';

const CommunityAutoSuggest = () => {
  const [allCommunities, setAllCommunities] = useState<ICommunityData[]>([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ICommunityData[]>([]);
  const [error, setError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false); // NEW
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);
  const [selectedPrivateCommunity, setSelectedPrivateCommunity] = useState<ICommunityData | null>(null);

  const filterRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://study-buddys-backend.azurewebsites.net/Community/getAllCommunities");
        const data = await res.json();
        const communityArray = data && data.communities ? data.communities : [];
        setAllCommunities(communityArray);
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError("Failed to load communities. Please try again.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filtering logic: by query, subject, and difficulty
    let filtered = allCommunities;

    if (query.trim()) {
      filtered = filtered.filter(
        (community) =>
          community &&
          community.communityName &&
          community.communityName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(
        (community) =>
          community &&
          community.communitySubject &&
          selectedSubjects.includes(community.communitySubject)
      );
    }

    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(
        (community) =>
          community &&
          community.communityDifficulty &&
          selectedDifficulties.includes(community.communityDifficulty)
      );
    }

    setSuggestions(filtered.slice(0, 5));
  }, [
    query,
    allCommunities,
    selectedSubjects,
    selectedDifficulties,
  ]);

  // Hide suggestions and filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setIsSuggestionsOpen(false); // CLOSE SUGGESTIONS
        setIsFilterOpen(false);
        setOpenDropdown(null);
      }
      // If only searchRef is clicked outside, hide suggestions
      else if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setIsSuggestionsOpen(false); // CLOSE SUGGESTIONS
      }
      // If only filterRef is clicked outside, close filter
      else if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsSuggestionsOpen(true); // OPEN SUGGESTIONS ON CHANGE
  };

  const handleSelectCommunity = (community: ICommunityData) => {
    setQuery(community.communityName);
    setSuggestions([]);
    setIsSuggestionsOpen(false);
    if (community.communityIsPublic === true) {
      console.log("Selected community:", community);// Log the selected community
      router.push(`/communities/${community.id}`);
    } else {
      setSelectedPrivateCommunity(community);
      setIsPrivateModalOpen(true);
    }
    setQuery(""); // Clear the search input after selection
    setSelectedSubjects([]); // Clear selected subjects
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
    setIsSuggestionsOpen(true); // Open suggestions when filter changes
  };

  const handleDropdownToggle = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
    setIsSuggestionsOpen(true); // Open suggestions when filter changes
  };

  // const handleRequestAccess = async () => {
    

  //   setIsPrivateModalOpen(false);
  // };

  return (
    <>
      {/* Searchbar */}
      <PrivateCommunityModal
        isOpen={isPrivateModalOpen}
        onClose={() => setIsPrivateModalOpen(false)}
        // onRequestAccess={handleRequestAccess}
      />
      <div
        ref={searchRef}
        className="flex bg-white items-center min-w-[60%] sm:w-lg lg:min-w-[50%] xl:min-w-[65%] rounded-2xl border-2 px-3 py-[3px] relative"
      >
        <button className="size-9 mx-2 cursor-pointer">
          <img className="w-[25px] h-[25px]" src="../assets/searchIcon.svg" alt="Search" />
        </button>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Communities..."
          className="border-0 w-full focus:outline-none text-black"
          onFocus={() => setIsSuggestionsOpen(true)} // OPEN SUGGESTIONS ON FOCUS
        />

        {isSuggestionsOpen && suggestions.length > 0 && (
          <ul
            className="border bg-white shadow-lg rounded mt-1 absolute left-0 w-full z-50"
            style={{
              top: '110%',
              maxHeight: '250px',
              overflowY: 'auto',
              minWidth: '250px',
            }}
          >
            {suggestions.map((community) => (
              <li
                key={community.id}
                onClick={() => handleSelectCommunity(community)}
                className="p-3 cursor-pointer hover:bg-gray-100 text-black text-base"
              >
                {community.communityName}
              </li>
            ))}
          </ul>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="relative">
          <img className="w-[25px] h-[25px] cursor-pointer" src="/assets/filter.svg" alt="Filter" />
        </button>

        {isFilterOpen && (
          <div
            ref={filterRef}
            className="absolute bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg w-56 mt-2 right-0 top-12"
            style={{ zIndex: 100 }}
          >
            <ul className="flex flex-col">
              <Dropdown
                title="Subject"
                selectedOptions={selectedSubjects}
                onToggleOption={handleSubjectToggle}
                isOpen={openDropdown === "subject"}
                onToggle={() => handleDropdownToggle("subject")}
              />
              <Dropdown
                title="Difficulty"
                selectedOptions={selectedDifficulties}
                onToggleOption={handleDifficultyToggle}
                isOpen={openDropdown === "difficulty"}
                onToggle={() => handleDropdownToggle("difficulty")}
              />
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunityAutoSuggest;
