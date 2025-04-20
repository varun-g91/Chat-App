import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

type AuthUserType = {
    id: string,
    fullName: string,
    email: string,
    gender: string,
    profileImage: string,   
}

const AuthContext = createContext<{
    authUser: AuthUserType | null,
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>,
    isLoading: boolean,
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
});


export const useAuthContext = () => {
    return useContext(AuthContext); 
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const fetchAuthUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`);
                if (res.status === 200) {
                    setAuthUser(res.data);
                } else {
                    throw new Error(res.data.error);
                }
            } catch (error) {
                console.error(error); 
                setAuthUser(null);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAuthUser();
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center flex-col relative top-[50vh]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}