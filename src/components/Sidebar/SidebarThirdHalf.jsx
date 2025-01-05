import {Gear} from "react-bootstrap-icons";
import {Flag} from "react-bootstrap-icons";
import {QuestionCircle} from "react-bootstrap-icons";
import {useSelector} from "react-redux";
import {SendExclamation} from "react-bootstrap-icons";

export const SidebarThirdHalf = () => {
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const sidebarBurgerMenuClick = useSelector((state) => state.states.value.sidebarBurgerMenuClick);

	return (
		<>
			<hr
				className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""} mt-[14px] mb-[13px]`}
			/>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Settings"
			>
				<Gear
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Settings
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Report history"
			>
				<Flag
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Report history
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Help"
			>
				<QuestionCircle
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Help
				</p>
			</a>
			<a
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#272727]" : "hover:bg-[#f2f2f2]"
				} mx-[11px] py-[9.3px] rounded-[9px]`}
				href="#"
				title="Send feedback"
			>
				<SendExclamation
					className={`${sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[15px]"}`}
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[14px] ml-[26px]`}
				>
					Send feedback
				</p>
			</a>
			<hr
				className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""} mt-[14px] mb-[13px]`}
			/>
		</>
	);
};
