import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

interface Inputs {
    username: string;
    password: string;
}
const Login = () => {
	const [inputs, setInputs] = useState<Inputs>({
        username: "",
        password: "",
    });

	const { loading, login } = useLogin();

	const handleSubmitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
            await login(inputs.username, inputs.password);
            // Successful login is already handled with toast in useLogin
        } catch (error) {
            // Catch and display the error from useLogin
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
	};
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitForm} >
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' 
							value={inputs.username}
							onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
						/>

					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
						/>
					</div>
					<Link
						to='/signup'
						className='text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>
							{loading ? <span className="loading loading-infinity loading-md"></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
