import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Overlay from "./Overlay.jsx"
import Preloader from "../../components/Preloader.jsx";
import {isAuthenticated, logout} from "../../stores/slices/AuthSlice.jsx";
import AuthUtil from "../../utils/AuthUtil.js";
import { useSelector } from "react-redux";

function AdminRootLayout() {
	const navigate = useNavigate();


	const [showPreloader, setShowPreloader] = useState(false);
	const [overlay, showOverlay] = useState(false);
	const [showSettings, setShowSettings] = useState(true);
	const [darkMode, setDarkMode] = useState(true);



	const authUtil = new AuthUtil();

	const darkModeHandler = (dm) => {
		if (!dm) {
			setDarkMode(dm)
			document.body.classList.add('dark');
		} else {
			setDarkMode(dm)
			document.body.classList.remove('dark');
		}
	}


	return (
		<>
			{
				showPreloader && <Preloader/>
			}

			{
				overlay && (
					<Overlay/>
				)
			}

			<div className={`${showSettings ? 'right-[-275px]' : 'right-[-0px]'} transition-all z-[102] fixed top-60 right-0 w-[300px] h-[250px] rounded shadow overflow-visible`}>
				<span onClick={_ => {
					setShowSettings(!showSettings)
				}} className={" cursor-pointer p-4 bg-black absolute top-[50%] left-[-20px] "} style={{transform: "translateY(-50%)"}}>
					{
						showSettings &&
						<i className="fas fa-gear text-white shadow-gray-500 z-[99] rotate-forever "></i>
					}
					{
						!showSettings &&
						<i className="fas fa-times text-white shadow-gray-500 z-[99]"></i>
					}
				</span>
				<div className={"bg-[#121212] text-white absolute left-[25px] p-4 h-full w-full"}>
					<div className={"text-2xl"}>
						Mode
					</div>
					<div className={"text-white w-full"}>
						<button onClick={_ => darkModeHandler(true)} className={`${darkMode ? 'text-white' : 'text-gray-500'} bg-[#2b2b2f] p-2 px-9 mr-2`}>LIGHT</button>
						<button onClick={_ => darkModeHandler(false)} className={`${darkMode ? 'text-gray-500' : 'text-white'} bg-[#2b2b2f] p-2 px-9`}>DARK</button>
					</div>
				</div>
			</div>



			<Header />
			<Outlet context={{showOverlay}}/>
		</>
	)
}


export default AdminRootLayout;