import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import SERVER_ROOT_URL from "src/utils/GetServerLink.jsx";
import TokenUtil from "src/utils/TokenUtil.jsx";
import Task from "src/components/admin/Task.jsx";
import Overlay from "../../../layouts/admin/Overlay.jsx";

const IndexPage = () => {
	const navigate = useNavigate();
	const tokenUtil = new TokenUtil();

	const [tasks, setTasks] = useState([]);

	const [token, setToken] = useState(null);
	const [showOverlay, setShowOverlay] = useState(false);


	const loadTasks = async () => {
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/tasks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());

		console.log(res)
		if (res.message === "success") {
			setTasks(res.tasks)
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

	const markCompleted = async (taskId) => {
		document.querySelector(`#task-${taskId} > .task-card-overlay`).classList.remove("hidden");
		let res = await fetch(`${SERVER_ROOT_URL}/api/tasks/mark-done/${taskId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${token}`
			}
		}).then(r => r.json());

		if (res.message == "success") {
			document.querySelector(`#task-${taskId} > .task-card-overlay`).classList.add("hidden");
			loadTasks();
		}
	}
	const markUncompleted = async (taskId) => {
		document.querySelector(`#task-${taskId} > .task-card-overlay`).classList.remove("hidden");
		let res = await fetch(`${SERVER_ROOT_URL}/api/tasks/mark-undone/${taskId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${token}`
			}
		}).then(r => r.json());

		if (res.message == "success") {
			document.querySelector(`#task-${taskId} > .task-card-overlay`).classList.add("hidden");
			loadTasks();
		}
	}

	useEffect(() => {
		setToken(tokenUtil.retrieveToken());
		setShowOverlay(true);
		loadTasks().then(res=>{
			setShowOverlay(false);
		});
	}, [])

	return (
		<>
			{
				showOverlay && <Overlay/>
			}
			<div className="h-screen w-full bg-gray-100 pt-8  dark:bg-gray-700">

				<div className="lg:w-1/3 sm:w-full bg-white mx-auto mt-20 ">
					<div className={"w-full flex justify-between bg-white p-5 shadow dark:bg-gray-900 dark:shadow-gray-800"}>
						<div className={" dark:text-white"}>
							TOTAL TASKS:
							<span className={"p-2 py-1 mx-2 rounded bg-red-600 text-white"}>
							{tasks.length}
							</span>
						</div>
						<div>
							<Link className={"border rounded-md p-2 bg-black text-white dark:bg-white dark:text-black"} to={"/admin/tasks/create"}>
								Create Task
								<i className={"fas fa-plus"}></i>
							</Link>
						</div>
					</div>
				</div>

				<div style={{
					"maxHeight": "700px",
					"overflowY": "auto"
				}} className="lg:w-1/3 sm:w-full mx-auto mt-5  gap-6 p-6">
					{
						tasks.map((task, index) => {
							return (
								<Task task={task} key={index}/>
							)
						})
					}
				</div>


			</div>
		</>
	)
};

export default IndexPage;