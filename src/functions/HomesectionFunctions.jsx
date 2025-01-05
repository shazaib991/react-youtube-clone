import {useDispatch, useSelector} from "react-redux";
import {changeVideoMoreIconPos} from "../states/States4";
import {changeVideoMoreIconClickId} from "../states/States2";
import {changeVideoMoreIconClickActive} from "../states/States3";
import {changeVideoMoreIconActive} from "../states/States1";
import {useRef} from "react";

export const HomesectionFunctions = () => {
	const dispatch = useDispatch();
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const videoMoreIconClickId = useSelector((state) => state.states2.value.videoMoreIconClickId);
	const leftScrollVideoCategory = useRef();
	const rightScrollVideoCategory = useRef();

	const handleVideoMoreIconClick = (e, index) => {
		dispatch(changeVideoMoreIconClickActive(true));
		dispatch(changeVideoMoreIconClickId(index));

		dispatch(changeVideoMoreIconPos(e.currentTarget.getBoundingClientRect()));

		if (videoMoreIconActive.id === videoMoreIconClickId) {
			dispatch(changeVideoMoreIconActive({...videoMoreIconActive, status: !videoMoreIconActive.status}));
			return;
		}
		dispatch(changeVideoMoreIconActive({...videoMoreIconActive, status: true}));
	};

	const handleVideoMouseEnter = (index) => {
		dispatch(changeVideoMoreIconActive({...videoMoreIconActive, id: index}));
	};

	return {handleVideoMoreIconClick, handleVideoMouseEnter, leftScrollVideoCategory, rightScrollVideoCategory};
};
