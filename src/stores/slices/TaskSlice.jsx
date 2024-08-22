import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	tasks: [],
}

const taskSlice = createSlice({
	name: "taskSlice",
	initialState,
	reducers: {
		setTasks: (state, action) => {
			state.tasks = action.payload;
		},
		getTasks: (state) => {
			return state.tasks;
		}
	}
});

export const {
	setTasks,
	getTasks
} = taskSlice.actions;


export default taskSlice.reducer;