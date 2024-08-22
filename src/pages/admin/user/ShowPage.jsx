import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SERVER_ROOT_URL from "src/utils/GetServerLink.jsx";
import TokenUtil from "src/utils/TokenUtil.jsx";
import User from "../../../components/user/User.jsx";
import Overlay from "../../../layouts/admin/Overlay.jsx";
import Task from "../../../components/admin/Task.jsx";

const ShowPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const tokenUtil = new TokenUtil();

	const [user, setUser] = useState([]);

	const [token, setToken] = useState(null);
	const [showOverlay, setShowOverlay] = useState(false);


	const loadUser = async () => {
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());


		if (res.message === "success") {
			setUser(res.user);
		}

		return res;
	}

	const [tasks, setTasks] = useState([]);
	const [pendingTasks, setPendingTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [showableTasks, setShowableTasks] = useState([]);


	const handleShowAllTasks = event => {
		setShowableTasks(tasks);
		document.querySelector("#completedTaskCheckbox").checked = false;
		document.querySelector("#pendingTaskCheckbox").checked = false;
	}
	const handleShowCompletedTasks = event => {
		console.log(completedTasks)
		setShowableTasks(completedTasks);
		document.querySelector("#allTaskCheckbox").checked = false;
		// document.querySelector("#completedTaskCheckbox").checked = false;
		document.querySelector("#pendingTaskCheckbox").checked = false;
	}
	const handleShowPendingTasks = event => {
		setShowableTasks(pendingTasks);
		document.querySelector("#allTaskCheckbox").checked = false;
		document.querySelector("#completedTaskCheckbox").checked = false;
		// document.querySelector("#pendingTaskCheckbox").checked = false;
	}


	useEffect(() => {
		setShowOverlay(true)
		loadUser().then(res => {
			let assignedTasks = res.user.assignedTasks.map(t => t.task);
			setTasks(assignedTasks);
			setShowableTasks(assignedTasks);
			setCompletedTasks(assignedTasks.filter(task => task.status === 'done'))
			setPendingTasks(assignedTasks.filter(task => task.status === 'pending'));
			document.querySelector("#allTaskCheckbox").checked = true;
			setShowOverlay(false);
		});
	}, [])

	return (
		<>
			{
				showOverlay && <Overlay/>
			}
			<div className="h-screen w-full bg-gray-100 pt-8 mt-20 dark:bg-gray-900">
				<div style={{
					"maxHeight": "800px",
					"overflowY": "auto"
				}} className="lg:w-1/3  mx-auto mt-5 ">

					<div className={"p-2 bg-white border border-gray-400 rounded-md shadow-gray-700 dark:bg-gray-800 dark:text-white"}>
						<strong> {user.name} </strong>
						<h6>
							Assigned Tasks:
							<small className={"py-1 px-1 rounded bg-red-600 text-gray-50 mx-2"}>
								{user?.assignedTasks?.length ?? 0}
							</small>
						</h6>
						<h6>
							Completed Tasks:
							<small className={"py-1 px-1 rounded bg-red-600 text-gray-50 mx-2"}>
								{user?.assignedTasks?.length ?? 0}
							</small>
						</h6>
					</div>
				</div>

				<div className="h-screen w-full bg-gray-100 pt-8 dark:bg-gray-900">
					<div className="lg:w-1/3 bg-white mx-auto mt-20 p-4 dark:bg-gray-800 dark:text-white">
						<h2 className="text-2xl flex justify-between">
							<div onClick={handleShowAllTasks} className={"cursor-pointer bg-blue-100 mx-1 p-2 rounded border border-blue-300 dark:text-black"}>
								<input id={"allTaskCheckbox"} className={"mr-2"} type="checkbox"/>
								<small>
									ALL
								</small>
								<span className="bg-blue-500 text-blue-50 text-xs mx-5 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 ">
									{ tasks.length }
								</span>
							</div>
							<div onClick={handleShowCompletedTasks} className={"cursor-pointer bg-blue-100 mx-1 p-2 rounded border border-blue-300 dark:text-black"}>
								<input id={"completedTaskCheckbox"} className={"mr-2"} type="checkbox"/>
								<span>
									Completed
								</span>
								<span className="bg-green-500 text-blue-50 text-xs font-medium mx-5 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 ">
									{ completedTasks.length }
								</span>
							</div>
							<div onClick={handleShowPendingTasks} className={"cursor-pointer bg-blue-100 mx-1 p-2 rounded border border-blue-300  dark:text-black"}>
								<input id={"pendingTaskCheckbox"} className={"mr-2"} type="checkbox"/>
								<span>
									Pending
								</span>
								<span className="bg-red-500 text-blue-50 text-xs font-medium mx-5 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 ">
									{pendingTasks.length}
								</span>
							</div>
						</h2>
					</div>
					<div className="lg:w-1/3 mx-auto mt-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 p-6">
						{
							showableTasks.map((task, i) => {
								return (
									<Task key={i} task={task}/>
								)
							})
						}
					</div>
				</div>
			</div>
		</>
	)
};

export default ShowPage;