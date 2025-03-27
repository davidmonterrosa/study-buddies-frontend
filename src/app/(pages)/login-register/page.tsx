import React from 'react'

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
  {/* Background Image Section */}

  <h1 className='m-6'>Register</h1>
  <div className="w-full lg:w-[70%] bg-[url('/assets/Hero.jpg')] bg-cover bg-center min-h-[400px] lg:min-h-screen hidden">
    <h1 className="mt-4 ml-4 text-white font-bold text-2xl md:text-5xl lg:text-6xl max-w-[90%]">
      Connect, Collaborate, and Conquer Your Studies Together!
    </h1>
  </div>

  {/* Sign Up Section */}
  <div className="w-full lg:w-[30%] mt-[-15px] lg:mt-0 lg:ml-[-14px] bg-white flex items-center justify-center rounded-t-[15px] lg:rounded-l-[15px] p-8">
    <div className="w-full max-w-md 
     mx-auto">
      <div className="flex justify-center mb-8">
        <img src="/assets/SBLogo.png" alt="Logo" className="w-24 h-24" />
      </div>
      <h2 className="text-[28px] md:text-[32px] text-center font-bold mb-6">Study Buddies</h2>
      <form>
        <div className="mb-4">
          <button className="bg-[#3730A3] text-xl md:text-2xl text-white p-3 w-full h-[80px]  border rounded-[15px]">
            Register
          </button>
        </div>
        <div className="mb-4">
          <button className="bg-[#3730A3] text-xl md:text-2xl text-white p-3 w-full h-[80px]  border rounded-[15px]">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default SignIn