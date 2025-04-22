import React from "react";

const BuddiesCompononet = () => {
  return (
    <section className="flex flex-col min-h-[calc(0.68*100vh)] overflow-hidden mt-4">
      <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
        {/* List of Buddies*/}
        <div className="flex items-start gap-2">
          <div className="bg-[#F6F6F6] dark:bg-[#140D34] border-[#CCCCCC] border-[1px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
            <div className="flex items-center gap-2">
              {/* Initials */}
              <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <p className="text-[14px] font-bold text-black">ML</p>
              </div>
              {/* Name */}
              <p className="font-semibold text-sm">Maria Lopez</p>
              {/* Message Button aligned to end */}
              <button className="ml-auto bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <img className="w-5" src="/assets/Message.svg" alt="Message Icon"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuddiesCompononet;
