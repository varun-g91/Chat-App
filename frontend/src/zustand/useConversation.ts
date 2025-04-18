import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface ConversationState {
    messages: MessageType[];

    selectedConversation: any | null;
    setMessages: (messages: MessageType[] | ((prev: MessageType[]) => MessageType[])) => void;
    setSelectedConversation: (conversation: any) => void;
}

const useConversation = create<ConversationState>()(
    subscribeWithSelector(
        devtools(
            (set, _get) => ({
                messages: [],
                selectedConversation: null,
                setMessages: (messages) => {
                    set((state) => {
                        const newMessages = typeof messages === 'function' 
                            ? messages(state.messages) 
                            : messages;
                        
                        console.log('[Store Debug] Updating messages:', newMessages);
                        return { messages: newMessages };
                    }, false, 'setMessages');
                },
                setSelectedConversation: (conversation) => 
                    set({ selectedConversation: conversation }, false, 'setSelectedConversation'),
            }),
            {
                name: 'conversation-store',
                enabled: true
            }
        )
    )
);

// Subscribe to state changes
useConversation.subscribe(
    (state) => state.messages,
    (messages) => {
        console.log('[Store Debug] Messages changed:', messages);
    }
);

export default useConversation;
