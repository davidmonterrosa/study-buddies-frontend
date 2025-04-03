import React from 'react'

const MyCommunitiesPanel = () => {
    const navigateToCommunity = () =>{

    }


  return (
    <main className='flex flex-col w-1/5 h-auto  shadow-[0_0px_5px_rgba(0,0,0,0.25)] rounded-lg p-4'>
        <h1 className='text-center text-2xl font-bold m-4'>My Communities</h1>
        <div>
            <button className='w-full rounded-2xl hover:bg-[#818cf88e] hover:cursor-pointer p-4' >
                <p className='font-bold text-left'>Spanish Learning</p>
            </button>
        </div>
    </main>
  )
}

export default MyCommunitiesPanel
