import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        if (!selectedConversation) return;
        setLoading(true);
        try {
            console.log(message);
            const res = await axios.post(`/api/messages/send/${selectedConversation?.id}`, {message: message}); 
            if (res.status >= 300 && res.status < 200) {
                throw new Error(res.data.error);
            }
            setMessages([...messages, res.data]);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }    
    return { sendMessage, loading };
}

export default useSendMessage;
