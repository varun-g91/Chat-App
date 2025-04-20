import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages/conversations`);
                console.log("conversations:", res.data);

                if (res.data.error) {
                    throw new Error(res.data.error);
                }

                setConversations(res.data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);

    return { conversations, loading };
};

export default useGetConversations;
