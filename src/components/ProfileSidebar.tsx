"use client";
import { Drawer, DarkThemeToggle } from "flowbite-react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { currentUser, getLoggedInUserData } from "@/utils/Services/DataServices";


interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  openNotificationsSidebar: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose, openNotificationsSidebar }) => {
  const router = useRouter();

  const logoutUser = () => {
    localStorage.removeItem("Token");
    router.push("/");
  };
  // User data state
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  // Fetch user data
  useEffect(() => {
    const getLoggedInData = async () => {
      const user = await getLoggedInUserData(currentUser());
      if (!user || !user.user.username) return;

      const loggedIn = await getLoggedInUserData(currentUser());

      if (loggedIn) {
        setUserName(loggedIn.user.username || "");
        setFirstName(loggedIn.user.firstName || "");
        setLastName(loggedIn.user.lastName || "");
      }
    };

    getLoggedInData();
  }, []);

  return (
    <Drawer open={isOpen} onClose={onClose} position="right">
      <div className="flex flex-col mt-4 gap-4 px-4">
        {/* Profile Header (Image + Name + Email) */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] rounded-full w-[60px] h-[60px] flex items-center justify-center">
            <p className="text-[20px] font-bold text-white">{userName.slice(0, 1).toUpperCase()}</p>
          </div>
          <div>
            <p className="font-semibold text-2xl">{firstName} {lastName}</p>
            <p className="text-xl">{userName}</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col w-full gap-2">
          <button
            onClick={openNotificationsSidebar}
            className="flex items-center justify-between bg-[#6F58DA] text-white py-2 px-4 rounded-[10px] font-bold relative cursor-pointer"
          >
            <div className="flex items-center gap-2">
            <Bell/>
              <span>Notifications</span>
            </div>
            {/* Example Badge */}
            <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

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
