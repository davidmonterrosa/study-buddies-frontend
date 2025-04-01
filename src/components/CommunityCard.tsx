import React from 'react'

const CommunityCard = () => {
  return (
    <div className='bg-linear-to-b from-[#473FCB] to-[#231E6D] dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] max-w-[325px] h-[175px] rounded-[15px] text-white p-2 cursor-pointer drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]'>
      <div className='flex justify-between'>
      <h1 className='font-bold text-[30px]'>Spanish</h1>
      <img src="/assets/Lock.svg" alt="" />
      </div>
      <h2 className='font-semibold text-[20px]'>Language</h2>
      <div className='flex flex-wrap gap-2 text-[14px] font-semibold mt-2'>
        <p className='bg-[#818CF8] rounded-[10px] py-[2px] px-[5px]'>121 Buddies</p>
        <p className='bg-[#10B981] rounded-[10px] py-[2px] px-[5px]'>Beginner</p>
      </div>
      <div className='flex mt-2 gap-2 items-center'>
        <div className='bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center'>
          <p className='text-[14px] font-bold text-black'>BB</p>
        </div>
        <p className='font-semibold text-sm'>Bea Boeteng</p>
      </div>
    </div>
  )
}

export default CommunityCard