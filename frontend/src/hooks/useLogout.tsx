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
                toast.success(res.data.error);
                setAuthUser(null);
            } else {
                toast.error(res.data.message);
                throw new Error(res.data.message);
            }

        } catch (error:any) {
            
        }
    }

    return { loading, logout }
  return (
    <div>
        
    </div>
  )
}

export default useLogout