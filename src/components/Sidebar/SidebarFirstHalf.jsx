/* eslint-disable no-mixed-spaces-and-tabs */
import {HouseDoor} from "react-bootstrap-icons";
import {HouseDoorFill} from "react-bootstrap-icons";
import {Play} from "react-bootstrap-icons";
import {PlayFill} from "react-bootstrap-icons";
import {CollectionPlay} from "react-bootstrap-icons";
import {CollectionPlayFill} from "react-bootstrap-icons";
import {Clock} from "react-bootstrap-icons";
import {ClockFill} from "react-bootstrap-icons";
import {useSelector} from "react-redux";

export const SidebarFirstHalf = () => {
	const sidebarBurgerMenuClick = useSelector((state) => state.states.value.sidebarBurgerMenuClick);
	const themeMode = useSelector((state) => state.states.value.themeMode);

	return (
		<>
			<a className={`block ${sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"}`} href="/" title="Home">
				<div
					className={`${sidebarBurgerMenuClick ? "flex-col" : "flex"} items-center ${
						sidebarBurgerMenuClick
							? ""
							: themeMode === "dark" || themeMode === "systemDark"
							? "bg-[#272727]"
							: "bg-[#f2f2f2]"
					} ${
						sidebarBurgerMenuClick
							? `${
									themeMode === "dark" || themeMode === "systemDark"
										? "hover:bg-[#272727]"
										: "hover:bg-[#f2f2f2]"
							  }`
							: `${
									themeMode === "dark" || themeMode === "systemDark"
										? "hover:bg-[#3d3d3d]"
										: "hover:bg-[#e6e6e6]"
							  }`
					} rounded-[9px] ${sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"} ${
						sidebarBurgerMenuClick ? "pt-[18px]" : ""
					}`}
				>
					<HouseDoorFill
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<HouseDoor
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"} hidden`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"} ${
							sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
						} ${sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"} ${
							sidebarBurgerMenuClick ? "mt-[7px]" : ""
						} font-medium`}
					>
						Home
					</p>
				</div>
			</a>
			<a className={`block ${sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"} mb-[1px]`} href="/" title="Shorts">
				<div
					className={`${sidebarBurgerMenuClick ? "flex-col" : "flex"} items-center ${
						themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
					} rounded-[9px] ${sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"} ${
						sidebarBurgerMenuClick ? "pt-[18px]" : ""
					}`}
				>
					<Play
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<PlayFill
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"} hidden`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"} ${
							sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
						} ${sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
					>
						Shorts
					</p>
				</div>
			</a>
			<a className={`block ${sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"}`} href="#" title="Subscriptions">
				<div
					className={`${sidebarBurgerMenuClick ? "flex-col" : "flex"} items-center ${
						themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
					} rounded-[9px] ${sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"} ${
						sidebarBurgerMenuClick ? "pt-[18px]" : ""
					}`}
				>
					<CollectionPlay
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<CollectionPlayFill
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"} hidden`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"} ${
							sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
						} ${sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
					>
						Subscriptions
					</p>
				</div>
			</a>
			<hr
				className={`${sidebarBurgerMenuClick ? "hidden" : ""} ${
					themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""
				} mt-[12px] mb-[12px]`}
			/>
			<a className={`block ${sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"}`} href="#" title="You">
				<div
					className={`${sidebarBurgerMenuClick ? "flex-col" : "flex"} items-center ${
						themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
					} rounded-[9px] ${sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"} ${
						sidebarBurgerMenuClick ? "pt-[18px]" : ""
					}`}
				>
					<CollectionPlay
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<CollectionPlayFill
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"} hidden`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"} ${
							sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
						} ${sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
					>
						You
					</p>
				</div>
			</a>
			<a className={`block ${sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"}`} href="#" title="History">
				<div
					className={`${sidebarBurgerMenuClick ? "flex-col" : "flex"} items-center ${
						themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
					} rounded-[9px] ${sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"} ${
						sidebarBurgerMenuClick ? "pt-[18px]" : ""
					}`}
				>
					<Clock
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<ClockFill
						className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"} hidden`}
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"} ${
							sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
						} ${sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
					>
						History
					</p>
				</div>
			</a>
		</>
	);
};
