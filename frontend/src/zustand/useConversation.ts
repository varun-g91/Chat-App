import { create } from "zustand";

interface ConversationState {
    selectedConversation: ConversationType | null;
    setSelectedConversation: (conversation: ConversationType | null) => void;
    messages: MessageType[];
    setMessages: (messages: MessageType[]) => void;
    unreadMessages: Record<string, number>; // Keyed by conversation ID
    incrementUnreadMessages: (conversationId: string) => void;
    resetUnreadMessages: (conversationId: string) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) =>
        set((state) => {
            if (conversation) {
                // Reset unread messages for the selected conversation
                state.resetUnreadMessages(conversation.id);

                // Mark all messages in the selected conversation as read
                const updatedMessages = state.messages.map((msg) =>
                    msg.senderId === conversation.id
                        ? { ...msg, read: true }
                        : msg
                );
                set({ messages: updatedMessages });
            }
            return { selectedConversation: conversation };
        }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    unreadMessages: {},
    incrementUnreadMessages: (conversationId) =>
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [conversationId]:
                    (state.unreadMessages[conversationId] || 0) + 1,
            },
        })),
    resetUnreadMessages: (conversationId) =>
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [conversationId]: 0, // Reset unread count to 0
            },
        })),
}));

export default useConversation;
