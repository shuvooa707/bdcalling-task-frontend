import React, {useEffect, useState} from 'react';
import "../index.css";
import SERVER_ROOT_URL from "../utils/GetServerLink.jsx";
import TokenUtil from "../utils/TokenUtil.jsx";
import Task from "../components/task/Task.jsx";

const TaskPage = () => {

	const tokenUtil = new TokenUtil();


	const [token, setToken] = useState(null);

	const [tasks, setTasks] = useState([]);
	const [pendingTasks, setPendingTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [showableTasks, setShowableTasks] = useState([]);

	const loadTasks = async () => {
		let res = await fetch(`${SERVER_ROOT_URL}/api/tasks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());


		if (res.message === "success") {
			setTasks(res.tasks)
			setShowableTasks(res.tasks);
			setCompletedTasks(res.tasks.filter(task => task.status === 'done'))
			setPendingTasks(res.tasks.filter(task => task.status === 'pending'));
		}

		return res;
	}

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

		if (res.message === "success") {
			document.querySelector(`#task-${taskId} > .task-card-overlay`).classList.add("hidden");
			await loadTasks();
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

		if (res.message === "success") {
			document.querySelector(`#task-${taskId} > .task-card-overlay`).classList.add("hidden");
			await loadTasks();
		}
	}

	useEffect(() => {
		setToken(tokenUtil.retrieveToken());
		loadTasks().then(res => {
			console.log(tasks)
			setShowableTasks(res.tasks);
			setCompletedTasks(res.tasks.filter(task => task.status === 'done'))
			setPendingTasks(res.tasks.filter(task => task.status === 'pending'));
			document.querySelector("#allTaskCheckbox").checked = true;
		});
	}, [])


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

	return (
		<div className="h-screen w-full bg-gray-100 pt-8 dark:bg-gray-900">
			<div className="lg:w-1/3 bg-white mx-auto mt-20 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 rounded-md gap-6 p-2">
				<h2 className="text-2xl flex justify-between mb-4">
					<div onClick={handleShowAllTasks} className={"cursor-pointer bg-blue-100 mx-1 p-2 rounded border border-blue-300"}>
						<input id={"allTaskCheckbox"} className={"mr-2"} type="checkbox"/>
						<small>
							ALL
						</small>
						<span className="bg-blue-500 text-blue-50 text-xs mx-5 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
							{tasks.length}
						</span>
					</div>
					<div onClick={handleShowCompletedTasks} className={"cursor-pointer bg-blue-100 mx-1 p-2 rounded border border-blue-300"}>
						<input id={"completedTaskCheckbox"} className={"mr-2"} type="checkbox"/>
						<span>
							Completed
						</span>
						<span className="bg-green-500 text-blue-50 text-xs font-medium mx-5 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
							{completedTasks.length}
						</span>
					</div>
					<div onClick={handleShowPendingTasks} className={"cursor-pointer bg-blue-100 mx-1 p-2 rounded border border-blue-300"}>
						<input id={"pendingTaskCheckbox"} className={"mr-2"} type="checkbox" />
						<span>
							Pending
						</span>
						<span className="bg-red-500 text-blue-50 text-xs font-medium mx-5 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
							{pendingTasks.length}
						</span>
					</div>
				</h2>
			</div>
			<div className="lg:w-1/3 mx-auto mt-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 p-6">
				{
					showableTasks.map((task, i) => {
						return (
							<Task markCompleted={markCompleted} markUncompleted={markUncompleted} key={i} task={task}/>
						)
					})
				}
			</div>
		</div>
	)
};

export default TaskPage;