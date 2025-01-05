import {useCallback, useContext, useEffect, useRef} from "react";
import {Header} from "../components/Header/Header";
import {HomeSection} from "../components/HomeSection/HomeSection";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {PopOvers} from "../components/PopOvers/PopOvers";
import "../index.css";
import {MicListenPopover} from "../components/PopOvers/MicListenPopover";
import {BottomNavbar} from "../components/bottomNavbar/BottomNavbar";
import {useSelector} from "react-redux";
import {UseContext} from "../App.jsx";

export const Home = () => {
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const disableScroll = useRef();
	const {handlePopoverDisable} = useContext(UseContext);
	const {leftScrollVideoCategory} = useContext(UseContext);
	const {rightScrollVideoCategory} = useContext(UseContext);
	const {burgerIcon} = useContext(UseContext);

	let handleEvent = useCallback((e) => {
		e.preventDefault();
	}, []);

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
			<MicListenPopover />
			<PopOvers />
			<div className="visible">
				<Header />
				<div
					className={`w-full flex pt-[56px] ${
						themeMode === "dark" || themeMode === "systemDark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
					}`}
					onClick={handlePopoverDisable}
				>
					<Sidebar />
					<HomeSection />
				</div>
				<BottomNavbar />
			</div>
		</div>
	);
};
