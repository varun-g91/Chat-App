import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";


const SearchInput = () => {
	const [search, setSearch ] = useState('');
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		console.log("Search button clicked");

		if (!search.trim()) return;
		if (search.length < 3) {
			return toast.error("Search must be at least 3 characters");
		}

		const conversation = conversations.find((c: ConversationType) => 
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		console.log("conversation: " + conversation);

		if (!conversation) {
			return toast.error("No such user found");
		}
		setSelectedConversation(conversation);
		setSearch('');
	}
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  '>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
