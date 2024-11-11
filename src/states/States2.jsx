import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	isMouseOutsideMoreIconActive: false,
	videoMoreIconClickId: 0,
	videoCategoryClickedId: 0,
	videoCategoryArr: [],
	videoData: [],
};

export const States2Slice = createSlice({
	name: "States2",
	initialState: {value: initialState},
	reducers: {
		changeIsMouseOutsideMoreIconActive: (state, action) => {
			state.value.isMouseOutsideMoreIconActive = action.payload;
		},
		changeVideoMoreIconClickId: (state, action) => {
			state.value.videoMoreIconClickId = action.payload;
		},
		changeVideoCategoryClickedId: (state, action) => {
			state.value.videoCategoryClickedId = action.payload;
		},
		changeVideoCategoryArr: (state, action) => {
			state.value.videoCategoryArr = action.payload;
		},
		changeVideoData: (state, action) => {
			state.value.videoData = action.payload;
		},
	},
});

export const {
	changeIsMouseOutsideMoreIconActive,
	changeVideoMoreIconClickId,
	changeVideoCategoryClickedId,
	changeVideoCategoryArr,
	changeVideoData,
} = States2Slice.actions;

export default States2Slice.reducer;
