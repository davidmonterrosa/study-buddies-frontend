import { CommunityChats } from '@/utils/Interfaces/UserInterfaces';
import { currentUser, getToken, sendCommunityMessage } from '@/utils/Services/DataServices';
import { formatPostTimeStamp } from '@/utils/Services/StyleHelpers';
import React, { useState } from 'react'


interface CommunityBoardProps {
    communityGroupId: number,
    chats: CommunityChats[],
}
const CommunityBoard: React.FC<CommunityBoardProps> = ({
  communityGroupId,  
  chats
}) => {
    const [messageText, setmessageText] = useState<string>()
    const loggedInUser = currentUser();

    const handleSendMessage = async () => {
    console.log("Send message:", messageText);    
    if(!messageText || messageText.trim() === "") return;
    console.log("This is the logged In user: ", loggedInUser.user.id, loggedInUser.user.username)

    const messageToSend: CommunityChats = {
        id: 0,
        userIdSender: loggedInUser.user.id,
        userSenderName: loggedInUser.user.username,
        message: messageText,
        timestamp: new Date().toISOString(),
        mediaUrl: null,
        isDeleted: false,
        isPinned: false,
        isEdited: false,
    }
    console.log("Message object that is being sent: ", messageToSend, " to community: ", communityGroupId);
    console.log(getToken())
    await sendCommunityMessage(communityGroupId, messageToSend, getToken())
    setmessageText("");
    }
      
  return (
    <section className="flex flex-col min-h-[calc(0.68*100vh)]   overflow-hidden mt-4">
    {/* Messages Area */}

    {/* Time Stamp */}
    <div className="flex justify-center pb-4">
      <div className="bg-[#F3F3F3] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] rounded-[10px] py-[2px] px-[5px] max-h-10  flex items-center justify-center">
        <p className="text-center font-bold">4/22/25</p>
      </div>
    </div>

    <div className="flex-1 md:px-4 overflow-y-auto space-y-3">
      {
        chats.map((chatItem: CommunityChats, idx: number) => {

          if(chatItem.userIdSender === loggedInUser.user.id) {
            return (
              <div key={idx} className="flex justify-end">
              <div className="bg-[#CBD0FF] dark:bg-[#3D3179] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
                <div className="flex mt-2 gap-2 items-center">
                  <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <p className="text-[14px] font-bold text-white">{chatItem.userSenderName.charAt(0).toUpperCase()}</p>
                  </div>
                  <p className="font-semibold text-sm">You</p>
                  <p>{`${formatPostTimeStamp(chatItem.timestamp)}`}</p>
                </div>
                <p>
                  {chatItem.message}
                </p>
                {/* Likes and Reply */}
                <div className="flex row justify-end gap-3">
                  {/* Likes */}
                  <div className="flex row items-center gap-1">
                    <p>12</p>
                    <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                      <p className="text-[14px] font-bold text-white">ML</p>
                    </div>
                  </div>
                  {/* Reply */}
                  <div className="flex row items-center gap-1">
                    <p>2</p>
                    <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                      <p className="text-[14px] font-bold text-white">ML</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            )
          } else {
            {/* Example received message */}
            return (
              <div key={idx} className="flex items-start gap-2">
                <div className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border-[1px] dark:border-[#aa7dfc40] px-3 py-2 rounded-lg w-full text-sm">
                  <div className="flex mt-2 gap-2 items-center">
                    <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                      <p className="text-[14px] font-bold text-black">{chatItem.userSenderName.charAt(0).toUpperCase()}</p>
                    </div>
                    <p className="font-semibold text-sm">{chatItem.userSenderName}</p>
                    <p>{`${formatPostTimeStamp(chatItem.timestamp)}`}</p>
                  </div>
                  <p>
                    {chatItem.message}
                  </p>
                  {/* Likes and Reply */}
                  <div className="flex row justify-end gap-3">
                    {/* Likes */}
                    <div className="flex row items-center gap-1">
                      <p>12</p>
                      <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[14px] font-bold text-black">ML</p>
                      </div>
                    </div>
                    {/* Reply */}
                    <div className="flex row items-center gap-1">
                      <p>2</p>
                      <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        <p className="text-[14px] font-bold text-black">ML</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })
      }

      {/* Example sent message */}
    </div>

    {/* Message Input Bar */}
    <div className="p-3 flex items-center w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full pr-10 px-4 py-2 rounded-[15px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] text-sm bg-[#F6F6F6] dark:bg-transparent dark:border-[1px] dark:border-[#aa7dfc40] focus:outline-none focus:ring-2 focus:ring-[#818CF8] dark:focus:ring-[#a97dfc96]"
          onChange={(e) => setmessageText(e.target.value)}
        />
        {/* Send Icon */}
        <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleSendMessage}>
          <svg width="27" height="27" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
            {/* Define the gradient */}
            <defs>
              <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1" >
                <stop offset="0%" stopColor="#6F58DA" />
                <stop offset="100%" stopColor="#5131E7" />
              </linearGradient>
            </defs>

            <path d="M3.9696 3.01198L23.6529 12.4257C24.2346 12.704 24.4807 13.4011 24.2025 13.9829C24.0874 14.2235 23.8935 14.4174 23.6529 14.5325L3.9696 23.9462C3.38783 24.2245 2.69066 23.9784 2.41242 23.3966C2.29151 23.1438 2.26555 22.856 2.33929 22.5856L4.30801 15.3668C4.35733 15.1859 4.51 15.0521 4.69575 15.0268L14.2337 13.7312C14.3159 13.7195 14.384 13.6655 14.4155 13.5917L14.4319 13.5331C14.4475 13.4236 14.3846 13.3211 14.2859 13.2825L14.2337 13.2689L4.70691 11.9733C4.52118 11.9481 4.36855 11.8142 4.31924 11.6334L2.33929 4.3726C2.16961 3.75044 2.53641 3.10853 3.15857 2.93885C3.42893 2.86512 3.71679 2.89107 3.9696 3.01198Z"
              fill="currentColor"
              className="text-[#818CF8] dark:fill-[url(#darkGradient)]"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>  )
}

export default CommunityBoard