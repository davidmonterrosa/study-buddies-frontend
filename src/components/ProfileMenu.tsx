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
import { currentUser, getLoggedInUserData } from "@/utils/Services/DataServices";
import { ThemeToggleDropdownItem } from "./ui/toggleTheme";

interface DropdownMenuProfileProps {
    openNotificationsSidebar: () => void;
}

const DropdownMenuProfile: React.FC<DropdownMenuProfileProps> = ({ openNotificationsSidebar }) => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getLoggedInUserData(currentUser());
            if (!user?.user?.username) return;

            const loggedIn = await getLoggedInUserData(user.user.username);
            if (loggedIn) {
                setUserName(loggedIn.user.username || "");
                setFirstName(loggedIn.user.firstName || "");
                setLastName(loggedIn.user.lastName || "");
            }
        };

        fetchUserData();
    }, []);

    const logout = () => {
        localStorage.removeItem("Token");
        router.push("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Button */}
                <button className="hidden lg:flex items-center gap-2 cursor-pointer relative">
                    {/* Avatar */}
                    <div className="bg-gradient-to-b from-[#6F58DA] to-[#5131E7] rounded-full w-12 h-12 flex items-center justify-center">
                        <p className="text-white text-lg font-bold">
                            {userName.slice(0, 1).toUpperCase()}
                        </p>
                    </div>
                    {/* Notification Badge */}
                    <span className="absolute top-[-2px] right-[-2px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
                        3
                    </span>
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
                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4 text-black dark:text-white" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={openNotificationsSidebar}>
                        <Bell className="mr-2 h-4 w-4 text-black dark:text-white" />
                        Notifications
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
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
