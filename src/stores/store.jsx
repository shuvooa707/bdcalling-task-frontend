import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "./slices/AuthSlice.jsx";
import TaskSlice from "./slices/TaskSlice.jsx";

const store = configureStore({
	reducer: {
		auth: AuthSlice,
		tasks: TaskSlice,
	},
});


export default store;