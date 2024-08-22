import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import serverUrl from "../utils/GetServerLink.jsx";
import "../index.css";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import TokenUtil from "../utils/TokenUtil.jsx";
import {setUser} from "../stores/slices/AuthSlice.jsx";
import PendingTask from "../components/task/PendingTask.jsx";

const ProfilePage = () => {
	const navigate = useNavigate();
	const {user} = useSelector(state => state.auth);
	// const [fetchInitData] = useOutletContext();

	const dispatch = useDispatch();

	const [tasks, setTasks] = useState([]);
	const [pendingTasks, setPendingTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [showableTasks, setShowableTasks] = useState([]);

	const tokenUtil = new TokenUtil();
	const [token, setToken] = useState(null);


	const loadProfile = async () => {
		let res = await fetch(`${serverUrl}/api/profile/get-profile`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());

		if (res.message === "success") {
			dispatch(setUser(res.user));
			setTasks(res.user?.assignedTasks ?? []);
		}
	}


	useEffect(() => {
		loadProfile().then(r => {
			setShowableTasks(tasks);
			setCompletedTasks(tasks.filter(task => task.status === 'done'))
			setPendingTasks(tasks.filter(task => task.status === 'pending'));
			document.querySelector("#allTaskCheckbox").checked = true;
		});


	}, []);


	const handleShowAllTasks = (e) => {
		setShowableTasks(tasks);
		document.querySelector("#completedTaskCheckbox").checked = false;
		document.querySelector("#pendingTaskCheckbox").checked = false;
	}

	const handleShowCompletedTasks = () => {
		console.log(completedTasks)
		setShowableTasks(completedTasks);
		document.querySelector("#allTaskCheckbox").checked = false;
		// document.querySelector("#completedTaskCheckbox").checked = false;
		document.querySelector("#pendingTaskCheckbox").checked = false;
	}

	const handleShowPendingTasks = () => {
		setShowableTasks(pendingTasks);
		document.querySelector("#allTaskCheckbox").checked = false;
		document.querySelector("#completedTaskCheckbox").checked = false;
		// document.querySelector("#pendingTaskCheckbox").checked = false;
	}


	return (
		<div className="min-h-screen mt-20 bg-gray-100 pt-8 mb-[500px]">
			<div className="min-h-screen bg-gray-100 p-6">
				<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center space-x-6">
						<img
							className="w-24 h-24 rounded-full border-2 border-indigo-600"
							src={serverUrl + "/" + user?.image}
							alt={`${user?.name}'s profile`}/>
						<div>
							<h1 className="text-3xl flex items-center font-semibold">
								{user?.name}
								<Link className={"text-sm mx-2 text-orange-600 border border-orange-600 rounded p-1"} to={"/profile/edit"}>
									<i className={"fas fa-pen"}></i>
								</Link>
							</h1>
							<p className="text-gray-600">{user?.email}</p>
							<div className="mt-4">
								<p className="text-sm text-gray-500">Member since {moment(user?.date ?? Date.now).format('MMMM YYYY')}</p>
								<p className="text-sm text-gray-500">
									Tasks Assigned: <span className="font-medium text-gray-700">{tasks?.length}</span>
								</p>
								<p className="text-sm text-gray-500">
									Tasks Completed: <span className="font-medium text-gray-700">{completedTasks}</span>
								</p>
							</div>
						</div>
					</div>
					<div className={"text-end"}>
						<Link to={"/tasks"} className={"p-2 bg-blue-500 text-gray-50 rounded"}>Tasks</Link>
					</div>
				</div>

			</div>
		</div>
	);
};

export default ProfilePage;