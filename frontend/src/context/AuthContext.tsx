import axios from "axios";
import { Axis3DIcon } from "lucide-react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext); 
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const fetchAuthUser = async () => {
            try {
                const res = await axios.get('/api/auth/me');
                if (res.status === 200) {
                    throw new Error(res.data.message);
                }
                setAuthUser(res.data);
            } catch (error) {
                console.error(error); 
            } finally {
                setIsLoading(false);
            }
        }

        fetchAuthUser();
    })

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}