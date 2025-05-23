"use client";
import { getAllDirectMessages } from "@/utils/Services/DirectMessageSerices";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  // Navigate with query parameter
  const navigate = (mode:string) => {
    push(`../login-register?mode=${mode}`);
  };

  getAllDirectMessages(1);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Background Image Section */}
      <div className="w-full lg:w-[70%] bg-[url('/assets/Hero.webp')] bg-cover bg-center min-h-[400px] lg:min-h-screen">
        <h1 className="mt-4 ml-4 text-white font-bold text-2xl md:text-5xl lg:text-6xl max-w-[90%]">
          Connect, Collaborate, and Conquer Your Studies Together!
        </h1>
      </div>

      {/* Sign Up Section */}
      <div className="w-full lg:w-[30%] mt-[-15px] lg:mt-0 lg:ml-[-14px] bg-white dark:bg-linear-to-b dark:from-[#271E55] dark:to-[#100B28] dark:border-[1px] dark:border-[#aa7dfc40] flex items-center justify-center rounded-t-[15px] lg:rounded-l-[15px] p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <img src="/assets/SBLogo.png" alt="Logo" className="w-24 h-24" />
          </div>
          <h2 className="text-[28px] md:text-[32px] text-center font-bold mb-6">Study Buddies</h2>
          <form>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => navigate('register')}  // Pass "register" mode
                className="bg-linear-to-r from-[#6F58DA] to-[#5131E7] text-xl md:text-2xl text-white p-3 w-full h-[80px] border rounded-[15px] cursor-pointer"
              >
                Register
              </button>
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => navigate('login')}  // Pass "login" mode
                className="bg-linear-to-r from-[#6F58DA] to-[#5131E7] text-xl md:text-2xl text-white p-3 w-full h-[80px] border rounded-[15px] cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
