import React, {useRef, useState} from 'react';
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import serverUrl from "../../utils/GetServerLink.jsx";
import {useDispatch, useSelector} from "react-redux";
import { setUser, setToken } from "../../stores/slices/AuthSlice.jsx";


const AdminLoginPage = () => {
	const username = useRef('');
	const password = useRef('');
	const [error, setError] = useState(false);
	const {showOverlay} = useOutletContext();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		showOverlay(true)
		let res = await fetch(`${serverUrl}/api/auth/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				username: username.current.value,
				password: password.current.value
			})
		}).then(res => res.json());

		showOverlay(false)

		if (res.message === "success") {
			dispatch(setUser(res.user));
			dispatch(setToken(res.token));
			setError(false);
			navigate("/admin/tasks");
		}
		else {
			setError(true);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 mb-[500px]">
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
					<h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
					<form className="mt-8">
						<div className="mb-4">
							{
								error &&
								<h5 className={"text-red-700 font-bold"}>*Wrong Credentials</h5>
							}
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
								Username
							</label>
							<input
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
								type="text"
								id="username"
								placeholder="Enter your email"
								ref={username}
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
								Password
							</label>
							<input
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
								type="password"
								id="password"
								placeholder="Enter your password"
								ref={password}
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="button"
								onClick={handleSubmit}
							>
								Sign In
							</button>
							<Link
								to={"/register"}
								className=" hover:underline text-blue-700 font-bold py-2 px-4 rounded"
							>
								Sign Up
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLoginPage;