import React, { useEffect, useRef, useState } from 'react';
import Dropdown from './FilterDropdown';
import { ICommunityData } from '@/utils/Interfaces/UserInterfaces';

const CommunityAutoSuggest = () => {
    const [allCommunities, setAllCommunities] = useState<ICommunityData[]>([]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ICommunityData[]>([]);
    // const [selectedCommunity, setSelectedCommunity] = useState<ICommunityData | null>(null);
    const [error, setError] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const filterRef = useRef<HTMLDivElement | null>(null);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://study-buddys-backend.azurewebsites.net/Community/getAllCommunities");
                const data = await res.json();
                // Access the 'communities' array from the data object
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
        if (!query) {
            setSuggestions([]);
            return;
        }
        const filteredCommunities = allCommunities.filter((community) =>
            community && community.communityName &&
            community.communityName.toLowerCase().startsWith(query.toLowerCase())
        ).slice(0, 5);

        setSuggestions(filteredCommunities);
    }, [query, allCommunities]);

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setIsFilterOpen(false);
            setOpenDropdown(null);
          }
        };
    
        if (isFilterOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isFilterOpen]);
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelectCommunity = (community: ICommunityData) => {
        // setSelectedCommunity(community);
        setQuery(community.communityName);
        setSuggestions([]);
    };

    const handleSubjectToggle = (subject: string) => {
        setSelectedSubjects((prev) =>
            prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
        );
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
    };

    return (
        <>
            {/* Searchbar */}
          <div className="flex bg-white items-center min-w-[60%] sm:w-lg lg:min-w-[50%] xl:min-w-[65%] rounded-2xl border-2 px-3 py-[3px] relative">
            <button className="size-9 mx-2 cursor-pointer">
              <img className="w-[25px] h-[25px]" src="../assets/searchIcon.svg" alt="Search" />
            </button>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search Communities..."
                className="border-0 w-full focus:outline-none text-black"
            />

            {suggestions.length > 0 && (
                <ul className="border bg-white shadow rounded mt-1 absolute w-full">
                    {suggestions.map((community) => (
                        <li
                            key={community.id}
                            onClick={() => handleSelectCommunity(community)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {community.communityName}
                        </li>
                    ))}
                </ul>
            )}

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* {selectedCommunity && (
                <div className="mt-4 border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{selectedCommunity.communityName}</h2>
                    <p>Owner: {selectedCommunity.communityOwnerName}</p>
                    <p>Subject: {selectedCommunity.communitySubject}</p>
                    <p>Difficulty: {selectedCommunity.communityDifficulty}</p>
                    <p>Members: {selectedCommunity.communityMemberCount}</p>
                    <p>Description: {selectedCommunity.communityDescription}</p>
                    <p>Status: {selectedCommunity.communityIsPublic ? 'Public' : 'Private'}</p>
                </div>
            )} */}
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="relative">
              <img className="w-[25px] h-[25px] cursor-pointer" src="/assets/filter.svg" alt="Filter" />
            </button>

            {isFilterOpen && (
              <div ref={filterRef} className="absolute bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg w-56 mt-2 z-10 right-0 top-12" >
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

// function handleSubjectToggle(option: string): void {
//     throw new Error('Function not implemented.');
// }
