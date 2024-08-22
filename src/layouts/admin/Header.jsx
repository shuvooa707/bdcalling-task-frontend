import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import AuthUtil from "../../utils/AuthUtil.js";
import {useNavigate} from "react-router-dom";
import {logout} from "../../stores/slices/AuthSlice.jsx";

function Header() {

	const navigate = useNavigate();

	// const { user } = useSelector((state) => state.auth);

	const authUtil = new AuthUtil();

	const {user, token} = useSelector((state) => state.auth);
	const [loggedIn, setLoggedIn] = useState(authUtil.isAuthenticated());
	const [showMobileSidebar, setShowMobileSidebar] = useState(true);

	const handleSetShowMobileSidebar = () => {
		setShowMobileSidebar(!showMobileSidebar);
	}

	const handleLogout = () => {
		authUtil.logout();
		logout();
		setShowMobileSidebar(false);
		navigate('/admin/login');
		setLoggedIn(false);
	}

	const logout = () => {
		authUtil.logout();
		navigate('/admin/login');
	}

	useEffect(() => {
		console.log(user)
		setLoggedIn(!!user);
	}, [user]);

	return (
		<>

			{/* Mobile Sidebar */}
			{
				showMobileSidebar &&
				<div className={`${showMobileSidebar ? "right-0" : "right-[-50%]"} lg:hidden fixed w-1/2 h-full transition-all top-0 z-[102] bg-gray-950 shadow-xl shadow-gray-900 text-white p-5`}>
					<div className={"text-start flex justify-between items-center py-2 "} onClick={handleSetShowMobileSidebar}>
						<img alt="Site Logo" width="136" height="45" decoding="async" data-nimg="1" src="https://axtra-next-agency.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-black.f3d0d1c4.png&w=256&q=75" style={{"color": "transparent"}}/>
						<i className="fas fa-times text-white"></i>
					</div>
					{/* Links */}
					<div className="">
						{

							!loggedIn &&
							<>
								<Link to={"/admin/login"} className="block text-start p-2 my-2 transition hover:text-blue-600 hover:underline dark:text-white">
									<i className="fas fa-tasks mx-1"></i> LOGIN
								</Link>
							</>
						}
						{
							loggedIn &&
							<>
								<Link to="/admin/tasks" className="block p-2 transition my-2  hover:text-blue-600 hover:underline dark:text-white">
									<i className="fas fa-tasks mx-1"></i> TASKS
								</Link>
								<Link to="/admin/users" className="block p-2 transition my-2  hover:text-blue-600 hover:underline dark:text-white">
									<i className="fa-solid fa-people-group mx-1"></i>
									USERS
								</Link>
								<button onClick={handleLogout} className="block p-2 transition my-2  hover:text-blue-600 hover:underline dark:text-white">
									<i className="fa-solid fa-right-from-bracket mx-1"></i>
									LOGOUT
								</button>
							</>
						}
					</div>
				</div>
			}


			{/* Fixed Navbar */}
			<nav className="fixed top-0 left-0 right-0 bg-gray-50 text-black z-20 dark:bg-gray-800">
				<div className="lg:px-8">
					<div className="flex justify-between py-12 h-16">
						{/* Logo */}
						<div className="flex-shrink-0 col-span-2 flex items-center">
							<img alt="Site Logo" width="136" height="45" decoding="async" data-nimg="1" src="https://axtra-next-agency.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-black.f3d0d1c4.png&w=256&q=75" style={{"color": "transparent"}}/>
						</div>
						{/* Links */}
						<div className=" sm:hidden justify-between">
							{
								!loggedIn &&
								<>
									<Link to={"/admin/login"} className="  dark:text-white">LOGIN</Link>
								</>
							}
							{
								loggedIn &&
								<>
									<Link to="/admin/tasks" className="sm:hidden p-2 transition hover:text-blue-600 hover:underline dark:text-white">
										<i className="fas fa-tasks mx-1"></i> TASKS
									</Link>
									<Link to="/admin/users" className="p-2 transition hover:text-blue-600 hover:underline dark:text-white">
										<i className="fa-solid fa-people-group mx-1"></i>
										USERS
									</Link>
									<button onClick={logout} className="p-2 transition hover:text-blue-600 hover:underline dark:text-white">
										<i className="fa-solid fa-right-from-bracket mx-1"></i>
										LOGOUT
									</button>
								</>
							}
						</div>

						{/* Mobile Menu Button */}
						<div className="lg:hidden mx-3 flex items-center">
							<button onClick={handleSetShowMobileSidebar} id="mobile-menu-button" className="text-black dark:text-white focus:outline-none">
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