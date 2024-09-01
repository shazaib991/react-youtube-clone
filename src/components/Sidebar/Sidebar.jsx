import {useCallback, useEffect, useRef} from "react";
import "./Sidebar.css";
import {SidebarFirstHalf} from "./SidebarFirstHalf";
import {SidebarSecondHalf} from "./SidebarSecondHalf";
import {SidebarThirdHalf} from "./SidebarThirdHalf";
import {SiteLinks} from "./SiteLinks";

export const Sidebar = ({moreIconActive, sidebarBurgerMenuClick, videoMoreIconActive, themeMode}) => {
	const disableScroll = useRef();

	let handleEvent = useCallback((e) => {
		e.preventDefault();
	}, []);

	useEffect(() => {
		if ((moreIconActive, videoMoreIconActive.status)) {
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
			className={`${
				sidebarBurgerMenuClick ? "w-[70px]" : "w-[240px]"
			} h-[100vh] fixed overflow-y-auto invisible hover:visible overscroll-contain scroll-smooth z-[1200] ${
				themeMode === "dark" || themeMode === "systemDark" ? "sidebarDark" : "sidebar"
			}`}
			ref={disableScroll}
		>
			<div className={`visible ${sidebarBurgerMenuClick ? "pt-[4px]" : "pt-[12px]"} mb-[70px]`}>
				<SidebarFirstHalf sidebarBurgerMenuClick={sidebarBurgerMenuClick} themeMode={themeMode} />
				<div className={`${sidebarBurgerMenuClick ? "hidden" : ""}`}>
					<SidebarSecondHalf themeMode={themeMode} sidebarBurgerMenuClick={sidebarBurgerMenuClick} />
					<SidebarThirdHalf themeMode={themeMode} sidebarBurgerMenuClick={sidebarBurgerMenuClick} />
					<SiteLinks />
				</div>
			</div>
		</div>
	);
};
