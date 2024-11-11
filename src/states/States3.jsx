import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	areNewVideosAtScrollDownLoading: false,
	nextPageToken: "",
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
	},
});

export const {changeAreNewVideosAtScrollDownLoading, changeNextPageToken} = States3Slice.actions;

export default States3Slice.reducer;
