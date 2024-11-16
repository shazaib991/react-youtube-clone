import {useCallback, useEffect, useRef} from "react";
import {Header} from "./components/Header/Header";
import {HomeSection} from "./components/HomeSection/HomeSection";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {PopOvers} from "./components/PopOvers/PopOvers";
import "./index.css";
import {MicListenPopover} from "./components/PopOvers/MicListenPopover";
import {BottomNavbar} from "./components/bottomNavbar/BottomNavbar";
import {useSelector} from "react-redux";
import {changeMoreIconActive} from "./states/States1";
import {changeVideoMoreIconActive} from "./states/States1";
import {changeVideoMoreIconClickId} from "./states/States2";
import {changeMoreIconHover} from "./states/States3";
import {changeMicIconHover} from "./states/States3";
import {changeSearchIconHover} from "./states/States3";
import {changeVideoMoreIconPos} from "./states/States4";
import {changeIsMicListening} from "./states/States4";
import {changeShowMicListeningPopover} from "./states/States4";
import {useDispatch} from "react-redux";

export default function App() {
	const dispatch = useDispatch();

	const themeMode = useSelector((state) => state.states.value.themeMode);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const videoMoreIconClickId = useSelector((state) => state.states2.value.videoMoreIconClickId);
	const disableScroll = useRef();
	const burgerIcon = useRef();
	const leftScrollVideoCategory = useRef();
	const rightScrollVideoCategory = useRef();
	const videoMoreIconPopOver = useRef();
	let videoMoreIconClickActive = false;

	const handlePopoverDisable = () => {
		if (!moreIconActive && !videoMoreIconActive.status) {
			return;
		}
		if (moreIconActive) {
			dispatch(changeMoreIconActive(false));
			return;
		}
		if (videoMoreIconClickActive) {
			return;
		}
		dispatch(changeVideoMoreIconActive({...videoMoreIconActive, status: false}));
	};

	let handleEvent = useCallback((e) => {
		e.preventDefault();
	}, []);

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

	const handleVideoMouseEnter = (index) => {
		dispatch(changeVideoMoreIconActive({...videoMoreIconActive, id: index}));
	};

	const handleVideoMoreIconClick = (e, index) => {
		videoMoreIconClickActive = true;
		dispatch(changeVideoMoreIconClickId(index));

		dispatch(changeVideoMoreIconPos(e.currentTarget.getBoundingClientRect()));

		if (videoMoreIconActive.id === videoMoreIconClickId) {
			dispatch(changeVideoMoreIconActive({...videoMoreIconActive, status: !videoMoreIconActive.status}));
			return;
		}
		dispatch(changeVideoMoreIconActive({...videoMoreIconActive, status: true}));
	};

	useEffect(() => {
		if (moreIconActive || videoMoreIconActive.status) {
			disableScroll.current.addEventListener("scroll", handleEvent);
			disableScroll.current.addEventListener("mousewheel", handleEvent);
			disableScroll.current.addEventListener("touchmove", handleEvent);
		} else {
			disableScroll.current.removeEventListener("scroll", handleEvent);
			disableScroll.current.removeEventListener("mousewheel", handleEvent);
			disableScroll.current.removeEventListener("touchmove", handleEvent);
		}
	}, [moreIconActive, videoMoreIconActive.status]);

	return (
		<div
			className={`h-[100vh] relative ${moreIconActive || videoMoreIconActive.status ? "invisible" : ""} scroll-smooth`}
			ref={disableScroll}
			onMouseUp={() => {
				if (
					leftScrollVideoCategory.current !== undefined &&
					leftScrollVideoCategory.current.classList.contains("videoCategoryNavigateIconActive2")
				) {
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconActive2");
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseDown");
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseOut");
					return;
				}
				if (
					rightScrollVideoCategory.current !== undefined &&
					rightScrollVideoCategory.current.classList.contains("videoCategoryNavigateIconActive2")
				) {
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconActive2");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseDown");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseOut");
					return;
				}
				if (
					burgerIcon.current.classList.contains("burgerMenuIconActive2") ||
					burgerIcon.current.classList.contains("burgerMenuIconActive2Dark")
				) {
					burgerIcon.current.classList.remove("burgerMenuIconActive");
					burgerIcon.current.classList.remove("burgerMenuIconActiveDark");
					burgerIcon.current.classList.remove("burgerMenuIconActive2");
					burgerIcon.current.classList.remove("burgerMenuIconActive2Dark");
					burgerIcon.current.classList.remove("burgerMenuIconHover");
					burgerIcon.current.classList.remove("burgerMenuIconHoverDark");
					burgerIcon.current.classList.remove("burgerMenuIconMouseDown");
				}
			}}
		>
			<MicListenPopover
				handleMicListenPopoverCancelClick={handleMicListenPopoverCancelClick}
				handleMicListenPopoverClick={handleMicListenPopoverClick}
			/>
			<PopOvers videoMoreIconPopOver={videoMoreIconPopOver} />
			<div className="visible">
				<Header
					handlePopoverDisable={handlePopoverDisable}
					handleHeaderTooltipMouseEnter={handleHeaderTooltipMouseEnter}
					handleHeaderTooltipMouseLeave={handleHeaderTooltipMouseLeave}
					handleMicListenClick={handleMicListenClick}
					burgerIcon={burgerIcon}
				/>
				<div
					className={`w-full flex pt-[56px] ${
						themeMode === "dark" || themeMode === "systemDark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
					}`}
					onClick={handlePopoverDisable}
				>
					<Sidebar />
					<HomeSection
						handleVideoMoreIconClick={handleVideoMoreIconClick}
						leftScrollVideoCategory={leftScrollVideoCategory}
						rightScrollVideoCategory={rightScrollVideoCategory}
						handleVideoMouseEnter={handleVideoMouseEnter}
					/>
				</div>
				<BottomNavbar />
			</div>
		</div>
	);
}
