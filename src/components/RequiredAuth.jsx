import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setToken, setUser} from "../stores/slices/AuthSlice.jsx";
import TokenUtil from "../utils/TokenUtil.jsx";
import AuthUtil from "../utils/AuthUtil.js";

const RequiredAuth = ({children}) => {
	const {user} = useSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authUtil = new AuthUtil();
	useEffect(() => {
		if ( !authUtil.isAuthenticated() ) {
			navigate('/login');
		}
	})

	return children;
}


export default RequiredAuth;