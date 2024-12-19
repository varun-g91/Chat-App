import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { ConversationType } from "../../types/global";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji }: { conversation: ConversationType, emoji: string }) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    const isMe = conversation.id === authUser?.id;
	const isSelected = selectedConversation?.id === conversation.id;

    const { onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation.id);

    if (isMe) {
        return null;
    }
	return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-8 md:w-12 rounded-full">
                        <img
                            src={conversation.profileImage}
                            alt="user avatar"
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200 text-sm md:text-md">
                            {conversation.fullName}
                        </p>
                        <span className="text-xl hidden md:inline-block">
                            {emoji}
                        </span>
                    </div>
                </div>
            </div>

            <div className="divider my-0 py-0 h-1" />
        </>
    );
};
export default Conversation;
