import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AuthUtil from "../utils/AuthUtil.js";
import {useNavigate} from "react-router-dom";

function Header() {

	const navigate = useNavigate();

	const authUtil = new AuthUtil();

	const {user, token} = useSelector((state) => state.auth);
	const [loggedIn, setLoggedIn] = useState(authUtil.isAuthenticated());

	useEffect(() => {
		console.log("----------")
		setLoggedIn(authUtil.isAuthenticated());
	});


	const logout = () => {
		authUtil.logout();
		navigate('/login');
	}

	return (
		<>
			{/* Fixed Navbar */}
			<nav className="fixed top-0 left-0 right-0 bg-gray-50 text-black z-20">
				<div className="lg:px-8">
					<div className="flex justify-between py-12 h-16">
						{/* Logo */}
						<div className="flex-shrink-0 col-span-2 flex items-center">
							<img alt="Site Logo" width="136" height="45" decoding="async" data-nimg="1" src="https://axtra-next-agency.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-black.f3d0d1c4.png&w=256&q=75" style={{"color": "transparent"}}/>
						</div>
						{/* Links */}
						<div className="md:flex mr-56 col-span-20 space-x-12 justify-between">
							{
								!loggedIn &&
								<>
									<Link to={"/login"} className="p-2 transition hover:text-blue-600 hover:underline">
										<i className="fa-solid fa-arrow-right-to-bracket mx-1"></i>
										LOGIN
									</Link>
									<Link to="/register" className="p-2 transition hover:text-blue-600 hover:underline">
										<i className="fa-solid fa-user-plus mx-1"></i>
										REGISTER
									</Link>
								</>
							}
							{
							loggedIn &&
								<>
									<button onClick={logout} className="p-2 transition hover:text-blue-600 hover:underline">
										<i className="fa-solid fa-right-from-bracket mx-1"></i>
										LOGOUT
									</button>
								</>
							}
							<Link to="/admin/login" className="p-2 transition hover:text-blue-600 hover:underline">
								<i className="fa-solid fa-user-plus mx-1"></i>
								| Admin
							</Link>

						</div>

						{/* Mobile Menu Button */}
						<div className="md:hidden flex items-center">
							<button id="mobile-menu-button" className="text-white focus:outline-none">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}


export default Header;