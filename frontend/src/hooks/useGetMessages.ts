import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation) return;
            setLoading(true);
            setMessages([]);

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation?.id}`);
                console.log("API response:", res.data);
                if (res.data.error) throw new Error(res.data.error || "Failed to fetch messages");
                setMessages(res.data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation, setMessages]);

    useEffect(() => {
        console.log("Messages state:", messages);
    }, [messages]);

    return { messages, loading };
};

export default useGetMessages;
