'use client'
import { Itoken } from '@/utils/Interfaces/UserInterfaces';
import { createAccount, login } from '@/utils/Services/DataServices';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignIn = () => {
  const [isUserAlready, setIsUserAlready] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const toggleLogIn = () => {
    setIsUserAlready(!isUserAlready);
  }

  const handleSubmit = async () => {
    let inputCredentials = {
      username: username,
      password: password
    }

    console.log(inputCredentials);

    if(!isUserAlready){
      // Create Account Logic
      let result = await createAccount(inputCredentials);

      result ? alert("Account Created") : alert("Username already exists");

    } else {
      // Login Logic
      let token: Itoken = await login(inputCredentials);

      if(token != null) {
        if(typeof window != null) {
          localStorage.setItem("Token", token.token);
          console.log(token.token);

          // await getLoggedInUserData(username)
          router.push('/Dashboard');
        }
      } else {
        alert("Login was no good from password or something");
      }

    }

  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Background Image Section */}
      <div className="w-full lg:w-[70%] bg-[url('/assets/LoginHero.jpg')] bg-cover bg-center min-h-[400px] lg:min-h-screen hidden lg:block">
        <h1 className="mt-4 ml-4 text-[#3730A3] font-bold text-2xl md:text-5xl lg:text-6xl max-w-[90%]">
          Connect, Collaborate, and Conquer Your Studies Together!
        </h1>
      </div>

      {/* Sign Up Section */}
      <div className="w-full lg:w-[30%] mt-[-15px] lg:mt-0 lg:ml-[-14px] bg-white flex items-center justify-center rounded-t-[15px] lg:rounded-l-[15px] p-8">
        <div className="w-full max-w-[700px] mx-auto">
          <div className="flex justify-center mb-8">
            <img src="/assets/SBLogo.png" alt="Logo" className="w-24 h-24" />
          </div>
         
          <form>
            {/* First and Last Name Row */}
            {isUserAlready ? null : (<div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-[20px] font-medium mb-2" htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-3 bg-[#F6F6F6] text-[#9A9A9A] rounded-[15px] text-[20px] lg:p-4"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-[20px] font-medium mb-2" htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-3 bg-[#F6F6F6] text-[#9A9A9A] rounded-[15px] text-[20px] lg:p-4"
                  placeholder="Name"
                  required
                />
              </div>
            </div>)}

            {/* Birthday */}
           {isUserAlready ? null : (<div className="mb-4">
              <label className="block text-[20px] font-medium mb-2" htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                className="w-full p-3 bg-[#F6F6F6] text-[#9A9A9A] rounded-[15px] text-[20px] lg:p-4"
                required
              />
            </div>)}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-[20px] font-medium mb-2" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-[#F6F6F6] text-[#9A9A9A] rounded-[15px] text-[20px] lg:p-4"
                placeholder="Email"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-[20px] font-medium mb-2" htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 bg-[#F6F6F6] text-[#9A9A9A] rounded-[15px] text-[20px] lg:p-4"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign Up Button */}
            <div className="mb-4 mt-[40px]">
              <button onClick={handleSubmit} type="reset" className="bg-[#3730A3] text-xl text-white p-3 w-full h-[70px] border rounded-[15px]">
                {isUserAlready ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Already have an account prompt */}
          <div className="text-center mt-4">
            <p className="text-lg font-medium">
              {isUserAlready ? "Not a study buddy yet?": "Already have an account?"}
              <span className="text-[#3730A3] hover:underline cursor-pointer">
                <button onClick={toggleLogIn}>
                  {isUserAlready ? "Create Account" : "Log In"}
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
