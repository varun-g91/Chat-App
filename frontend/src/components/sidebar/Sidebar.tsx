import useGetConversations from "../../hooks/useGetConversations";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
    const { conversations, loading } = useGetConversations();

	return (
		<div className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2'>
			<SearchInput conversations={conversations}/>
			<div className='divider px-3' />
			<Conversations conversations={conversations} loading={loading}/>
			<LogoutButton />
		</div>
	);
};
export default Sidebar;
