import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

interface ConversationProps {
    conversation: ConversationType;
}

const Conversation = React.memo(({ conversation }: ConversationProps) => {
    const {
        setSelectedConversation,
        selectedConversation,
    } = useConversation();
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const isMe = conversation.id === authUser?.id;
    const isSelected = selectedConversation?.id === conversation.id;
    const isOnline = onlineUsers.includes(conversation.id);


    const handleSelectConversation = () => {
        setSelectedConversation(conversation);
    };

    if (isMe) return null;

    return (
        <div
            className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
                isSelected ? "bg-sky-500" : ""
            }`}
            onClick={handleSelectConversation}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full"> 
                    <img
                        src={conversation.profileImage}
                        alt={conversation.fullName}
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                     <p className="font-bold text-gray-200">{conversation.fullName}</p>
                </div>
            </div>
        </div>
    );
}); 

export default Conversation;