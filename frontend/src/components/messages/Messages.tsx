import useChatScroll from "../../hooks/useChatScroll";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { loading, messages } = useGetMessages();
	useListenMessages();

	const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

	return (
		<div className='px-4 flex-1 overflow-auto ' ref={ref}>
		{loading && [...Array(4)].map((_, index) => <MessageSkeleton key={index} />)}
		{!loading && messages.map((message: MessageType) => <Message key={message.id} message={message} />)}	
		{!loading && messages.length === 0 && (
			<div className='flex flex-col justify-center items-center h-full'>
				<p className='text-2xl font-bold'>No messages yet</p>
			</div>
		)}
		</div>
	);
};
export default Messages;
