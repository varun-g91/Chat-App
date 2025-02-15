import { useEffect, useCallback, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    const messageQueue = useRef<MessageType[]>([]);

    const handleNewMessage = useCallback((newMessage: MessageType) => {
        console.log("[Debug] Received message:", newMessage);
        console.log("[Debug] Selected conversation:", selectedConversation);
        
        if (selectedConversation?.id === newMessage.senderId || 
            selectedConversation?.id === newMessage.receiverId) {
            console.log("[Debug] Message matches conversation");
            messageQueue.current.push(newMessage);
            
            requestAnimationFrame(() => {
                if (messageQueue.current.length > 0) {
                    console.log("[Debug] Processing message queue:", messageQueue.current);
                    setMessages((prevMessages: MessageType[]) => {
                        console.log("[Debug] Previous messages:", prevMessages);
                        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
                        const updatedMessages = [...currentMessages, ...messageQueue.current];
                        console.log("[Debug] Updated messages:", updatedMessages);
                        messageQueue.current = [];
                        return updatedMessages;
                    });
                }
            });
        } else {
            console.log("[Debug] Message does not match conversation");
        }
    }, [selectedConversation, setMessages]);

    useEffect(() => {
        if (!socket) {
            console.log("[Debug] No socket connection");
            return;
        }
        
        console.log("[Debug] Setting up socket listener");
        socket.on("newMessage", handleNewMessage);
        
        return () => {
            console.log("[Debug] Cleaning up socket listener");
            socket.off("newMessage", handleNewMessage);
            messageQueue.current = [];
        };
    }, [socket, handleNewMessage]);

    // Monitor messages state changes
    useEffect(() => {
        console.log("[Debug] Messages state updated:", messages);
    }, [messages]);

    return null;
};

export default useListenMessages;