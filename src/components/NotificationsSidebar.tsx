"use client";
import { Drawer } from "flowbite-react";

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose} position="right">
      {/* Notifications content */}
      <div className="">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-start gap-2">
                  <div className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
                    <div className="flex mt-2 gap-2 items-center">
                      <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[14px] font-bold text-black">ML</p>
                      </div>
                      <p className="font-semibold text-sm">Maria lopez</p>
                      <p>3:45 PM</p>
                    </div>
                    <p>
                      Hola amigos! I'm organizing a study session for tomorrow
                      at 7 PM to review verb conjugations. Anyone interested in
                      joining?
                    </p>
                  </div>
                </div>
      </div>
    </Drawer>
  );
};

export default NotificationsSidebar;
