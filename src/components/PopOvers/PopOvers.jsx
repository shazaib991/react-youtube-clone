import { useEffect, useState } from "react";
import { ThemeSettings } from "./ThemeSettings";
import { PopOversTopHalf } from "./PopOversTopHalf";
import { PopOversBottomHalf } from "./PopOversBottomHalf";
import { VideoMoreIconPopOver } from "./VideoMoreIconPopOver";

export const PopOvers = ({
	moreIconActive,
	moreIconHover,
	micIconHover,
	searchIconHover,
	themeMode,
	setIsMouseOutsideMoreIconActive,
	setThemeMode,
	videoMoreIconPos,
	videoMoreIconActive,
	videoMoreIconPopOver,
}) => {
	const [windowSize, setWindowSize] = useState(0);
	const [navigateToThemeOptions, setNavigateToThemeOptions] = useState(false);

	const windowResize = () => {
		setWindowSize(window.innerHeight);
	};

	useEffect(() => {
		setWindowSize(window.innerHeight);
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
				onMouseLeave={() => setIsMouseOutsideMoreIconActive(true)}
			>
				{navigateToThemeOptions ? (
					<ThemeSettings
						themeMode={themeMode}
						setNavigateToThemeOptions={setNavigateToThemeOptions}
						setThemeMode={setThemeMode}
						setIsMouseOutsideMoreIconActive={
							setIsMouseOutsideMoreIconActive
						}
					/>
				) : (
					<>
						<PopOversTopHalf
							themeMode={themeMode}
							setNavigateToThemeOptions={setNavigateToThemeOptions}
						/>
						<PopOversBottomHalf themeMode={themeMode} />
					</>
				)}
			</div>
			<VideoMoreIconPopOver
				themeMode={themeMode}
				videoMoreIconActive={videoMoreIconActive}
				videoMoreIconPopOver={videoMoreIconPopOver}
				videoMoreIconPos={videoMoreIconPos}
				windowSize={windowSize}
			/>
			<div
				className={`fixed top-[64px] right-[398px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
					searchIconHover ? "opacity-100" : "opacity-0"
				} ${
					searchIconHover ? "visible" : "invisible"
				} transition-all z-[1000] cursor-default`}
			>
				Search
			</div>
			<div
				className={`fixed top-[64px] right-[290px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
					micIconHover ? "opacity-100" : "opacity-0"
				} ${
					micIconHover ? "visible" : "invisible"
				} transition-all z-[1000] cursor-default`}
			>
				Search with your voice
			</div>
			<div
				className={`fixed top-[64px] right-[115px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
					moreIconHover ? "opacity-100" : "opacity-0"
				} ${
					moreIconHover ? "visible" : "invisible"
				} transition-all z-[1000] cursor-default`}
			>
				Settings
			</div>
		</>
	);
};
