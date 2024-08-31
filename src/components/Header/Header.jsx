import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import youtubeLogoDark from "../../assets/images/yt_logo_rgb_dark.png";
import { useRef, useState } from "react";
import "./HeaderStyle.css";
import { BurgerMenu } from "./BurgerMenu";
import { SearchInput } from "./SearchInput";
import { SearchAndMicButton } from "./SearchAndMicButton";
import { MoreAndLoginButton } from "./MoreAndLoginButton";
// import PropTypes from "prop-types";

export const Header = ({
	setMoreIconActive,
	handlePopoverDisable,
	moreIconActive,
	setSidebarBurgerMenuClick,
	themeMode,
	handleHeaderTooltipMouseEnter,
	handleHeaderTooltipMouseLeave,
	handleMicListenClick,
	videoMoreIconActive,
	burgerIcon,
}) => {
	const [searchText, setSearchText] = useState("");
	const moreIcon = useRef();
	const searchBox = useRef();

	const handleSearch = (e) => {
		setSearchText(e.currentTarget.value);
	};

	const handleClearSearch = () => {
		setSearchText("");
		searchBox.current.focus();
	};

	const handleMoreIconClick = () => {
		setMoreIconActive((prevState) => !prevState);
	};

	const handleSidebarBurgerMenuClick = () => {
		setSidebarBurgerMenuClick((prevState) => !prevState);
	};

	return (
		<div
			className={`w-[100%] h-[56px] flex items-center fixed top-0 justify-between pr-[18px] pl-[16px] z-[1000] ${
				themeMode === "systemDark" || themeMode === "dark"
					? "bg-[#0f0f0f]"
					: "bg-[#ffffff]"
			}`}
			onClick={
				moreIconActive || videoMoreIconActive ? handlePopoverDisable : ""
			}
		>
			<div className="w-full flex justify-between">
				<div className="flex items-center">
					<BurgerMenu
						handleSidebarBurgerMenuClick={handleSidebarBurgerMenuClick}
						themeMode={themeMode}
						burgerIcon={burgerIcon}
					/>
					<div
						title="YouTube Home"
						className="flex items-center ml-[14px] cursor-pointer"
					>
						<img
							src={
								themeMode === "systemDark" || themeMode === "dark"
									? youtubeLogoDark
									: youtubeLogo
							}
							width={90}
							height={20}
							alt="youtube logo"
							className=""
						/>
					</div>
				</div>
				<div className="w-[53%] flex mt-[1px]">
					<SearchInput
						handleSearch={handleSearch}
						searchText={searchText}
						searchBox={searchBox}
						themeMode={themeMode}
						handleClearSearch={handleClearSearch}
					/>
					<SearchAndMicButton
						themeMode={themeMode}
						handleHeaderTooltipMouseEnter={handleHeaderTooltipMouseEnter}
						handleHeaderTooltipMouseLeave={handleHeaderTooltipMouseLeave}
						handleMicListenClick={handleMicListenClick}
					/>
				</div>
				<div className="flex items-center">
					<MoreAndLoginButton
						themeMode={themeMode}
						handleMoreIconClick={handleMoreIconClick}
						handleHeaderTooltipMouseEnter={handleHeaderTooltipMouseEnter}
						handleHeaderTooltipMouseLeave={handleHeaderTooltipMouseLeave}
						moreIcon={moreIcon}
					/>
				</div>
			</div>
		</div>
	);
};

// Header.propTypes = {
// 	setMoreIconActive: PropTypes.,
// };
