// useLogin.tsx
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username: string, password: string) => {
        if (!username || !password) {
            return null; // Return null instead of undefined
        }

        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                username,
                password,
            });
            setAuthUser(res.data);
            return res.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Login failed";

                throw new Error(errorMessage);
            } else {
                throw new Error("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
