import Conversation from "./Conversation";

const Conversations = ({ conversations, loading }: { conversations: ConversationType[], loading: boolean }) => {

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
