import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();

    const sendMessage = async (message: string) => {
        if (!selectedConversation) return;

        setLoading(true);
        const tempMessage: MessageType = {
            senderId: authUser?.id || "",
            id: `${Date.now()}`, // Generate a temporary unique ID
            body: message,
            createdAt: new Date().toISOString(),
            receiverId: selectedConversation.id,
        };

        // Access the current state of messages
        const currentMessages = useConversation.getState().messages;

        // Add the temp message to the state
        setMessages([...currentMessages, tempMessage]);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/messages/send/${selectedConversation?.id}`,
                {
                    message: message,
                }
            );

            const updatedMessage: MessageType = {
                ...res.data,
                delivered: true,
            };

            // Update the message in the state
            const updatedMessages = useConversation
                .getState()
                .messages.map((msg) =>
                    msg.id === tempMessage.id
                        ? { ...msg, ...updatedMessage }
                        : msg
                );
            setMessages(updatedMessages);
        } catch (error: any) {
            console.error("Failed to send message:", error);
            toast.error("Message failed to send");
        } finally {
            setLoading(false);
        }
    };
    
    return { sendMessage, loading };
}

export default useSendMessage;
