export {};

declare global {
    type ConversationType = {
        id: string;
        fullName: string;
        profileImage: string;
    };

    type MessageType = {
        senderId: string;
        id: string;
        body: string;
        createdAt: string;
        shouldShake?: boolean;
        delivered: boolean; 
        read: boolean; 
    };
}