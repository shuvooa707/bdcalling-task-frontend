import {createSlice} from "@reduxjs/toolkit";
import TokenUtil from "../../utils/TokenUtil.jsx";
import UserUtil from "../../utils/UserUtil.jsx";


const initialState = {
	user: null,
	token: null,
}

const authSlice = createSlice({
	name: "AuthSlice",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			let tu = TokenUtil()
			tu.storeToken(action.payload);
		},
		getToken: (state, action) => {
			return state.token;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			let uu = UserUtil()
			uu.storeUser(action.payload);
		},
		logout: (state, action) => {
			state.user = null
			let tu = TokenUtil()
			tu.clearToken().then(r => r);
		},
		isAuthenticated: (state, action) => {
			return state.user == null;
		}
	}
});

export const {
	setToken,
	getToken,
	setUser,
	logout,
	isAuthenticated
} = authSlice.actions;


export default authSlice.reducer;