"use client";
import { IRequestEntry } from "@/utils/Interfaces/UserInterfaces";
import { approveRequest, currentUser, getAllRequestsToOwner, getLoggedInUserData, getToken, removeRequest } from "@/utils/Services/DataServices";
import { getCommunityRequestDetails } from "@/utils/Services/StyleHelpers";
import { Undo2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;  // Closes both sidebars
  onBack: () => void;   // Only closes notification sidebar
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({ isOpen, onClose, onBack }) => {

  const [requestNotifications, setRequestNotifications] = useState<IRequestEntry[]>([])
    useEffect(() => {
      const getLoggedInData = async () => {
        const user = await getLoggedInUserData(currentUser());
        if (!user || !user.user.username) return;
  
        const loggedIn = await getLoggedInUserData(user.user.username);
        if (loggedIn) {
          const notificationData = await getAllRequestsToOwner(loggedIn.user.id, getToken())
          console.log("Request data: ", notificationData)
          const data = await getCommunityRequestDetails(notificationData.communities);
          setRequestNotifications(data);
          console.log(data);
        }
      };
  
      getLoggedInData();
    }, []);

    const handleAccept = async (communityRequest: IRequestEntry) => {
      try {
        const response = await approveRequest(communityRequest.communityId, communityRequest.userId, true, getToken())
        if (response && response.Success !== false) {
          toast.success("Request accepted", { description: `${communityRequest.firstName} ${communityRequest.lastName} has been added to ${communityRequest.communityName}.` });
        } else {
          toast.error("Failed to accept request", { description: response?.message || "An error occurred." });
        }
      } catch (err) {
        toast.error("Failed to accept request", { description: "An error occurred." });
      }
    }
    
    const handleReject = async (communityRequest: IRequestEntry) => {
      try {
        const response = await removeRequest(communityRequest.communityId, communityRequest.userId, getToken())
        if (response && response.Success !== false) {
          toast.success("Request rejected", { description: `${communityRequest.firstName} ${communityRequest.lastName} was rejected from ${communityRequest.communityName}.` });
        } else {
          toast.error("Failed to reject request", { description: response?.message || "An error occurred." });
        }
      } catch (err) {
        toast.error("Failed to reject request", { description: "An error occurred." });
      }
    }

    
  
  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#140D34] shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="relative w-full h-full p-4 overflow-y-scroll scrollbar ">
        {/* Top Row: Back Button, Title, Close Button */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onBack} className="flex items-center text-gray-500 dark:text-white hover:text-black dark:hover:text-white">
            <Undo2 className="w-5 h-5 mr-2" />
          </button>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-white hover:text-black dark:hover:text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DM Notification */}
        {/* <div className="flex items-start gap-2 pt-2">
          <div className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
            <div className="flex mt-2 gap-2 items-center">
              <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <p className="text-[14px] font-bold text-black">ML</p>
              </div>
              <p className="font-semibold text-sm">Maria Lopez</p>
              <p>3:45 PM</p>
            </div>
            <p>
              Hola amigos! I`&#39;`m organizing a study session for tomorrow at 7 PM to review verb conjugations.
              Anyone interested in joining?
            </p>
          </div>
        </div> */}

        {/* Created Community Notification */}
        {/* <div className="flex items-start gap-2 pt-2">
          <div className="bg-[#3730A3] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
            <div className="flex gap-2 items-center">
              <div className="bg-[#818CF8] rounded-full w-[50px] h-[50px] flex items-center justify-center shrink-0">
                <Image className="w-[28px] h-[28px] object-contain" src="/assets/join.svg" alt="join Icon" width={28} height={28} />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-semibold text-white">You created a Community</p>
                <p className="text-white">6:45 PM</p>
                <button className="text-white font-semibold text-sm border-2 border-[#818CF8] rounded-[30px] px-2 py-1 mt-2 w-full hover:cursor-pointer hover:bg-[#818CF8]">
                  Spanish Learning
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {
          (requestNotifications && requestNotifications.length > 0) ? requestNotifications.map( (notification, idx) => {
            return (
            <div key={idx} className="flex items-start gap-2 pt-2">
              <div className="bg-[#3730A3] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
                <div className="flex gap-2 items-center">
                  <div className="bg-[#818CF8] rounded-full w-[50px] h-[50px] flex items-center justify-center shrink-0">                
                    <Image src="/assets/join.svg" alt="join Icon" width={28} height={28}/>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-semibold text-white">{`${notification.firstName} ${notification.lastName} wants to join ${notification.communityName}`}</p>
                    <div className="flex flex-col space-y-1">
                      <button className="text-white font-semibold text-sm border-2 border-[#818CF8] rounded-[30px] px-2 py-1 mt-2 w-full hover:cursor-pointer hover:bg-[#818CF8]" onClick={() => handleAccept(notification)}>
                        Accept
                      </button>
                      <button className="text-white font-semibold text-sm border-2 border-red-500 rounded-[30px] px-2 py-1 mt-2 w-full hover:cursor-pointer hover:bg-red-500" onClick={() => handleReject(notification)}>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }) :
          <p>You&#39;re all caught up!</p>
        }

      </div>
    </div>
  );
};

export default NotificationsSidebar;
