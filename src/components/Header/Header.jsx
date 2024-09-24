import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import youtubeLogoDark from "../../assets/images/yt_logo_rgb_dark.png";
import {useRef, useState} from "react";
import "./HeaderStyle.css";
import {BurgerMenu} from "./BurgerMenu";
import {SearchInput} from "./SearchInput";
import {SearchAndMicButton} from "./SearchAndMicButton";
import {MoreAndLoginButton} from "./MoreAndLoginButton";
import PropTypes from "prop-types";
import {Search} from "react-bootstrap-icons";

export const Header = ({
	setMoreIconActive,
	handlePopoverDisable,
	moreIconActive,
	setSidebarBurgerMenuClick,
	themeMode,
	userLocation,
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
				themeMode === "systemDark" || themeMode === "dark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
			} max-md:pr-0 max-md:pl-0`}
			onClick={moreIconActive || videoMoreIconActive ? handlePopoverDisable : ""}
		>
			<div className="w-full flex justify-between">
				<div className="flex items-center">
					<BurgerMenu
						handleSidebarBurgerMenuClick={handleSidebarBurgerMenuClick}
						themeMode={themeMode}
						burgerIcon={burgerIcon}
					/>
					<div title="YouTube Home" className="flex items-center ml-[14px] cursor-pointer">
						<img
							src={themeMode === "systemDark" || themeMode === "dark" ? youtubeLogoDark : youtubeLogo}
							width={90}
							height={20}
							alt="youtube logo"
							className=""
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark" ? "text-white" : "text-black"
							} text-[10px] mb-[18px] ml-[5px]`}
						>
							{userLocation !== "" ? userLocation : ""}
						</p>
					</div>
				</div>
				<div className="w-[53%] flex mt-[1px] max-md:hidden">
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
				<div className="flex items-center max-md:hidden">
					<MoreAndLoginButton
						themeMode={themeMode}
						handleMoreIconClick={handleMoreIconClick}
						handleHeaderTooltipMouseEnter={handleHeaderTooltipMouseEnter}
						handleHeaderTooltipMouseLeave={handleHeaderTooltipMouseLeave}
						moreIcon={moreIcon}
					/>
				</div>
				<div className="hidden max-md:block max-md:mr-[15px] max-md:mt-[4px]">
					<Search
						className=""
						size={18}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	setMoreIconActive: PropTypes.func,
	userLocation: PropTypes.string,
	handlePopoverDisable: PropTypes.func,
	moreIconActive: PropTypes.bool,
	setSidebarBurgerMenuClick: PropTypes.func,
	themeMode: PropTypes.string,
	handleHeaderTooltipMouseEnter: PropTypes.func,
	handleHeaderTooltipMouseLeave: PropTypes.func,
	handleMicListenClick: PropTypes.func,
	videoMoreIconActive: PropTypes.object,
	burgerIcon: PropTypes.object,
};
