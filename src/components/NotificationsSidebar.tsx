"use client";
import { Drawer } from "flowbite-react";
import { X } from "lucide-react";

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose} position="right" className="p-2">
      <div className="relative w-full h-full sm:max-w-sm sm:h-auto"> {/* Fullscreen on mobile */}
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>

        {/* DM Notification */}
        <div className="flex items-start gap-2 pt-2">
          <div className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
            <div className="flex mt-2 gap-2 items-center">
              <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <p className="text-[14px] font-bold text-black">ML</p>
              </div>
              <p className="font-semibold text-sm">Maria Lopez</p>
              <p>3:45 PM</p>
            </div>
            <p>
              Hola amigos! I'm organizing a study session for tomorrow at 7 PM
              to review verb conjugations. Anyone interested in joining?
            </p>
          </div>
        </div>

        {/* Created a Community Notification */}
        <div className="flex items-start gap-2 pt-2">
          <div className="bg-[#3730A3] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
            <div className="flex gap-2 items-center">
              <div className="bg-[#818CF8] rounded-full w-[50px] h-[50px] flex items-center justify-center shrink-0">
                <img
                  className="w-[28px] h-[28px] object-contain"
                  src="/assets/join.svg"
                  alt="join Icon"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-semibold text-white">
                  You created a Community
                </p>
                <p className="text-white">6:45 PM</p>
                <button className="text-white font-semibold text-sm border-2 border-[#818CF8] rounded-[30px] px-2 py-1 mt-2 w-full hover:cursor-pointer hover:bg-[#818CF8]">
                  Spanish Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default NotificationsSidebar;
