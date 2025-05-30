'use client'
import { Itoken } from '@/utils/Interfaces/UserInterfaces';
import { createAccount, getLoggedInUserData, login } from '@/utils/Services/DataServices';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState, useEffect } from 'react';
import { toast } from "sonner";
import Image from 'next/image';

const SignIn = () => {
  const [isUserAlready, setIsUserAlready] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);
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

  // useEffect(() => {
  //   const getDataBack = async () => {
  //     const response = await fetch('https://study-buddys-backend.azurewebsites.net/Community/getAllCommunities');
  //     if(response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   }; 
  //   getDataBack();
  // }, [])

  const handleSubmit = async () => {
    const inputCredentials = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    }


    if (!isUserAlready) {
      // Create Account Logic
      const result = await createAccount(inputCredentials);

      if (result) {
        // Account created, now log the user in automatically
        const token: Itoken = await login({ username, password, firstName, lastName });

        if (token != null) {
          if (typeof window != null) {
            localStorage.setItem("Token", token.token);
            const userNameAndId = await getLoggedInUserData(username);
            if (userNameAndId) {
              localStorage.setItem("User", userNameAndId.user.username);
            }
            localStorage.setItem("postReloadToast", JSON.stringify({
              type: "success",
              message: "Account Created!",
              description: "Welcome to Study Buddies!"
            }));
            router.push('/landing');
          }
        } else {
          toast.error("Account created, but automatic login failed.", { description: "Please try logging in." });
        }
      } else {
        console.log("Username already exists");
      }

    } else {
      // Login Logic
      const token: Itoken = await login(inputCredentials);

      if (token != null) {
        if (typeof window != null) {
          localStorage.setItem("Token", token.token);
          const userNameAndId = await getLoggedInUserData(username);
          if (userNameAndId) {
            localStorage.setItem("User", userNameAndId.user.username);
          }
          router.push('/landing');
        }
      } else {
        toast.error("Invalid credentials", { description: "Please check your email and password." });
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter key
      handleSubmit(); // Call the submit handler
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Background Image Section */}
      <div className="w-full lg:w-[70%] bg-[url('/assets/LoginHero.jpg')] bg-cover bg-center min-h-[400px] lg:min-h-screen hidden lg:block relative">
        <div className='absolute inset-0 min-w-full bg-linear-165 from-[#FFFFFFdd] from-0% to-[#FFFFFF00] to-50%'></div>
        <h1 className="absolute top-4 left-4 text-[#3730A3] font-bold text-2xl md:text-5xl lg:text-6xl max-w-[60%]">
          Connect, Collaborate, and Conquer Your Studies Together!
        </h1>
      </div>

      {/* Form Section */}
      <div className="w-full min-h-screen lg:w-[30%] bg-white dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[1px] dark:border-[#aa7dfc40] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[700px] mx-auto flex flex-col justify-center">
          <div className="flex justify-center lg:mb-8">
            <Image src="/assets/SBLogo.png" alt="Logo" width={96} height={96} className="lg:w-24 lg:h-24 w-15 h-15" />
          </div>

          <form>
            {/* Conditionally render name & birthday fields for registration */}
            {!isUserAlready && (
              <>
                <div className=" mb-2 lg:mb-4">
                  <label className="block text-[20px] font-medium mb-2">First Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 lg:p-3 bg-[#F6F6F6] text-black rounded-[15px]"
                    placeholder="First Name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className=" mb-2 lg:mb-4">
                  <label className="block text-[20px] font-medium mb-2">Last Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 lg:p-3 bg-[#F6F6F6] text-black rounded-[15px]"
                    placeholder="Last Name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {/* Got rid of the Birthday Input */}
                {/* <div className=" mb-2 lg:mb-4">
                  <label className="block text-[20px] font-medium mb-2">Birthday:</label>
                  <input
                    type="date"
                    className="w-full p-2 lg:p-3 bg-[#F6F6F6] text-black rounded-[15px] dark:[color-scheme:dark]"
                    required
                  />
                </div> */}
              </>
            )}

            <div className=" mb-2 lg:mb-4">
              <label className="block text-[20px] font-medium mb-2">Email:</label>
              <input
                type="email"
                className="w-full p-2 lg:p-3 bg-[#F6F6F6] text-black rounded-[15px]"
                placeholder="Email"
                onKeyDown={handleKeyDown}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative mb-2 lg:mb-4">
              <label className="block text-[20px] font-medium mb-2">Password:</label>
              <div className="flex items-center bg-[#F6F6F6] rounded-[15px] px-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 lg:p-3 bg-transparent text-black outline-none"
                  placeholder="Password"
                  onKeyDown={handleKeyDown}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="ml-2 mr-1.5 text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            <div className=" mb-2 lg:mb-4 mt-[40px]">
              <button onClick={e => { e.preventDefault(); handleSubmit(); }} type="button" className="bg-linear-to-r from-[#6F58DA] to-[#5131E7] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 text-xl text-white p-3 w-full lg:h-[60px] border rounded-[15px] cursor-pointer">
                {isUserAlready ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-lg font-medium">
              {isUserAlready ? "Not a study buddy yet?" : "Already have an account?"}
              <span className="text-[#aa7dfc] px-2">
                <button className='hover:underline cursor-pointer' onClick={() => setIsUserAlready(!isUserAlready)}>
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

const SignInWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignIn />
  </Suspense>
);

export default SignInWithSuspense;

// export default SignIn;
