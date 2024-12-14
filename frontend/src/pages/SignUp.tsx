import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignUp from "../hooks/useSignUp";


interface Inputs {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

const SignUp = () => {
    const [inputs, setInputs] = useState<Inputs>({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

	const { loading, signUp } = useSignUp();

    const handleGenderChange = (gender: string) => {
        setInputs((prev) => ({
            ...prev,
            gender,
        }));
    };

	const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Log the entire inputs object
        console.log("Frontend Inputs:", inputs);

        // Log each field
        console.log("fullName:", inputs.fullName);
        console.log("username:", inputs.username);
        console.log("password:", inputs.password);
        console.log("confirmPassword:", inputs.confirmPassword);
        console.log("gender:", inputs.gender);

        // Add some validation before calling signUp
        if (
            !inputs.fullName ||
            !inputs.username ||
            !inputs.password ||
            !inputs.confirmPassword ||
            !inputs.gender
        ) {
            console.error("Some fields are missing");
            return;
        }

        signUp(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full input input-bordered h-10"
                            value={inputs.fullName}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    fullName: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="johndoe"
                            className="w-full input input-bordered h-10"
                            value={inputs.username}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>

                    <GenderCheckbox
                        selectedGender={inputs.gender}
                        onGenderChange={handleGenderChange}
                    />

                    <Link
                        to={"/login"}
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2 border border-slate-700"
							disabled={loading}
						>
                            {loading ? (
                                <span className="loading loading-infinity loading-md"></span>
                            ) : (
                                "SignUp"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
