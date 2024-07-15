import { HouseDoor } from "react-bootstrap-icons";
import { HouseDoorFill } from "react-bootstrap-icons";
import { Play } from "react-bootstrap-icons";
import { PlayFill } from "react-bootstrap-icons";
import { CollectionPlay } from "react-bootstrap-icons";
import { CollectionPlayFill } from "react-bootstrap-icons";
import { Clock } from "react-bootstrap-icons";
import { ClockFill } from "react-bootstrap-icons";
import { PersonCircle } from "react-bootstrap-icons";
import { BarChart } from "react-bootstrap-icons";
import { MusicNote } from "react-bootstrap-icons";
import { Controller } from "react-bootstrap-icons";
import { Newspaper } from "react-bootstrap-icons";
import { Trophy } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { Gear } from "react-bootstrap-icons";
import { Flag } from "react-bootstrap-icons";
import { QuestionCircle } from "react-bootstrap-icons";
import { SendExclamation } from "react-bootstrap-icons";
import { useCallback, useEffect, useRef } from "react";

export const Sidebar = ({
	moreIconActive,
	sidebarBurgerMenuClick,
	videoMoreIconActive,
	themeMode,
}) => {
	const date = new Date();
	const disableScroll = useRef();

	let handleEvent = useCallback((e) => {
		e.preventDefault();
	}, []);

	useEffect(() => {
		if ((moreIconActive, videoMoreIconActive.staus)) {
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
			//TODO: fix hover on scroll should be visible
			className={`${
				sidebarBurgerMenuClick ? "w-[70px]" : "w-[240px]"
			} h-[100vh] fixed overflow-y-auto invisible hover:visible overscroll-contain scroll-smooth z-[1200]`}
			ref={disableScroll}
		>
			<div
				className={`visible ${
					sidebarBurgerMenuClick ? "pt-[4px]" : "pt-[12px]"
				} mb-[70px]`}
			>
				<a
					className={`block ${
						sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
					}`}
					href="/"
					title="Home"
				>
					<div
						className={`${
							sidebarBurgerMenuClick ? "flex-col" : "flex"
						} items-center ${
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
						} rounded-[9px] ${
							sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"
						} ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
					>
						<HouseDoorFill
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<HouseDoor
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							} hidden`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} ${
								sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
							} ${
								sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"
							} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""} font-medium`}
						>
							Home
						</p>
					</div>
				</a>
				<a
					className={`block ${
						sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
					} mb-[1px]`}
					href="/"
					title="Shorts"
				>
					<div
						className={`${
							sidebarBurgerMenuClick ? "flex-col" : "flex"
						} items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} rounded-[9px] ${
							sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"
						} ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
					>
						<Play
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<PlayFill
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							} hidden`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} ${
								sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
							} ${
								sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"
							} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
						>
							Shorts
						</p>
					</div>
				</a>
				<a
					className={`block ${
						sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
					}`}
					href="/"
					title="Subscriptions"
				>
					<div
						className={`${
							sidebarBurgerMenuClick ? "flex-col" : "flex"
						} items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} rounded-[9px] ${
							sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"
						} ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
					>
						<CollectionPlay
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<CollectionPlayFill
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							} hidden`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} ${
								sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
							} ${
								sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"
							} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
						>
							Subscriptions
						</p>
					</div>
				</a>
				<hr
					className={`${sidebarBurgerMenuClick ? "hidden" : ""} ${
						themeMode === "dark" || themeMode === "systemDark"
							? "border-[#4d4d4d]"
							: ""
					} mt-[12px] mb-[12px]`}
				/>
				<a
					className={`block ${
						sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
					}`}
					href="/"
					title="You"
				>
					<div
						className={`${
							sidebarBurgerMenuClick ? "flex-col" : "flex"
						} items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} rounded-[9px] ${
							sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"
						} ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
					>
						<CollectionPlay
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<CollectionPlayFill
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							} hidden`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} ${
								sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
							} ${
								sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"
							} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
						>
							You
						</p>
					</div>
				</a>
				<a
					className={`block ${
						sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
					}`}
					href="/"
					title="History"
				>
					<div
						className={`${
							sidebarBurgerMenuClick ? "flex-col" : "flex"
						} items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} rounded-[9px] ${
							sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9.3px]"
						} ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
					>
						<Clock
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<ClockFill
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							} hidden`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} ${
								sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
							} ${
								sidebarBurgerMenuClick ? "text-center" : "ml-[26px]"
							} ${sidebarBurgerMenuClick ? "mt-[7px]" : ""}`}
						>
							History
						</p>
					</div>
				</a>
				<div className={`${sidebarBurgerMenuClick ? "hidden" : ""}`}>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						} mt-[13px] mb-[15px]`}
					/>
					<p
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "text-[#ffffff]"
								: "text-[#000000]"
						} ml-[34px] text-[14px] mb-[12px]`}
					>
						Sign in to like videos, comment and subscribe.
					</p>
					<div
						className={`h-[35px] w-[99px] flex items-center border ml-[34px] pl-[10px] pr-[15px] rounded-[40px] cursor-pointer ${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d] hover:bg-[#263850]"
								: "hover:bg-[#def1ff]"
						} transition-[background,border] duration-0`}
					>
						<div>
							<PersonCircle
								className="mr-[8px]"
								size={21}
								color="#5e5eff"
							/>
						</div>
						<p className="text-[14px] font-[500] text-[#5e5eff]">
							Sign in
						</p>
					</div>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						} mt-[16px] mb-[17px]`}
					/>
					<p
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "text-[#ffffff]"
								: "text-[#000000]"
						} ml-[25px] font-[500] mb-[3px]`}
					>
						Explore
					</p>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Trending"
					>
						<BarChart
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Trending
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Music"
					>
						<MusicNote
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Music
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Gaming"
					>
						<Controller
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Gaming
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="News"
					>
						<Newspaper
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							News
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Sports"
					>
						<Trophy
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Sports
						</p>
					</a>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						} mt-[14px] mb-[13px]`}
					/>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Browse channels"
					>
						<PlusCircle
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Browse channels
						</p>
					</a>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						} mt-[14px] mb-[13px]`}
					/>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Settings"
					>
						<Gear
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Settings
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Report history"
					>
						<Flag
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Report history
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Help"
					>
						<QuestionCircle
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Help
						</p>
					</a>
					<a
						className={`flex items-center ${
							themeMode === "dark" || themeMode === "systemDark"
								? "hover:bg-[#272727]"
								: "hover:bg-[#f2f2f2]"
						} mx-[11px] py-[9.3px] rounded-[9px]`}
						href="/"
						title="Send feedback"
					>
						<SendExclamation
							className={`${
								sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"
							}`}
							size={20}
							color={`${
								themeMode === "systemDark" || themeMode === "dark"
									? "#ffffff"
									: "#000000"
							}`}
						/>
						<p
							className={`${
								themeMode === "dark" || themeMode === "systemDark"
									? "text-[#ffffff]"
									: "text-[#000000]"
							} text-[14px] ml-[26px]`}
						>
							Send feedback
						</p>
					</a>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						} mt-[14px] mb-[13px]`}
					/>
					<div className="mx-[26px] leading-[18px]">
						<a
							href="#"
							className="text-[13px] text-[#606060] inline-block font-medium"
						>
							About
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
						>
							Press
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
						>
							Copyright
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] inline-block font-medium"
						>
							Contact us
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
						>
							Creators
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] inline-block font-medium"
						>
							Advertise
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
						>
							Developers
						</a>
					</div>
					<div className="ml-[26px] mt-[8px] leading-[18px]">
						<a
							href="#"
							className="text-[13px] text-[#606060] inline-block font-medium"
						>
							Terms
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
						>
							Privacy
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
						>
							Policy & safety
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] inline-block font-medium"
						>
							How YouTube works
						</a>
						<a
							href="#"
							className="text-[13px] text-[#606060] inline-block font-medium"
						>
							Test new Features
						</a>
						<p className="text-[12px] text-[#93929E] mt-[15px]">
							&copy; {date.getFullYear()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
