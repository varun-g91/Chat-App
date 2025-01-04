import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { ConversationType } from "../../types/global";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
    const {
        setSelectedConversation,
        resetUnreadMessages,
        selectedConversation,
    } = useConversation();
    const { authUser } = useAuthContext();
    const isMe = conversation.id === authUser?.id;
	const isSelected = selectedConversation?.id === conversation.id;
    const { onlineUsers} = useSocketContext();
    console.log("online users: " + onlineUsers);
	const isOnline = onlineUsers.includes(conversation.id);

    console.log("is online: " + isOnline);

    const handleSelectConversation = () => {
        setSelectedConversation(conversation);
        resetUnreadMessages(conversation.id); // Reset unread count when the conversation is opened
    };

    if (isMe) return null;

    return (
        <div
            className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
                isSelected ? "bg-sky-500" : ""
            }`}
            onClick={handleSelectConversation}
        >
            {/* UI for unread count */}
            <div className={`flex gap-2 ${isOnline ? "online" : ""}`}> 
                <img 
                    src={conversation.profileImage}
                    alt={conversation.fullName}
                    className="w-10 h-10 rounded-full"
                />
                <p className="font-bold">{conversation.fullName}</p>

                <span className="text-xs text-gray-500">
                    {conversation.unreadCount > 0
                        ? (
                            <span className="bg-red-500 text-white rounded-full px-2 py-1">
                                {conversation.unreadCount}
                            </span>
                        )
                        : ""}
                </span>
            </div>
        </div>
    );
};

export default Conversation;

