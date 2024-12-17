import useGetConversations from "../../hooks/useGetConversations";
import { ConversationType } from "../../types/global";
import Conversation from "./Conversation";

const Conversations = () => {
    const { conversations, loading } = useGetConversations();

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {loading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>

                </div>
            ) : (
                conversations.map((conversation: ConversationType) => (
                    <Conversation
                        key={conversation.id}
                        conversation={conversation}
                    />
                ))
            )}
        </div>
    );
};

export default Conversations;
