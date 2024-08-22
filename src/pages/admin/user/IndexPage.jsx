import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SERVER_ROOT_URL from "src/utils/GetServerLink.jsx";
import TokenUtil from "src/utils/TokenUtil.jsx";
import User from "../../../components/user/User.jsx";
import Overlay from "../../../layouts/admin/Overlay.jsx";

const IndexPage = () => {
	const navigate = useNavigate();
	const tokenUtil = new TokenUtil();

	const [users, setUsers] = useState([]);

	const [token, setToken] = useState(null);
	const [showOverlay, setShowOverlay] = useState(false);


	const loadUsers = async () => {
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());


		if (res.message === "success") {
			setUsers(res.users);
		}
	}


	const priorityColors = {
		high: 'bg-red-100 text-red-800',
		medium: 'bg-yellow-100 text-yellow-800',
		low: 'bg-green-100 text-green-800',
	};

	const statusColors = {
		done: 'bg-green-100 text-green-800',
		pending: 'bg-yellow-100 text-yellow-800',
		expired: 'bg-red-100 text-red-800',
		cancelled: 'bg-gray-100 text-gray-800',
	};


	useEffect(() => {
		setToken(tokenUtil.retrieveToken());
		setShowOverlay(true)
		loadUsers().then(res => {
			setShowOverlay(false);
		});
	}, [])

	return (
		<>
			{
				showOverlay && <Overlay/>
			}
			<div className="h-screen w-full bg-gray-100 pt-8 mt-20 dark:bg-gray-900">
				<div className={"lg:w-1/3 bg-white border border-gray-500 mx-auto mt-5 p-6 rounded-md shadow dark:bg-gray-800 dark:text-white dark:shadow-gray-400"}>
					TOTAL USERS: { users.length }
				</div>
					<div style={{
						"maxHeight": "800px",
						"overflowY": "auto"
					}} className="lg:w-1/3  mx-auto mt-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 p-6">
					{
						users.map((user, index) => {
							return (
								<User user={user} key={index}/>
							)
						})
					}
				</div>
			</div>
		</>
	)
};

export default IndexPage;