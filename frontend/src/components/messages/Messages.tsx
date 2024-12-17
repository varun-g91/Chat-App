import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { loading, messages } = useGetMessages();
	return (
		<div className='px-4 flex-1 overflow-auto'>
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
