import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/auth/logout');
            if (res.status >= 200 && res.status < 300) {
                setAuthUser(null);
            } else {
                throw new Error(res.data.error);
            }
        } catch (error:any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        } 
    }
        
    return { loading, logout }
}



export default useLogout