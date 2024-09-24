import {useCallback, useEffect, useRef, useState} from "react";
import {Header} from "./components/Header/Header";
import {HomeSection} from "./components/HomeSection/HomeSection";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {PopOvers} from "./components/PopOvers/PopOvers";
import "./index.css";
import {MicListenPopover} from "./components/PopOvers/MicListenPopover";
import {BottomNavbar} from "./components/bottomNavbar/BottomNavbar";

export default function App() {
	const [moreIconActive, setMoreIconActive] = useState(false);
	const [userLocation, setUserLocation] = useState("");
	const [videoMoreIconActive, setVideoMoreIconActive] = useState({
		status: false,
		id: 0,
	});
	const [isMouseOutsideMoreIconActive, setIsMouseOutsideMoreIconActive] = useState(false);
	const [themeMode, setThemeMode] = useState("dark");
	const [moreIconHover, setMoreIconHover] = useState(false);
	const [micIconHover, setMicIconHover] = useState(false);
	const [searchIconHover, setSearchIconHover] = useState(false);
	const [isMicListening, setIsMicListening] = useState(false);
	const [videoMoreIconClickId, setVideoMoreIconClickId] = useState(0);
	const [videoMoreIconPos, setVideoMoreIconPos] = useState(Object);
	const [isMouseInsideMicListeningPopover, setIsMouseInsideMicListeningPopover] = useState(false);
	const [showMicListeningPopover, setShowMicListeningPopover] = useState(false);
	const [sidebarBurgerMenuClick, setSidebarBurgerMenuClick] = useState(false);
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
			setMoreIconActive(false);
			return;
		}
		if (videoMoreIconClickActive) {
			return;
		}
		setVideoMoreIconActive({...videoMoreIconActive, status: false});
	};

	let handleEvent = useCallback((e) => {
		e.preventDefault();
	}, []);

	const handleHeaderTooltipMouseEnter = (TargetTooltip) => {
		if (TargetTooltip === "moreIconTooltip") {
			setMoreIconHover(true);
		}
		if (TargetTooltip === "micIconTooltip") {
			setMicIconHover(true);
		}
		if (TargetTooltip === "searchIconTooltip") {
			setSearchIconHover(true);
		}
	};

	const handleHeaderTooltipMouseLeave = (TargetTooltip) => {
		if (TargetTooltip === "moreIconTooltip") {
			setMoreIconHover(false);
		}
		if (TargetTooltip === "micIconTooltip") {
			setMicIconHover(false);
		}
		if (TargetTooltip === "searchIconTooltip") {
			setSearchIconHover(false);
		}
	};

	const handleMicListenPopoverClick = () => {
		setIsMicListening((prev) => !prev);
	};

	const handleMicListenClick = () => {
		setIsMicListening(true);
		setShowMicListeningPopover(true);
	};

	const handleMicListenPopoverCancelClick = (status) => {
		if (status === "outside") {
			setShowMicListeningPopover(false);
		}
	};

	const handleVideoMouseEnter = (index) => {
		setVideoMoreIconActive({...videoMoreIconActive, id: index});
	};

	const handleVideoMoreIconClick = (e, index) => {
		videoMoreIconClickActive = true;
		setVideoMoreIconClickId(index);

		setVideoMoreIconPos(e.currentTarget.getBoundingClientRect());

		if (videoMoreIconActive.id === videoMoreIconClickId) {
			setVideoMoreIconActive({
				...videoMoreIconActive,
				status: !videoMoreIconActive.status,
			});
			return;
		}
		setVideoMoreIconActive({...videoMoreIconActive, status: true});
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

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setThemeMode("systemDark");
			return;
		}
		setThemeMode("systemLight");
	}, []);

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
				showMicListeningPopover={showMicListeningPopover}
				isMouseInsideMicListeningPopover={isMouseInsideMicListeningPopover}
				handleMicListenPopoverCancelClick={handleMicListenPopoverCancelClick}
				setIsMouseInsideMicListeningPopover={setIsMouseInsideMicListeningPopover}
				isMicListening={isMicListening}
				handleMicListenPopoverClick={handleMicListenPopoverClick}
			/>
			<PopOvers
				moreIconActive={moreIconActive}
				moreIconHover={moreIconHover}
				userLocation={userLocation}
				micIconHover={micIconHover}
				themeMode={themeMode}
				setIsMouseOutsideMoreIconActive={setIsMouseOutsideMoreIconActive}
				setThemeMode={setThemeMode}
				searchIconHover={searchIconHover}
				videoMoreIconPos={videoMoreIconPos}
				videoMoreIconActive={videoMoreIconActive}
				videoMoreIconPopOver={videoMoreIconPopOver}
			/>
			<div className="visible">
				<Header
					setMoreIconActive={setMoreIconActive}
					videoMoreIconActive={videoMoreIconActive}
					handlePopoverDisable={handlePopoverDisable}
					userLocation={userLocation}
					moreIconActive={moreIconActive}
					themeMode={themeMode}
					setSidebarBurgerMenuClick={setSidebarBurgerMenuClick}
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
					<Sidebar
						moreIconActive={moreIconActive}
						videoMoreIconActive={videoMoreIconActive}
						themeMode={themeMode}
						sidebarBurgerMenuClick={sidebarBurgerMenuClick}
					/>
					<HomeSection
						sidebarBurgerMenuClick={sidebarBurgerMenuClick}
						userLocation={userLocation}
						setUserLocation={setUserLocation}
						handleVideoMoreIconClick={handleVideoMoreIconClick}
						videoMoreIconActive={videoMoreIconActive}
						isMouseOutsideMoreIconActive={isMouseOutsideMoreIconActive}
						moreIconActive={moreIconActive}
						leftScrollVideoCategory={leftScrollVideoCategory}
						themeMode={themeMode}
						rightScrollVideoCategory={rightScrollVideoCategory}
						videoMoreIconClickId={videoMoreIconClickId}
						handleVideoMouseEnter={handleVideoMouseEnter}
					/>
				</div>
			</div>
			<BottomNavbar themeMode={themeMode} />
		</div>
	);
}
