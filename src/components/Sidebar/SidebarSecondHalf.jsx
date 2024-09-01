import {PersonCircle} from "react-bootstrap-icons";
import {BarChart} from "react-bootstrap-icons";
import {MusicNote} from "react-bootstrap-icons";
import {Controller} from "react-bootstrap-icons";
import {Newspaper} from "react-bootstrap-icons";
import {Trophy} from "react-bootstrap-icons";
import {PlusCircle} from "react-bootstrap-icons";

export const SidebarSecondHalf = ({themeMode, sidebarBurgerMenuClick}) => {
	return (
		<>
			<hr
				className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""} mt-[13px] mb-[15px]`}
			/>
			<p
				className={`${
					themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
				} ml-[34px] mr-[5px] text-[14px] mb-[12px]`}
			>
				Sign in to like videos, comment and subscribe.
			</p>
			<div
				className={`h-[35px] w-[99px] flex items-center border ml-[34px] pl-[10px] pr-[15px] rounded-[40px] cursor-pointer ${
					themeMode === "dark" || themeMode === "systemDark"
						? "border-[#4d4d4d] hover:bg-[#263850]"
						: "hover:bg-[#def1ff]"
				}`}
			>
				<div>
					<PersonCircle className="mr-[8px]" size={21} color="#5e5eff" />
				</div>
				<p className="text-[14px] font-[500] text-[#5e5eff]">Sign in</p>
			</div>
			<hr
				className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""} mt-[16px] mb-[17px]`}
			/>
			<p
				className={`${
					themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
				} ml-[25px] font-[500] mb-[3px]`}
			>
				Explore
			</p>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Trending"
			>
				<BarChart
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Trending
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Music"
			>
				<MusicNote
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Music
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Gaming"
			>
				<Controller
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Gaming
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="News"
			>
				<Newspaper
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					News
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Sports"
			>
				<Trophy
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Sports
				</p>
			</a>
			<hr
				className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""} mt-[14px] mb-[13px]`}
			/>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Browse channels"
			>
				<PlusCircle
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Browse channels
				</p>
			</a>
		</>
	);
};
