'use client'
import { Itoken } from '@/utils/Interfaces/UserInterfaces';
import { createAccount, login } from '@/utils/Services/DataServices';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const SignIn = () => {
  const [isUserAlready, setIsUserAlready] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');  // Get the mode from query params

  useEffect(() => {
    // Automatically toggle based on query parameter
    if (mode === 'login') {
      setIsUserAlready(true);
    } else {
      setIsUserAlready(false);
    }
  }, [mode]);

  const toggleLogIn = () => {
    setIsUserAlready(!isUserAlready);
  }

  const handleSubmit = async () => {
    let inputCredentials = {
      username: username,
      password: password
    }

    console.log(inputCredentials);

    if (!isUserAlready) {
      // Create Account Logic
      let result = await createAccount(inputCredentials);

      result ? alert("Account Created") : alert("Username already exists");
    } else {
      // Login Logic
      let token: Itoken = await login(inputCredentials);

      if (token != null) {
        if (typeof window != null) {
          localStorage.setItem("Token", token.token);
          console.log(token.token);
          router.push('/landing');
        }
      } else {
        alert("Invalid credentials");
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

      {/* Form Section */}
      <div className="w-full lg:w-[30%] bg-white flex items-center justify-center rounded-t-[15px] lg:rounded-l-[15px] p-8">
        <div className="w-full max-w-[700px] mx-auto">
          <div className="flex justify-center mb-8">
            <img src="/assets/SBLogo.png" alt="Logo" className="w-24 h-24" />
          </div>

          <form>
            {/* Conditionally render name & birthday fields for registration */}
            {!isUserAlready && (
              <>
                <div className="mb-4">
                  <label className="block text-[20px] font-medium mb-2">First Name:</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-[#F6F6F6] rounded-[15px]"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[20px] font-medium mb-2">Last Name:</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-[#F6F6F6] rounded-[15px]"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[20px] font-medium mb-2">Birthday:</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-[#F6F6F6] rounded-[15px]"
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-[20px] font-medium mb-2">Email:</label>
              <input
                type="email"
                className="w-full p-3 bg-[#F6F6F6] rounded-[15px]"
                placeholder="Email"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-[20px] font-medium mb-2">Password:</label>
              <input
                type="password"
                className="w-full p-3 bg-[#F6F6F6] rounded-[15px]"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 mt-[40px]">
              <button onClick={handleSubmit} type="reset" className="bg-[#3730A3] text-xl text-white p-3 w-full h-[70px] border rounded-[15px] cursor-pointer">
                {isUserAlready ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-lg font-medium">
              {isUserAlready ? "Not a study buddy yet?" : "Already have an account?"}
              <span className="text-[#3730A3]">
                <button className='hover:underline cursor-pointer' onClick={toggleLogIn}>
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
