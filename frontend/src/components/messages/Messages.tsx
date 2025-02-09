import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
    const { loading, messages } = useGetMessages();
    useListenMessages();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loading) {
            scrollToBottom();
        }
    }, [messages, loading]);

    useEffect(() => {
        console.log("Messages updated:", messages);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {loading && [...Array(4)].map((_, index) => (
                <MessageSkeleton key={index} />
            ))}
            {!loading && Array.isArray(messages) && messages.map((message: MessageType) => (
                <Message key={message.id} message={message} />
            ))}
            {!loading && Array.isArray(messages) && messages.length === 0 && (
                <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-2xl font-bold">No messages yet</p>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Messages;