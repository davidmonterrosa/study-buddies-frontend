"use client";
import { DirectMessages, IUserNameId } from "@/utils/Interfaces/UserInterfaces";
import { checkToken, currentUser, getLoggedInUserData, getToken, getUserById } from "@/utils/Services/DataServices";
import { buildDirectMessagePayload, getAllDirectMessages, postDirectMessage } from "@/utils/Services/DirectMessageSerices";
import { formatPostTimeStamp } from "@/utils/Services/StyleHelpers";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface DirectMessageProps {
  onBackClick?: () => void;
  buddy: number;
}

const DirectMessage: React.FC<DirectMessageProps> = ({ onBackClick, buddy }) => {

  const [messages, setMessages] = useState<DirectMessages[]>([])
  const [messageText, setMessageText] = useState<string>('')
  const [senderId, setSenderId] = useState<number>(-1)
  const [senderName, setSenderName] = useState<string>('');
  const [buddyInfo, setBuddyInfo] = useState<IUserNameId>({
        success: false,
        user: {
          id: 0,
          username: "",
          firstName: "",
          lastName: ""    ,
          ownedCommunitys: [],
          joinedCommunitys: [],
          communityRequests: [],
        }
  })
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [previousDay, setPreviousDay] = useState<string>('');
  // const [isTheUser, setIsTheUser] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = await getLoggedInUserData(currentUser());
      const buddyResponse = await getUserById(buddy);
      if (loggedIn) {
        setSenderId(loggedIn.user.id);
        setSenderName(loggedIn.user.username);
      }
      if(buddyResponse) {
        console.log(buddyResponse)
        setBuddyInfo(buddyResponse)
      }
    };

    
    if (!checkToken()) {
      router.push('/');
    } else {
      getLoggedInData();
    }
  }, []);


  useEffect(() => {
    const getDirectMessages = async () => {
      if (senderId !== -1) {
        const directMessagesResponse = await getAllDirectMessages(senderId, getToken());
        console.log(directMessagesResponse);
        if (directMessagesResponse) {
          const chatWithBuddy = directMessagesResponse.chats.find(
            (chat: { userId: number; messages: DirectMessages[] }) => chat.userId === buddy
          );
          if (chatWithBuddy) {
            setMessages(chatWithBuddy.messages);
          } else {
            setMessages([]);
          }
        }
      }
    }
    getDirectMessages();
  }, [senderId])

  const isNewDay = (date: string) => {
    if (date !== previousDay) {
      setPreviousDay(date);
      return true;
    }
    return false;
  }

  const handleSendMessage = async () => {
    if (!messageText || messageText.trim() === '') return;

    const messagePayload = buildDirectMessagePayload(senderId, buddy, messageText);

    const wasSent = await postDirectMessage(messagePayload, getToken());
    console.log(wasSent)
    if (wasSent) {
      setMessageText('');
      const chatMessages = await getAllDirectMessages(senderId, getToken());
      if (chatMessages) {
          const chatWithBuddy = chatMessages.chats.find(
            (chat: { userId: number; messages: DirectMessages[] }) => chat.userId === buddy
          );
          console.log(chatWithBuddy)
          if (chatWithBuddy) {
            console.log("All good up to the setting of the messages")
            setMessages(chatWithBuddy.messages);
          } else {
            console.log("Failed to get chatWithBuddy")
            setMessages([]);
          }
        }

    }
  };


  return (
    <section className="flex flex-col h-full max-h-full overflow-hidden mt-4">
      {/* Back Button */}
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="mb-4 self-start bg-[#818CF8] text-white px-4 py-2 rounded-md hover:bg-[#6b74f7] transition"
        >
          ←
        </button>
      )}
      <div className="flex-1 md:px-4 overflow-y-auto space-y-3 pb-2">
        {
          (messages.length > 0 && senderId != -1) ? messages.map((message, idx) => {
            console.log(message)
            return (
              // Messages Scrollable Container
              <div key={idx}>
                {/* Time Stamp */}
                {
                  isNewDay(message.DateTime) ?
                  (<div className="flex justify-center pb-4">
                      <div className="bg-[#F3F3F3] dark:bg-[#140D34] dark:border dark:border-[#aa7dfc40] rounded-[10px] py-[2px] px-[5px] max-h-10 flex items-center justify-center">
                        <p className="text-center font-bold">4/22/25</p>
                      </div>
                    </div>) : null
                }

                {
                 
                  (message.SenderId === senderId) ? (
                    // {/* Sent Message */}
                    <div className="flex justify-end">
                      <div className="flex flex-col items-end w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs text-gray-500">{formatPostTimeStamp(message.DateTime)}</p>
                          <p className="font-semibold text-sm">You</p>
                          <div className="bg-[#3730A3] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                            <p className="text-[14px] font-bold text-white">{`${senderName.charAt(0).toUpperCase()}`}</p>
                          </div>
                        </div>
                        <div className="bg-[#CBD0FF] dark:bg-[#3D3179] dark:border border-[#aa7dfc40] px-3 py-2 rounded-[25px] rounded-tr-none text-sm w-fit max-w-[75%]">
                          <p>
                            {message.Message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) :
                  (
                    // {/* Received Message */}
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-[#818CF8] rounded-full w-[30px] h-[30px] flex items-center justify-center">
                            <p className="text-[14px] font-bold text-black">{buddyInfo.user.firstName.charAt(0).toUpperCase()}</p>
                          </div>
                          <p className="font-semibold text-sm">{`${buddyInfo.user.firstName} ${buddyInfo.user.lastName}`}</p>
                          <p className="text-xs text-gray-500">{`${formatPostTimeStamp(message.DateTime)}`}</p>
                        </div>
                        <div className="bg-[#F6F6F6] dark:bg-[#140D34] dark:border border-[#aa7dfc40] px-3 py-2 rounded-[25px] rounded-tl-none text-sm w-fit max-w-[75%]">
                          <p>
                            {`${message.Message}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                }


                {/* Scroll to bottom anchor */}
                <div ref={messagesEndRef} />
              </div>
            )
          }) :
            <div className="flex-1 md:px-4">
              <h1 className="text-center text-2xl">This is the start of your direct messages with this Buddy</h1>
            </div>
        }

      </div>



      {/* Message Input Bar */}
      <div className="p-3 flex items-center w-full bg-white dark:bg-[#0e0724] sticky bottom-0 z-10">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full pr-10 px-4 py-2 rounded-[15px] drop-shadow text-sm bg-[#F6F6F6] dark:bg-transparent dark:border dark:border-[#aa7dfc40] focus:outline-none focus:ring-2 focus:ring-[#818CF8] dark:focus:ring-[#a97dfc96]"
          />
          <button className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ${messageText.trim() === '' ? 'text-gray-400' : 'text-[#818CF8]'
            }`}
            onClick={handleSendMessage}
            disabled={messageText.trim() === ''}>
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-300"
            >
              <defs>
                <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6F58DA" />
                  <stop offset="100%" stopColor="#5131E7" />
                </linearGradient>
              </defs>
              <path
                d="M3.9696 3.01198L23.6529 12.4257C24.2346 12.704 24.4807 13.4011 24.2025 13.9829C24.0874 14.2235 23.8935 14.4174 23.6529 14.5325L3.9696 23.9462C3.38783 24.2245 2.69066 23.9784 2.41242 23.3966C2.29151 23.1438 2.26555 22.856 2.33929 22.5856L4.30801 15.3668C4.35733 15.1859 4.51 15.0521 4.69575 15.0268L14.2337 13.7312C14.3159 13.7195 14.384 13.6655 14.4155 13.5917L14.4319 13.5331C14.4475 13.4236 14.3846 13.3211 14.2859 13.2825L14.2337 13.2689L4.70691 11.9733C4.52118 11.9481 4.36855 11.8142 4.31924 11.6334L2.33929 4.3726C2.16961 3.75044 2.53641 3.10853 3.15857 2.93885C3.42893 2.86512 3.71679 2.89107 3.9696 3.01198Z"
                fill="currentColor"
                className="text-[#818CF8] dark:fill-[url(#darkGradient)]"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DirectMessage;
