import {useDispatch} from "react-redux";
import {changeIsMicListening} from "../states/States4";
import {changeShowMicListeningPopover} from "../states/States4";
import {changeMoreIconActive} from "../states/States1";
import {changeVideoMoreIconActive} from "../states/States1";
import {useSelector} from "react-redux";
import {useRef} from "react";
import {changeMoreIconHover} from "../states/States3";
import {changeMicIconHover} from "../states/States3";
import {changeSearchIconHover} from "../states/States3";

export const HeaderFunctions = () => {
	const dispatch = useDispatch();
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const videoMoreIconClickActive = useSelector((state) => state.states3.value.videoMoreIconClickActive);
	const burgerIcon = useRef();

	const handleMicListenPopoverClick = () => {
		dispatch(changeIsMicListening((prev) => !prev));
	};

	const handleMicListenClick = () => {
		dispatch(changeIsMicListening(true));
		dispatch(changeShowMicListeningPopover(true));
	};

	const handleMicListenPopoverCancelClick = (status) => {
		if (status === "outside") {
			dispatch(changeShowMicListeningPopover(false));
		}
	};

	const handlePopoverDisable = () => {
		if (!moreIconActive && !videoMoreIconActive.status) {
			return;
		}
		if (moreIconActive) {
			dispatch(changeMoreIconActive(false));
			return;
		}
		dispatch(changeVideoMoreIconActive({...videoMoreIconActive, status: false}));
		if (videoMoreIconClickActive) {
			return;
		}
	};

	const handleHeaderTooltipMouseEnter = (TargetTooltip) => {
		if (TargetTooltip === "moreIconTooltip") {
			dispatch(changeMoreIconHover(true));
		}
		if (TargetTooltip === "micIconTooltip") {
			dispatch(changeMicIconHover(true));
		}
		if (TargetTooltip === "searchIconTooltip") {
			dispatch(changeSearchIconHover(true));
		}
	};

	const handleHeaderTooltipMouseLeave = (TargetTooltip) => {
		if (TargetTooltip === "moreIconTooltip") {
			dispatch(changeMoreIconHover(false));
		}
		if (TargetTooltip === "micIconTooltip") {
			dispatch(changeMicIconHover(false));
		}
		if (TargetTooltip === "searchIconTooltip") {
			dispatch(changeSearchIconHover(false));
		}
	};

	return {
		handleMicListenClick,
		handleMicListenPopoverClick,
		handleMicListenPopoverCancelClick,
		handlePopoverDisable,
		burgerIcon,
		handleHeaderTooltipMouseLeave,
		handleHeaderTooltipMouseEnter,
	};
};
