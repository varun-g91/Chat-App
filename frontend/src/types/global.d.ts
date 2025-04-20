export {};

declare global {
    type ConversationType = {
        id: string;
        fullName: string;
        profileImage: string;
    };

    interface MessageType {
        id: string;
        body: string;
        senderId: string;
        receiverId: string;
        createdAt: string;
        sender?: {
            id: string;
            fullName: string;
            profileImage: string;
        };
    }
}