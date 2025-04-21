import React from 'react'

const CommunityPreview = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-black dark:text-white">
                    Spanish
                </h1>
                <div className="flex gap-4 items-center">
                    <p className="bg-[#818CF8] rounded-[10px] py-[2px] px-[5px] text-white text-[14px] font-semibold">
                        124 Buddies
                    </p>
                    <p className="bg-[#12D393] text-black rounded-[10px] py-[2px] px-[5px] text-[14px] font-semibold">
                        Beginner
                    </p>
                </div>
            </div>
            <h2 className="mt-4 text-xl">Language</h2>
            <p className="mt-2 text-sm">
                This class covers essential grammar, vocabulary, and conversational skills. Whether you're a beginner or looking to enhance your fluency, you'll gain confidence through interactive lessons, cultural insights, and practical exercises.
            </p>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-4">
                    <div className="bg-[#818CF8] rounded-full w-[40px] h-[40px] flex items-center justify-center">
                        <p className="text-[18px] font-bold text-black">BB</p>
                    </div>
                    <p className="font-semibold text-[18px]">Bea Boeteng</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-[#FF5C7F] text-white rounded-lg cursor-pointer">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-[#0E9E6E] text-white rounded-lg cursor-pointer">
                        Join
                    </button>
                </div>
            </div>
        </>
    )
}

export default CommunityPreview