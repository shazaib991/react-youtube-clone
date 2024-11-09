import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	themeMode: "dark",
	userLocation: "",
	moreIconActive: false,
	videoMoreIconActive: {
		status: false,
		id: 0,
	},
	sidebarBurgerMenuClick: false,
};

export const States2Slice = createSlice({
	name: "States2",
	initialState: {value: initialState},
	reducers: {
		changeTheme: (state, action) => {
			state.value.themeMode = action.payload;
		},
		changeLocation: (state, action) => {
			state.value.userLocation = action.payload;
		},
		changeMoreIconActive: (state, action) => {
			state.value.moreIconActive = action.payload;
		},
		changeVideoMoreIconActive: (state, action) => {
			state.value.videoMoreIconActive = action.payload;
		},
		changeSidebarBurgerMenuClick: (state, action) => {
			state.value.sidebarBurgerMenuClick = action.payload;
		},
	},
});

export const {changeTheme, changeLocation, changeMoreIconActive, changeVideoMoreIconActive, changeSidebarBurgerMenuClick} =
	States2Slice.actions;

export default States2Slice.reducer;
