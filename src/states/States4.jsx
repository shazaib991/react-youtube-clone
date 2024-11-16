import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	videoMoreIconPos: {},
	windowSize: 0,
	navigateToThemeOptions: false,
	showMicListeningPopover: false,
	isMicListening: false,
	isMouseInsideMicListeningPopover: false,
};

export const States4Slice = createSlice({
	name: "States4",
	initialState: {value: initialState},
	reducers: {
		changeVideoMoreIconPos: (state, action) => {
			state.value.videoMoreIconPos = action.payload;
		},
		changeWindowSize: (state, action) => {
			state.value.windowSize = action.payload;
		},
		changeNavigateToThemeOptions: (state, action) => {
			state.value.navigateToThemeOptions = action.payload;
		},
		changeShowMicListeningPopover: (state, action) => {
			state.value.showMicListeningPopover = action.payload;
		},
		changeIsMicListening: (state, action) => {
			state.value.isMicListening = action.payload;
		},
		changeIsMouseInsideMicListeningPopover: (state, action) => {
			state.value.isMicListening = action.payload;
		},
	},
});

export const {
	changeVideoMoreIconPos,
	changeWindowSize,
	changeNavigateToThemeOptions,
	changeShowMicListeningPopover,
	changeIsMicListening,
	changeIsMouseInsideMicListeningPopover,
} = States4Slice.actions;

export default States4Slice.reducer;
