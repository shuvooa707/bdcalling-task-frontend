import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import SERVER_ROOT_URL from "src/utils/GetServerLink.jsx";
import TokenUtil from "src/utils/TokenUtil.jsx";
import Overlay from "../../../layouts/admin/Overlay.jsx";
import Swal from "sweetalert2";


const CreatePage = () => {
	const navigate = useNavigate();
	const {id: taskId} = useParams();


	const tokenUtil = new TokenUtil();
	const [task, setTask] = useState({});
	const [token, setToken] = useState(null);
	const [assignedUser, setAssignedUser] = useState(null);
	const [users, setUsers] = useState([]);


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


	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('medium');
	const [dueDate, setDueDate] = useState('');
	const [user, setUser] = useState({});
	const [showOverlay, setShowOverlay] = useState(false);


	const createTask = async () => {
		setShowOverlay(true);
		let res = await fetch(`${SERVER_ROOT_URL}/api/admin/tasks/create`, {
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
			navigate("/admin/tasks")
		} else {
			await Swal.fire({
				title: "Session Expired",
				showDenyButton: false,
				showCancelButton: false
			});
			navigate("/admin/login")
		}

		setShowOverlay(false);
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
			setUsers(res.users);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({title, description, priority, due_date: new Date(dueDate), status});
	};

	useEffect(() => {
		setToken(tokenUtil.retrieveToken());
		loadUsers();
	}, []);
	// return (<></>)
	return (
		<div className={"mt-20 flex justify-center w-full bg-gray-100 dark:bg-gray-900"}>
			{
				showOverlay &&
				<Overlay/>
			}

			<div className={"w-full h-full flex justify-center items-center z-40 mt-20 mb-40 top-0 left-0"}>
				<div className={"w-1/3 mx-auto p-2 bg-white rounded-lg shadow-md dark:bg-black"}>
					<h2 className="text-2xl bg-black text-white font-semibold mb-4 p-3">Create New Task</h2>
					<hr/>
					<div className={"p-2 bg-white z-5 dark:bg-black dark:text-white"}>
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
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500  dark:bg-gray-800 dark:text-white"
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
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
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
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
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
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
								/>
							</div>

							<div className="mb-4 flex justify-between">
								<Link
									to={"/admin/tasks"}
									className="px-4 py-2 mx-2 bg-gray-50-50 text-blue-700 border rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									Cancel
								</Link>
								<button
									type="submit"
									className="px-4 py-2 mx-2 bg-orange-600 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
									onClick={createTask}
								>
									Create Task
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

		</div>
	)
};

export default CreatePage;