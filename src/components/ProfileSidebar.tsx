"use client";
import { Drawer, DarkThemeToggle } from "flowbite-react";
import { useRouter } from "next/navigation";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const logoutUser = () => {
    sessionStorage.removeItem("Token");
    router.push("/");
  };

  return (
    <Drawer open={isOpen} onClose={onClose} position="right">
      <div className="flex flex-col mt-4 gap-4 px-4">
        {/* Profile Header (Image + Name + Email) */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] rounded-full w-[60px] h-[60px] flex items-center justify-center">
            <p className="text-[20px] font-bold text-white">AL</p>
          </div>
          <div>
            <p className="font-semibold text-2xl">Ada Lovelace</p>
            <p className="text-xl">alovelace@ucla.edu</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col w-full gap-2">
          <button
            onClick={logoutUser}
            className="w-full cursor-pointer bg-red-500 text-white py-2 rounded-[10px] font-bold"
          >
            Logout
          </button>
          <DarkThemeToggle />
        </div>
      </div>
    </Drawer>
  );
};

export default ProfileSidebar;
