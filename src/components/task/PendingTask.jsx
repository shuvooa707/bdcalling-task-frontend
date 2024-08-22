import {BallTriangle} from "react-loader-spinner";
import moment from "moment/moment.js";
import React, {useState} from "react";

function Task({task, markUncompleted, markCompleted}) {

	const [token, setToken] = useState(null);
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


	return (
		<>
			<div id={`task-${task._id}`} style={{
				"position": "relative",
				"overflow": "hidden"
			}} className="bg-white rounded-lg shadow-sm p-4">
				<div className={"task-card-overlay text-center flex justify-center items-center absolute w-full h-full bg-white opacity-80 hidden"}>
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
			                    {task.status.toUpperCase()} - {moment(task.completion_date).format('MMM DD, YYYY')}
					        </span>
						) : (
							<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
					            {task.status.toUpperCase()}
					        </span>
						)
					}
					<div className="text-blue-50 border inline-block px-2 py-1 bg-red-600 rounded-md border-red-500 text-sm">
						<i className="fas fa-clock mr-1 "></i>
						Due: {moment(task?.due_date ?? Date.now()).format('MMM DD, YYYY')}
					</div>
				</div>

			</div>
		</>
	)
}

export default Task;