import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import youtubeLogoDark from "../../assets/images/yt_logo_rgb_dark.png";
import { Search } from "react-bootstrap-icons";
import { XLg } from "react-bootstrap-icons";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { PersonCircle } from "react-bootstrap-icons";
import { MicFill } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import "./HeaderStyle.css";

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
					<div
						className="burgerMenuIcon mr-[2px]"
						onClick={handleSidebarBurgerMenuClick}
						onMouseLeave={(e) => {
							if (themeMode === "systemDark" || themeMode === "dark") {
								e.currentTarget.classList.remove(
									"burgerMenuTransitionActiveDark"
								);
							} else {
								e.currentTarget.classList.remove(
									"burgerMenuTransitionActive"
								);
							}

							if (
								e.currentTarget.classList.contains(
									"burgerMenuIconMouseDown"
								)
							) {
								if (
									themeMode === "systemDark" ||
									themeMode === "dark"
								) {
									e.currentTarget.classList.add(
										"burgerMenuIconHoverDark"
									);
									e.currentTarget.classList.remove(
										"burgerMenuIconActiveDark"
									);
									e.currentTarget.classList.add(
										"burgerMenuIconActive2Dark"
									);
									return;
								}
								e.currentTarget.classList.add("burgerMenuIconHover");
								e.currentTarget.classList.remove(
									"burgerMenuIconActive"
								);
								e.currentTarget.classList.add("burgerMenuIconActive2");
								return;
							}
							if (themeMode === "systemDark" || themeMode === "dark") {
								e.currentTarget.classList.remove(
									"burgerMenuIconHoverDark"
								);
								return;
							}
							e.currentTarget.classList.remove("burgerMenuIconHover");
						}}
						onMouseEnter={(e) => {
							if (
								e.currentTarget.classList.contains(
									"burgerMenuIconMouseDown"
								)
							) {
								if (
									themeMode === "systemDark" ||
									themeMode === "dark"
								) {
									e.currentTarget.classList.remove(
										"burgerMenuIconHoverDark"
									);
									e.currentTarget.classList.add(
										"burgerMenuIconActiveDark"
									);
									e.currentTarget.classList.remove(
										"burgerMenuIconActive2Dark"
									);
									return;
								}
								e.currentTarget.classList.remove("burgerMenuIconHover");
								e.currentTarget.classList.add("burgerMenuIconActive");
								e.currentTarget.classList.remove(
									"burgerMenuIconActive2"
								);
								return;
							}
							if (themeMode === "systemDark" || themeMode === "dark") {
								e.currentTarget.classList.add(
									"burgerMenuIconHoverDark"
								);
								return;
							}
							e.currentTarget.classList.add("burgerMenuIconHover");
						}}
						onMouseDown={(e) => {
							if (e.button === 0) {
								if (
									themeMode === "systemDark" ||
									themeMode === "dark"
								) {
									e.currentTarget.classList.add(
										"burgerMenuIconActiveDark"
									);
									e.currentTarget.classList.add(
										"burgerMenuIconMouseDown"
									);
									e.currentTarget.classList.remove(
										"burgerMenuIconHoverDark"
									);
									return;
								}
								e.currentTarget.classList.add("burgerMenuIconActive");
								e.currentTarget.classList.add(
									"burgerMenuIconMouseDown"
								);
								e.currentTarget.classList.remove("burgerMenuIconHover");
							}
							return;
						}}
						onMouseUp={(e) => {
							if (themeMode === "systemDark" || themeMode === "dark") {
								e.currentTarget.classList.remove(
									"burgerMenuIconActiveDark"
								);
								e.currentTarget.classList.add(
									"burgerMenuTransitionActiveDark"
								);
								e.currentTarget.classList.remove(
									"burgerMenuIconMouseDown"
								);
								return;
							}
							e.currentTarget.classList.remove("burgerMenuIconActive");
							e.currentTarget.classList.add(
								"burgerMenuTransitionActive"
							);
							e.currentTarget.classList.remove(
								"burgerMenuIconMouseDown"
							);
						}}
						ref={burgerIcon}
					>
						<div className="w-[18px] h-[13px] flex flex-col justify-between">
							<div
								className={`w-full h-[1px] ${
									themeMode === "systemDark" || themeMode === "dark"
										? "bg-[#ffffff]"
										: "bg-[#000000]"
								}`}
							></div>
							<div
								className={`w-full h-[1px] ${
									themeMode === "systemDark" || themeMode === "dark"
										? "bg-[#ffffff]"
										: "bg-[#000000]"
								}`}
							></div>
							<div
								className={`w-full h-[1px] ${
									themeMode === "systemDark" || themeMode === "dark"
										? "bg-[#ffffff]"
										: "bg-[#000000]"
								}`}
							></div>
						</div>
					</div>
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
					<div className="w-[567px] h-[40px] flex items-center justify-end relative">
						<input
							type="text"
							name="youtube-search"
							id="youtube-search"
							placeholder="Search"
							spellCheck="false"
							onChange={handleSearch}
							value={searchText}
							ref={searchBox}
							className={`w-[94.5%] h-full border ${
								themeMode === "systemDark" || themeMode === "dark"
									? "bg-[#121212] border-[#313131] text-[#ffffff]"
									: "bg-[#ffffff] border-[#00000033] text-[#000000]"
							} rounded-tl-[40px] border-r-0 rounded-bl-[40px] placeholder:text-[#888A88] outline-none pl-[17px] pr-[25px] focus:border-[#244abe] focus:border-r-[1px] focus:w-full peer focus:pl-[48.2px] shadow-[inset_0_1px_1px_rgba(50,50,50,0.1)] focus:shadow-[inset_0_1px_2px_rgba(50,50,50,0.4)]`}
						/>
						<Search
							className="absolute ml-[20px] left-0 hidden peer-focus:block"
							size={14}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<div
							className={`flex justify-center items-center h-[40px] w-[40px] ${
								themeMode === "systemDark" || themeMode === "dark"
									? "hover:bg-[#4e4e4e] active:border-[#606060] active:bg-[#606060]"
									: "hover:bg-black/10 active:border-[#00000026] active:bg-black/20"
							} rounded-[50%] absolute right-[-4px] cursor-pointer ${
								searchText.length > 0 ? "" : "hidden"
							}`}
							onClick={handleClearSearch}
						>
							<XLg
								size={20}
								color={`${
									themeMode === "systemDark" || themeMode === "dark"
										? "#ffffff"
										: "#000000"
								}`}
							/>
						</div>
					</div>
					<div
						className={`w-[63px] h-[40px] flex items-center ${
							themeMode === "systemDark" || themeMode === "dark"
								? "bg-[#222222] border-[#313131]"
								: "bg-[#f8f8f8] border-[#d6d6d6] hover:bg-[#0000000f] hover:border-[#0000002e] hover:shadow-[0_1px_1px_rgba(50,50,50,0.12)] active:bg-[#0000001a]"
						} border rounded-tr-[40px] mr-[2px] rounded-br-[40px] cursor-pointer`}
						onMouseEnter={() =>
							handleHeaderTooltipMouseEnter("searchIconTooltip")
						}
						onMouseLeave={() =>
							handleHeaderTooltipMouseLeave("searchIconTooltip")
						}
					>
						<Search
							className="ml-[22px]"
							size={18}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
					</div>
					<div
						className={`w-[40px] h-[40px] flex justify-center items-center ${
							themeMode === "systemDark" || themeMode === "dark"
								? "bg-[#272727] hover:bg-[#3d3d3d] active:border-[#272727] active:bg-[#515151]"
								: "bg-[#f2f2f2] hover:bg-black/10 active:border-[#00000026] active:bg-black/20"
						}  rounded-[50%] ml-[14px] cursor-pointer active:border-[1px]`}
						onMouseEnter={() =>
							handleHeaderTooltipMouseEnter("micIconTooltip")
						}
						onMouseLeave={() =>
							handleHeaderTooltipMouseLeave("micIconTooltip")
						}
						onClick={handleMicListenClick}
					>
						<MicFill
							size={18}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
					</div>
				</div>
				<div className="flex items-center">
					<div
						className={
							themeMode === "systemDark" || themeMode === "dark"
								? "headerMoreIconDark"
								: "headerMoreIcon"
						}
						onClick={handleMoreIconClick}
						onMouseEnter={() =>
							handleHeaderTooltipMouseEnter("moreIconTooltip")
						}
						onMouseLeave={() =>
							handleHeaderTooltipMouseLeave("moreIconTooltip")
						}
						ref={moreIcon}
					>
						<ThreeDotsVertical
							size={18}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
					</div>
					<div
						className={`h-[35px] flex items-center border pl-[10px] pr-[15px] rounded-[40px] cursor-pointer ${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d] hover:bg-[#263850]"
								: "hover:bg-[#def1ff]"
						}`}
					>
						<PersonCircle
							className="mr-[8px]"
							size={21}
							color="#5e5eff"
						/>
						<p className="text-[14px] font-[500] text-[#5e5eff]">
							Sign in
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
