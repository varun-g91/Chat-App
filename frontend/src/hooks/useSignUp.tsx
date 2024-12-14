import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from "react-hot-toast";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp = async (inputs: any) => {
        try {
            setLoading(true);
            const res = await axios.post('/api/auth/signup', {
                fullName: inputs.fullName,
                username: inputs.username,
                password: inputs.password,
                confirmPassword: inputs.confirmPassword,
                gender: inputs.gender
            });

            if (res.status >= 200 && res.status < 300) {
                toast.success(res.data.message);
                setAuthUser(res.data); 
            } else {
                toast.error(res.data.error);
                throw new Error(res.data.error);
            }
        } catch (error: any) {
            toast.error(error.error);
            console.error(error.error);
        } finally{
            setLoading(false);
        }
    }
  return {
    loading,
    signUp
  }
};

export default useSignUp