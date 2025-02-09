import { useEffect, useCallback, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages, selectedConversation } = useConversation();
    const messageQueue = useRef<MessageType[]>([]);

    const handleNewMessage = useCallback((newMessage: MessageType) => {
        if (selectedConversation?.id === newMessage.senderId || 
            selectedConversation?.id === newMessage.receiverId) {
            messageQueue.current.push(newMessage);
            
            requestAnimationFrame(() => {
                if (messageQueue.current.length > 0) {
                    setMessages((prevMessages: MessageType[]) => {
                        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
                        const updatedMessages = [...currentMessages, ...messageQueue.current];
                        messageQueue.current = [];
                        return updatedMessages;
                    });
                }
            });
        }
    }, [selectedConversation, setMessages]);

    useEffect(() => {
        if (!socket) return;
        socket.on("newMessage", handleNewMessage);
        return () => {
            socket.off("newMessage", handleNewMessage);
            messageQueue.current = [];
        };
    }, [socket, handleNewMessage]);

    return null;
};

export default useListenMessages;