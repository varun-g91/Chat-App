export {};

declare global {
    type ConversationType = {
        id: string;
        fullName: string;
        profileImage: string;
    };

    // type MessageType = {
    //     senderId: string;
    //     id: string;
    //     body: string;
    //     createdAt: string
    // };

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