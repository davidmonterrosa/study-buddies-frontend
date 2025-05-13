import React, { useEffect, useState } from 'react';

const CommunityAutoSuggest = () => {
    const [allCommunities, setAllCommunities] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
    const [error, setError] = useState("");

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelectCommunity = (community: any) => {
        setSelectedCommunity(community);
        setQuery(community.communityName);
        setSuggestions([]);
    };

    return (
        <div className="p-4 relative">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search Community..."
                className="border p-2 rounded w-full"
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

            {selectedCommunity && (
                <div className="mt-4 border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{selectedCommunity.communityName}</h2>
                    <p>Owner: {selectedCommunity.communityOwnerName}</p>
                    <p>Subject: {selectedCommunity.communitySubject}</p>
                    <p>Difficulty: {selectedCommunity.communityDifficulty}</p>
                    <p>Members: {selectedCommunity.communityMemberCount}</p>
                    <p>Description: {selectedCommunity.communityDescription}</p>
                    <p>Status: {selectedCommunity.communityIsPublic ? 'Public' : 'Private'}</p>
                </div>
            )}
        </div>
    );
};

export default CommunityAutoSuggest;