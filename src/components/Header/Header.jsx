import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import youtubeLogoDark from "../../assets/images/yt_logo_rgb_dark.png";
import {useEffect} from "react";
import "./HeaderStyle.css";
import {BurgerMenu} from "./BurgerMenu";
import {SearchInput} from "./SearchInput";
import {SearchAndMicButton} from "./SearchAndMicButton";
import {MoreAndLoginButton} from "./MoreAndLoginButton";
import {Search} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {changeTheme} from "../../states/States1";
import {useSelector} from "react-redux";
import {useContext} from "react";
import {UseContext} from "../../App.jsx";

export const Header = () => {
	const dispatch = useDispatch();
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const userLocation = useSelector((state) => state.states.value.userLocation);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const {handlePopoverDisable} = useContext(UseContext);

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
					<BurgerMenu />
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
					<SearchInput />
					<SearchAndMicButton />
				</div>
				<div className="flex items-center max-md:hidden">
					<MoreAndLoginButton />
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
