import React from 'react'

const SessionsComponent = () => {
  return (
    <section className="flex flex-col overflow-hidden mt-4">
    <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
      
          <div className="flex items-start gap-2">
            <div className="bg-linear-to-b from-[#473FCB] text-white to-[#231E6D] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[2px] dark:border-[#aa7dfc40] px-3 py-3 rounded-lg w-full text-sm">
              <div className="flex items-center gap-2">
                {/* <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                  <p className="text-[14px] font-bold text-black"></p>
                </div> */}
                <div className="flex flex-col space-x-2">
                  <p className="font-semibold text-[18px]">Practicing Conjugations</p>
                  <p className="font-semibold text-sm">2025-5-17 6:00PM - 8:00PM</p>
                </div>
              
                <button>

                </button>
                <button
                  className="ml-auto bg-[#818CF8] cursor-pointer rounded-[10px] px-3 py-1 flex items-center justify-center"
                >
                 Join
                </button>
              </div>
            </div>
          </div>
    </div>
  </section>
  )
}

export default SessionsComponent