import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import youtubeLogoDark from "../../assets/images/yt_logo_rgb_dark.png";
import {useEffect, useRef, useState} from "react";
import "./HeaderStyle.css";
import {BurgerMenu} from "./BurgerMenu";
import {SearchInput} from "./SearchInput";
import {SearchAndMicButton} from "./SearchAndMicButton";
import {MoreAndLoginButton} from "./MoreAndLoginButton";
import PropTypes from "prop-types";
import {Search} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {changeTheme} from "../../states/States1";
import {changeMoreIconActive} from "../../states/States1";
import {changeSidebarBurgerMenuClick} from "../../states/States1";
import {useSelector} from "react-redux";
import {useContext} from "react";
import {UseContext} from "../../App.jsx";

export const Header = () => {
	const dispatch = useDispatch();
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const userLocation = useSelector((state) => state.states.value.userLocation);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const sidebarBurgerMenuClick = useSelector((state) => state.states.value.sidebarBurgerMenuClick);
	const [searchText, setSearchText] = useState("");
	const {handlePopoverDisable} = useContext(UseContext);
	const {burgerIcon} = useContext(UseContext);
	const {handleHeaderTooltipMouseEnter} = useContext(UseContext);
	const {handleHeaderTooltipMouseLeave} = useContext(UseContext);
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
		dispatch(changeMoreIconActive(!moreIconActive));
	};

	const handleSidebarBurgerMenuClick = () => {
		dispatch(changeSidebarBurgerMenuClick(!sidebarBurgerMenuClick));
	};

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			dispatch(changeTheme("systemDark"));
			return;
		}
		dispatch(changeTheme("systemLight"));
	}, []);

	return (
		<div
			className={`w-[100%] h-[56px] flex items-center fixed top-0 justify-between pr-[18px] pl-[16px] z-[1000] ${
				themeMode === "systemDark" || themeMode === "dark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
			} max-md:pr-0 max-md:pl-0`}
			onClick={moreIconActive || videoMoreIconActive ? handlePopoverDisable : ""}
		>
			<div className="w-full flex justify-between">
				<div className="flex items-center">
					<BurgerMenu handleSidebarBurgerMenuClick={handleSidebarBurgerMenuClick} burgerIcon={burgerIcon} />
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
						handleClearSearch={handleClearSearch}
					/>
					<SearchAndMicButton
						handleHeaderTooltipMouseEnter={handleHeaderTooltipMouseEnter}
						handleHeaderTooltipMouseLeave={handleHeaderTooltipMouseLeave}
					/>
				</div>
				<div className="flex items-center max-md:hidden">
					<MoreAndLoginButton
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
	handleHeaderTooltipMouseEnter: PropTypes.func,
	handleHeaderTooltipMouseLeave: PropTypes.func,
	burgerIcon: PropTypes.object,
};
