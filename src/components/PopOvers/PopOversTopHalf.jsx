import {PersonVcard} from "react-bootstrap-icons";
import {Moon} from "react-bootstrap-icons";
import {Translate} from "react-bootstrap-icons";
import {ShieldLock} from "react-bootstrap-icons";
import {ChevronRight} from "react-bootstrap-icons";
import PropTypes from "prop-types";

export const PopOversTopHalf = ({themeMode, setNavigateToThemeOptions}) => {
	return (
		<>
			<div
				className={`flex items-center pl-[18px] ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#3e3e3e]" : "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<PersonVcard size={20} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					}`}
				>
					Your data in YouTube
				</p>
			</div>
			<div
				className={`flex items-center justify-between pl-[18px] pr-[20px] ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#3e3e3e]" : "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
				onClick={() => setNavigateToThemeOptions(true)}
			>
				<div className="flex items-center">
					<Moon size={20} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
					<p
						className={`ml-[18px] text-[14px] ${
							themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
						}`}
					>
						Appearance:{" "}
						{themeMode === "systemDark" || themeMode === "systemLight"
							? "Device theme"
							: themeMode === "light"
							? "Light"
							: themeMode === "dark"
							? "Dark"
							: ""}
					</p>
				</div>
				<ChevronRight size={16} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
			</div>
			<div
				className={`flex items-center justify-between pl-[18px] pr-[20px] ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#3e3e3e]" : "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<div className="flex items-center">
					<Translate
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`ml-[18px] text-[14px] ${
							themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
						}`}
					>
						Language: English
					</p>
				</div>
				<ChevronRight size={16} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
			</div>
			<div
				className={`flex items-center justify-between pl-[18px] pr-[20px] ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#3e3e3e]" : "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<div className="flex items-center">
					<ShieldLock
						size={20}
						color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
					/>
					<p
						className={`ml-[18px] text-[14px] ${
							themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
						}`}
					>
						Restricted Mode: Off
					</p>
				</div>
				<ChevronRight size={16} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
			</div>
		</>
	);
};

PopOversTopHalf.propTypes = {
	themeMode: PropTypes.string,
	setNavigateToThemeOptions: PropTypes.func,
};
