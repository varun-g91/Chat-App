import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const {
        selectedConversation,
        incrementUnreadMessages,
        setMessages,
        messages,
    } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;

            const isCurrentConversation = selectedConversation?.id === newMessage.senderId;
            newMessage.read = isCurrentConversation;

            // If the new message belongs to the currently selected conversation
            if (selectedConversation?.id === newMessage.conversationId) {
                setMessages([...messages, newMessage]);
            } else {
                // Increment unread messages for the respective conversation
                incrementUnreadMessages(newMessage.conversationId);
            }
        });

        return () => {
            socket?.off("newMessage");
        };
    }, [
        socket,
        messages,
        selectedConversation,
        setMessages,
        incrementUnreadMessages,
    ]);
};

export default useListenMessages;
