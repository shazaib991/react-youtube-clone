import {useEffect} from "react";
import {ThemeSettings} from "./ThemeSettings";
import {PopOversTopHalf} from "./PopOversTopHalf";
import {PopOversBottomHalf} from "./PopOversBottomHalf";
import {VideoMoreIconPopOver} from "./VideoMoreIconPopOver";
import {useDispatch, useSelector} from "react-redux";
import {changeIsMouseOutsideMoreIconActive} from "../../states/States2";
import {changeWindowSize} from "../../states/States4";

export const PopOvers = () => {
	const dispatch = useDispatch();

	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const moreIconHover = useSelector((state) => state.states3.value.moreIconHover);
	const micIconHover = useSelector((state) => state.states3.value.micIconHover);
	const searchIconHover = useSelector((state) => state.states3.value.searchIconHover);
	const navigateToThemeOptions = useSelector((state) => state.states4.value.navigateToThemeOptions);

	const windowResize = () => {
		dispatch(changeWindowSize(window.innerHeight));
	};

	useEffect(() => {
		dispatch(changeWindowSize(window.innerHeight));
	}, []);

	window.onresize = windowResize;

	return (
		<>
			<div
				className={`w-[300px] rounded-[12px] fixed pt-[8px] pb-[10px] top-[48px] right-[125px] visible ${
					themeMode === "systemDark" || themeMode === "dark"
						? "bg-[#282828]"
						: "bg-[#ffffff] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)]"
				} z-[1200] ${moreIconActive ? "" : "hidden"}`}
				onMouseLeave={() => dispatch(changeIsMouseOutsideMoreIconActive(true))}
			>
				{navigateToThemeOptions ? (
					<ThemeSettings />
				) : (
					<>
						<PopOversTopHalf />
						<PopOversBottomHalf />
					</>
				)}
			</div>
			<VideoMoreIconPopOver />
			<div
				className={`fixed top-[64px] right-[398px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
					searchIconHover ? "opacity-100" : "opacity-0"
				} ${searchIconHover ? "visible" : "invisible"} transition-all z-[1000] cursor-default`}
			>
				Search
			</div>
			<div
				className={`fixed top-[64px] right-[290px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
					micIconHover ? "opacity-100" : "opacity-0"
				} ${micIconHover ? "visible" : "invisible"} transition-all z-[1000] cursor-default`}
			>
				Search with your voice
			</div>
			<div
				className={`fixed top-[64px] right-[115px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
					moreIconHover ? "opacity-100" : "opacity-0"
				} ${moreIconHover ? "visible" : "invisible"} transition-all z-[1000] cursor-default`}
			>
				Settings
			</div>
		</>
	);
};
