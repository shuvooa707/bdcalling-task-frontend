import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import AuthUtil from "../utils/AuthUtil.js";

const RequiredAdminAuth = ({children}) => {
	const {user} = useSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(user)
	const authUtil = new AuthUtil();
	useEffect(() => {
		if ( !authUtil.isAuthenticated() ) {
			navigate('/login');
		}
	})

	return children;
}


export default RequiredAdminAuth;