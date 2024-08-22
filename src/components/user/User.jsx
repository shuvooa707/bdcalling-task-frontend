import {BallTriangle} from "react-loader-spinner";
import {Link} from "react-router-dom";
import React from "react";
import Overlay from "../../layouts/admin/Overlay.jsx";

function User({user}) {
	return (
		<>
			<div id={`user-${user.id}`} style={{"position": "relative", "overflow": "hidden"}} className="bg-white rounded-lg shadow-sm p-2 dark:bg-black dark:text-black">
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
				<div className="flex justify-between items-center">
					<Link to={`/admin/users/${user.id}`} className="mr-3 border cursor-pointer text-blue-950 inline-block px-2 py-1 rounded-md text-sm dark:text-white">
						<i className="fas fa-eye mx-2"></i>
						{user.name}
					</Link>
					<h3 className="text-xl font-semibold"></h3>
					<span className="text-red-800 rounded bg-orange-200 px-2 py-0 border border-orange-600">
						Total Tasks {user.assignedTasks.length}
					</span>
				</div>
			</div>
		</>
	)
}

export default User