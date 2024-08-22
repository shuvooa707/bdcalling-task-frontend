import React, {useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import "../index.css";
import serverUrl from "../utils/GetServerLink.jsx";
import Swal from "sweetalert2";
import {useFormik} from 'formik';
import * as yup from "yup";

const RegisterPage = () => {
	const navigate = useNavigate();
	// const {user} = useSelector(state => state.auth);
	// const [fetchInitData] = useOutletContext();

	const {showOverlay} = useOutletContext();

	const [modal, setModal] = useState(false);
	const [imagePreview, setImagePreview] = useState(false);
	const [image, setImage] = useState(null);

	const closeModal = v => {
		console.log(v)
		setModal(v);
	}

	const handleImageChange = (e) => {
		e.preventDefault();
		setImage(e.target.files[0])
	}

	const register = async () => {
		const payload = new FormData();
		payload.append('image', image);
		payload.append('name', values.name);
		payload.append('username', values.username);
		payload.append('email', values.email);
		payload.append('password', values.password);

		showOverlay(true)
		let res = await fetch(`${serverUrl}/api/auth/register`, {
			method: 'POST',
			headers: {
				// "Content-Type": "application/x-www-form-urlencoded",
				"Accept": "application/json"
			},
			body: payload
		}).then(res => res.json());
		if (res.message === "success") {
			Swal.fire({
				icon: "success",
				title: "Registration Successful",
				text: "Please Login",
			}).then(_ => {
				navigate("/login");
			})
		}


		showOverlay(false)
	}

	const {values, errors, handleSubmit, handleBlur, handleChange} = useFormik({
		initialValues: {
			name: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: ""
		},
		validationSchema: yup.object().shape({
			name: yup.string().required("Enter your name"),
			email: yup.string().email("Please Valid Email").required("Email is required"),
			username: yup.string().required("Enter your username"),
			password: yup.string().min(8).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ , {message: "Password Must Contain 1 uppercase character, 1 digit and 1 special character"}).required("Enter your password"),
			confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Required"),
		}),

		register
	});

	console.log(errors)

	return (
		<div className="min-h-screen flex justify-between items-center bg-gray-100 pt-8 mb-[500px]">
			<div className="max-w-md mx-auto w-1/2 p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Register</h2>
				<form onSubmit={handleSubmit}>

					{/* Image Upload */}
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
							Profile Image
						</label>
						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={handleImageChange}
							className={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}
						/>
						{
							imagePreview && (
								<div className="mt-4">
									<img src={imagePreview} alt="Preview" className="w-24 h-24  object-cover"/>
								</div>
							)
						}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={values.name}
							onChange={handleChange}
							className={ errors.name ? "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-field-error" : "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}
							required
						/>
						<small className={"text-red-700"}>{errors.name}</small>
					</div>


					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
							Username
						</label>
						<input
							type="text"
							id="username"
							value={values.username}
							onChange={handleChange}
							className={ errors.username ? "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-field-error" : "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}
							required
						/>
						<small className={"text-red-700"}>{errors.username}</small>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={values.email}
							onChange={handleChange}
							className={ errors.email ? "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-field-error" : "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}
							required
						/>
						<small className={"text-red-700"}>{errors.email}</small>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={values.password}
							onChange={handleChange}
							className={ errors.password ? "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-field-error" : "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}
							required
						/>
						<small className={"text-red-700"}>{errors.password}</small>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							value={values.confirmPassword}
							onChange={handleChange}
							className={ errors.confirmPassword ? "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-field-error" : "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}
							required
						/>
						<small className={"text-red-700"}>{errors.confirmPassword}</small>
					</div>


					<div className="mb-4 flex justify-end">
						<button
							type="submit"
							className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							onClick={register}
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;