import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	areNewVideosAtScrollDownLoading: false,
	nextPageToken: "",
	moreIconHover: false,
	micIconHover: false,
	searchIconHover: false,
	videoMoreIconClickActive: false,
};

export const States3Slice = createSlice({
	name: "States3",
	initialState: {value: initialState},
	reducers: {
		changeAreNewVideosAtScrollDownLoading: (state, action) => {
			state.value.areNewVideosAtScrollDownLoading = action.payload;
		},
		changeNextPageToken: (state, action) => {
			state.value.nextPageToken = action.payload;
		},
		changeMoreIconHover: (state, action) => {
			state.value.moreIconHover = action.payload;
		},
		changeMicIconHover: (state, action) => {
			state.value.micIconHover = action.payload;
		},
		changeSearchIconHover: (state, action) => {
			state.value.searchIconHover = action.payload;
		},
		changeVideoMoreIconClickActive: (state, action) => {
			state.value.videoMoreIconClickActive = action.payload;
		},
	},
});

export const {
	changeAreNewVideosAtScrollDownLoading,
	changeNextPageToken,
	changeMoreIconHover,
	changeMicIconHover,
	changeSearchIconHover,
	changeVideoMoreIconClickActive,
} = States3Slice.actions;

export default States3Slice.reducer;
