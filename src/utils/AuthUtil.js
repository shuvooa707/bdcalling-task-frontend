import TokenUtil from "./TokenUtil.jsx";

function AuthUtil() {
	const tokenUtil = new TokenUtil();
	return {
		isAuthenticated: () => {
			return !!tokenUtil.retrieveToken();
		},
		logout: () => {
			tokenUtil.clearToken();
		},


		isAdmin: () => {
			return !!tokenUtil.isAdmin();
		}
	}
}


export default AuthUtil;