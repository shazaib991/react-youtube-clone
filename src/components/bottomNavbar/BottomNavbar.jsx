import {Gear, GearFill, HouseDoor} from "react-bootstrap-icons";
import {HouseDoorFill} from "react-bootstrap-icons";
import {Play} from "react-bootstrap-icons";
import {PlayFill} from "react-bootstrap-icons";
import {useSelector} from "react-redux";

export const BottomNavbar = () => {
	const themeMode = useSelector((state) => state.states.value.themeMode);

	return (
		<div
			className={`fixed left-0 bottom-0 w-full h-[50px] ${
				themeMode === "dark" || themeMode === "systemDark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
			} z-[1000] justify-between items-center px-[10px] hidden max-md:flex`}
		>
			<div className="flex flex-col items-center">
				<HouseDoorFill
					className={``}
					size={25}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<HouseDoor
					className={`hidden`}
					size={25}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[12px]`}
				>
					home
				</p>
			</div>
			<div className="flex flex-col items-center">
				<Play
					className={``}
					size={25}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<PlayFill
					className={`hidden`}
					size={25}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[12px]`}
				>
					shorts
				</p>
			</div>
			<div className="flex flex-col items-center">
				<Gear
					className={``}
					size={25}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<GearFill
					className={`hidden`}
					size={25}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					} text-[12px]`}
				>
					settings
				</p>
			</div>
		</div>
	);
};
