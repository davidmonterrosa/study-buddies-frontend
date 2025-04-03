import React from "react";

const MyCommunitiesSidebar = () => {
  return (
    <div className="flex flex-col w-64 h-full rounded-r-[15px] bg-white bg-gradient-to-b dark:from-[#271E55] dark:to-[#100B28] p-4 shadow-lg">
      <h1 className="text-center text-2xl font-bold m-4 text-black dark:text-white">My Communities</h1>
      <div className="space-y-4">
        <button className="w-full rounded-2xl hover:bg-[#818cf88e] p-4 transition-all">
          <p className="font-bold text-left text-black dark:text-white ">Spanish Learning</p>
        </button>
        <button className="w-full rounded-2xl hover:bg-[#818cf88e] p-4 transition-all">
          <p className="font-bold text-left text-black dark:text-white">French Learning</p>
        </button>
        <button className="w-full rounded-2xl hover:bg-[#818cf88e] p-4 transition-all">
          <p className="font-bold text-left text-black dark:text-white">Math Study Group</p>
        </button>
        <button className="w-full rounded-2xl hover:bg-[#818cf88e] p-4 transition-all">
          <p className="font-bold text-left text-black dark:text-white">Tech Talk</p>
        </button>
      </div>
    </div>
  );
};

export default MyCommunitiesSidebar;
