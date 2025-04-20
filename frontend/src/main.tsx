import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx';
import { SocketContextProvider } from './context/SocketContext.tsx';


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <SocketContextProvider >
                    <App />
                </SocketContextProvider>
            </AuthContextProvider>
        </Router>
    </StrictMode>
);
