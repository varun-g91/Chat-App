import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();
    
    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/login', {
                username,
                password
            })

            if (res.status >= 200 && res.status < 300) {
                toast.success(res.data.message);
                setAuthUser(res.data); 
            } else {
                toast.error(res.data.error);
                throw new Error(res.data.error);
            } 
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

export default useLogin;