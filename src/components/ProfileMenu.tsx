"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
// import { DarkThemeToggle } from "flowbite-react";
import { currentUser, getAllRequestsToOwner, getLoggedInUserData, getToken } from "@/utils/Services/DataServices";
import { ThemeToggleDropdownItem } from "./ui/toggleTheme";
import { IRequestData } from "@/utils/Interfaces/UserInterfaces";

interface DropdownMenuProfileProps {
    openNotificationsSidebar: () => void;
}

const DropdownMenuProfile: React.FC<DropdownMenuProfileProps> = ({ openNotificationsSidebar }) => {
    const router = useRouter();
    const [userId, setUserId] = useState<number>(-1)
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [requestNotifications, setRequestNotifications] = useState<IRequestData[]>();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getLoggedInUserData(currentUser());
            if (!user?.user?.username) return;

            const loggedIn = await getLoggedInUserData(user.user.username);
            if (loggedIn) {
                const notificationData = await getAllRequestsToOwner(loggedIn.user.id, getToken())
                setUserId(loggedIn.user.id)
                setUserName(loggedIn.user.username || "");
                setFirstName(loggedIn.user.firstName || "");
                setLastName(loggedIn.user.lastName || "");
                console.log("Request Data", notificationData)
                setRequestNotifications(notificationData);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {

    }, [requestNotifications])

    const logout = () => {
        localStorage.removeItem("Token");
        router.push("/");
    };

      useEffect(() => {
        const getUpdatedNotifications = async () => {
          const notificationData = await getAllRequestsToOwner(userId, getToken())
          console.log("This is the shape of the request data: ", notificationData)
          setRequestNotifications(notificationData)
        }
        getUpdatedNotifications()
    
      }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Button */}
                <button className="hidden lg:flex items-center gap-2 cursor-pointer relative">
                    {/* Avatar */}
                    <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] hover:from-[#7e6ae6] hover:to-[#6F58DA] hover:brightness-110 rounded-full w-12 h-12 flex items-center justify-center">
                        <p className="text-white text-lg font-bold">
                            {userName.slice(0, 1).toUpperCase()}
                        </p>
                    </div>
                    {/* Notification Badge */}
                    { requestNotifications && requestNotifications.length > 0 ?
                        <span className="absolute top-[-2px] right-[-2px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
                            {requestNotifications[0].communityRequestCountNumber}
                        </span>
                        :
                        null
                    }
                </button>

            </DropdownMenuTrigger>
            {/* Dropdown Content */}
            <DropdownMenuContent className="w-64 dark:bg-[#140D34] border dark:border-[#aa7dfc] hidden lg:block mr-1">
                <DropdownMenuLabel>
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] rounded-full w-[40px] h-[40px] flex items-center justify-center">
                            <p className="text-[20px] font-bold text-white">{userName.slice(0, 1).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-[16px]">{firstName} {lastName}</p>
                            <p className="text-sm dark:text-white">{userName}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
                        <User className="mr-2 h-4 w-4 text-black dark:text-white" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={openNotificationsSidebar}>
                        <Bell className="mr-2 h-4 w-4 text-black dark:text-white" />
                        Notifications
                        {
                            requestNotifications ?
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {requestNotifications.length}
                            </span>
                            : null
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                       <ThemeToggleDropdownItem/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 dark:text-red-500 cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4 text-black dark:text-white" />
                    Log out
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownMenuProfile;
