import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext<{
    socket: Socket | null;
    onlineUsers: string[];
    isConnected: boolean;
}>({
    socket: null,
    onlineUsers: [],
    isConnected: false
});

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const { authUser } = useAuthContext();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    console.log(import.meta.env.VITE_API_URI)

    useEffect(() => {
        if (!authUser) return;

        const socket = io(import.meta.env.API_URI, {
            query: { userId: authUser.id },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });

        socket.on("connect", () => {
            console.log("[Socket Debug] Connected:", socket.id);
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            console.log("[Socket Debug] Disconnected");
            setIsConnected(false);
        });

        socket.on("getOnlineUsers", (users: string[]) => {
            console.log("[Socket Debug] Online users:", users);
            setOnlineUsers(users);
        });

        socketRef.current = socket;

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("getOnlineUsers");
            socket.close();
            socketRef.current = null;
        };
    }, [authUser]);

    return (
        <SocketContext.Provider value={{
            socket: socketRef.current,
            onlineUsers,
            isConnected
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within SocketContextProvider");
    }
    return context;
};
