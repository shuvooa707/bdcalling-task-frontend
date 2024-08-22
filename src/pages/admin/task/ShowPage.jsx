import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import moment from 'moment';
import SERVER_ROOT_URL from "src/utils/GetServerLink.jsx";
import TokenUtil from "src/utils/TokenUtil.jsx";
import {BallTriangle} from "react-loader-spinner";
import Swal from 'sweetalert2';
import Overlay from "../../../layouts/admin/Overlay.jsx";


const ShowPage = () => {
	const navigate = useNavigate();
	const {id: taskId} = useParams();


	const tokenUtil = new TokenUtil();
	const [task, setTask] = useState({});
	const [token, setToken] = useState(null);
	const [assignedUser, setAssignedUser] = useState(null);
	const [users, setUsers] = useState([]);


	const loadTask = async () => {
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/tasks/${taskId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());


		console.log(res)
		if (res.message === "success") {
			setTask(res.task)
			setTitle(res.task.title)
			setDescription(res.task.description)
			setDueDate(new Date(res.task.due_date))
			setPriority(res.task.priority);

			setAssignedUser(res.assignedUser);
		}

		return res;
	}
	const loadUsers = async () => {
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			}
		}).then(res => res.json());

		console.log(res)
		if (res.message === "success") {
			setUsers(res.users.filter( user => user.role === "user" ));
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


	const [editModalVisible, setEditModalVisible] = useState(false);
	const [assignModalVisible, setAssignModalVisible] = useState(false);


	const deleteTask = async () => {
		Swal.fire({
			title: "Do You Want to Delete?",
			showDenyButton: true,
			confirmButtonText: "No",
			denyButtonText: `Delete`
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (!result.isConfirmed) {
				let res = await fetch(`${SERVER_ROOT_URL}/api/admin/tasks/remove/${taskId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
					}
				}).then(res => res.json());

				console.log(res)
				if (res.message === "success") {
					Swal.fire("Task Deleted", "", "success")
						.then(r => {
							navigate("/admin/tasks")
						});
				}
			}
		});
	}

	const showEditModal = () => {
		setEditModalVisible(true);
		// select priority
		let prioritySelectOptions = [...document.querySelectorAll("#priority option")];
		prioritySelectOptions.forEach(option => {
			if (option.value === task.priority) {
				option.selected = true;
			}
		});

		// select assigned user
		setTimeout(() => {
			let userSelectOptions = [...document.querySelectorAll("#user option")];
			console.log(userSelectOptions)
			userSelectOptions.forEach(option => {
				console.log(option.value, assignedUser)
				if (option.value === assignedUser?._id) {
					option.selected = true;
				}
			});
		}, 10)

	}

	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('medium');
	const [user, setUser] = useState({});
	const [dueDate, setDueDate] = useState('');
	const [status, setStatus] = useState('pending');
	const [showOverlay, setShowOverlay] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({title, description, priority, due_date: new Date(dueDate), status});
	};

	const assignUser = async () => {
		let userId = document.querySelector("#assign-user-select").value;

		setShowOverlay(true)
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/tasks/giveAccessRight`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			},
			body: JSON.stringify({
				"userId": userId,
				"taskId": task._id
			})
		}).then(res => res.json());

		if (res.message === "success") {
			setTask(res.task);
			setAssignedUser(res.assignedUser)
		}

		setAssignModalVisible(false);
		setShowOverlay(false)

	}

	const updateTask = async () => {
		setShowOverlay(true);
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/tasks/update/${task._id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": `Bearer ${tokenUtil.retrieveToken()}`
			},
			body: JSON.stringify({
				"title": title,
				"description": description,
				"priority": priority,
				"due_date": dueDate
			})
		}).then(res => res.json());

		if (res.message === "success") {
			await loadTask();
			setEditModalVisible(false);
		}

		setShowOverlay(false);
	}


	useEffect(() => {
		setToken(tokenUtil.retrieveToken());
		loadTask();
		loadUsers();
	}, []);
	// return (<></>)
	return (
		<>
			<div className={"mt-20 flex justify-center w-full bg-gray-100 dark:bg-gray-900"}>

				{
					showOverlay &&
					<Overlay/>
				}
				{
					editModalVisible &&
					<div className={"w-full h-full flex justify-center items-center z-40 bg-[#0000008c] fixed top-0 left-0"}>
						<div className={"w-1/3 mx-auto p-2 bg-white rounded-lg shadow-md"}>
							<h2 className="text-2xl bg-black text-white font-semibold mb-4 p-3">Update Task</h2>
							<hr/>
							<div className={"p-2 bg-white z-5"}>
								<form onSubmit={handleSubmit}>
									{/* Title */}
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
											Title
										</label>
										<input
											type="text"
											id="title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
											required
										/>
									</div>

									{/* Description */}
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
											Description
										</label>
										<textarea
											id="description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
											rows="4"
										/>
									</div>

									{/* Priority */}
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
											Priority
										</label>
										<select
											id="priority"
											value={priority}
											onChange={(e) => setPriority(e.target.value)}
											className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
										>
											<option value="high">High</option>
											<option value="medium">Medium</option>
											<option value="low">Low</option>
										</select>
									</div>

									{/* Due Date */}
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
											Due Date
										</label>
										<input
											type="date"
											id="dueDate"
											value={dueDate}
											onChange={(e) => setDueDate(e.target.value)}
											className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
										/>
									</div>

									<div className="mb-4 flex justify-end">
										<button
											type="submit"
											className="px-4 py-2 mx-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
											onClick={updateTask}
										>
											Update Task
										</button>
										<button
											onClick={_ => setEditModalVisible(false)}
											type="submit"
											className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				}
				{
					assignModalVisible &&
					<div className={"w-full h-full flex justify-center items-center z-40 bg-[#0000008c] fixed top-0 left-0 dark:bg-gray-900"}>
						<div className={"w-1/3 mx-auto p-2 bg-white rounded-lg shadow-md"}>
							<h2 className="flex justify-between text-2xl bg-black text-white font-semibold mb-4 p-3">
								<span>Assign User</span>
								<span className={"cursor-pointer"} onClick={_=>setAssignModalVisible(false)}>x</span>
							</h2>
							<hr/>
							<div className={"p-2 bg-white z-5"}>
								<div className="max-w-sm mx-auto">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
										<span>Assign User</span>
									</label>

									<select
										id="assign-user-select"
										className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
									>
										<option value="high">Select User</option>
										{
											users.map((user, i) => {
												return (
													<option key={i} value={user.id}>{user.name}</option>
												)
											})
										}
									</select>
									<button onClick={assignUser} className="mt-4 mr-3 border cursor-pointer bg-green-600 text-white inline-block py-2 px-5 rounded-md text-sm">
										Assign
										<i className="fas fa-save mx-2"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				}
				<div className="h-screen w-1/2 bg-gray-100 pt-8 dark:bg-gray-900">
					<div className={"w-full bg-white p-5 mb-5 rounded-md dark:bg-gray-900 border border-gray-100"}>
						<Link className={"border rounded-md p-2 bg-black text-white"} to={"/admin/tasks/create"}>
							Create Task
							<i className={"fas fa-plus"}></i>
						</Link>
					</div>

					<div id={`task-${task._id}`} style={{
						"position": "relative",
						"overflow": "hidden"
					}} className="bg-white rounded-lg shadow-sm p-4 border border-gray-300 dark:bg-gray-900 dark:text-white">
						<div className={"task-card-overlay text-center justify-center items-center absolute w-full h-full bg-white opacity-80 hidden"}>
							<BallTriangle
								height={100}
								width={100}
								radius={5}
								color="#4fa94d"
								ariaLabel="ball-triangle-loading"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
							/>
						</div>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-semibold">{task.title}</h3>
							<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
			          {task.priority?.toUpperCase()}
			        </span>
						</div>
						<p className="text-gray-600 mb-4">{task.description}</p>
						<div className="flex justify-between items-center mb-4">
							{
								task.status === 'done' ? (
									<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
			                    {task?.status?.toUpperCase()} - {moment(task.completion_date).format('MMM DD, YYYY')}
					        </span>
								) : (
									<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
					          {task?.status?.toUpperCase()}
					        </span>
								)
							}

							<div className="text-blue-50 border inline-block font-bold px-2 py-1 bg-red-500 rounded-md border-red-500 text-sm">
								<i className="fas fa-clock mr-1 "></i>
								Due: {moment(task.due_date).format('MMM DD, YYYY')}
							</div>
						</div>
						{/* Assigned User */}
						<div className={"flex justify-between items-center mb-4"}>
							{
								assignedUser && (
									<span className={"p-2 rounded border"}>
									Assigned User :
									<Link to={"/admin/users/" + assignedUser._id} className={"text-indigo-700 mx-2 underline"}>{assignedUser?.name}</Link>
									<br/>
									<span onClick={_ => setAssignModalVisible(true)} className={"cursor-pointer text-red-700"}>
										<i className={"fas fa-pen mx-2 "}></i>
										Change
									</span>
								</span>
								)
							}
							{
								!assignedUser && (
									<>
									<span className={"p-2 rounded border"}>
										Assigned User :  <span className={"text-red-600"}>NONE</span>
										<br/>
										<span onClick={_ => setAssignModalVisible(true)} className={"cursor-pointer text-blue-700"}>
											<i className={"fas fa-pen mx-2 "}></i>
											assign
										</span>
									</span>
									</>
								)
							}
						</div>
						<hr className={"my-2"}/>
						<div className="flex justify-start">
							<button onClick={showEditModal} className="mr-3 border cursor-pointer text-blue-950 inline-block px-2 py-1 rounded-md text-sm dark:text-white">
								<i className="fas fa-edit mr-1"></i>
								EDIT
							</button>
							<button onClick={deleteTask} className="mr-3 border cursor-pointer text-blue-950 inline-block px-2 py-1 rounded-md text-sm dark:text-white">
								<i className="fas fa-eye mr-1"></i>
								DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default ShowPage;