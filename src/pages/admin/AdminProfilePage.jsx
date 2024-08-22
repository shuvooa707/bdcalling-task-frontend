import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import serverUrl from "../../utils/GetServerLink.jsx";


const ProfilePage = () => {
	const navigate = useNavigate();
	// const {user} = useSelector(state => state.auth);
	// const [fetchInitData] = useOutletContext();


	const [modal, setModal] = useState(false);

	const closeModal = v => {
		console.log(v)
		setModal(v);
	}

	return (
		<div className="min-h-screen bg-gray-100 pt-8 mb-[500px]">
			<h1 className={"bg-gray-800 text-gray-100"}>Profile</h1>
		</div>
	);
};

export default ProfilePage;