import { ArrowLeftShort } from "react-bootstrap-icons";
import { Check2 } from "react-bootstrap-icons";

export const ThemeSettings = ({
	themeMode,
	setNavigateToThemeOptions,
	setThemeMode,
	setIsMouseOutsideMoreIconActive,
}) => {
	return (
		<div>
			<div className="flex ml-[7px] items-center">
				<ArrowLeftShort
					size={32}
					className="cursor-pointer"
					onClick={() => setNavigateToThemeOptions(false)}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[10px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Appearance
				</p>
			</div>
			<hr
				className={`mt-[8px] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "border-[#4d4d4d]"
						: ""
				}`}
			/>
			<p
				className={`ml-[16px] mt-[19px] text-[12px] text-[#646464e6] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "text-[#ffffff]"
						: "text-[#000000]"
				}`}
			>
				Setting applies to this browser only
			</p>
			<div
				className={`flex pl-[14px] mt-[10px] py-[7px] items-center ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} cursor-pointer`}
				onClick={() => {
					setThemeMode("systemDark");
					setIsMouseOutsideMoreIconActive(false);
				}}
			>
				<Check2
					size={25}
					className={
						themeMode === "dark" || themeMode === "light"
							? "invisible"
							: ""
					}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[17px] text-[15px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Use device theme
				</p>
			</div>
			<div
				className={`flex pl-[14px] py-[7px] items-center ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} cursor-pointer`}
				onClick={() => {
					setThemeMode("dark");
					setIsMouseOutsideMoreIconActive(false);
				}}
			>
				<Check2
					size={25}
					className={
						themeMode === "systemDark" ||
						themeMode === "systemLight" ||
						themeMode === "light"
							? "invisible"
							: ""
					}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[17px] text-[15px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Dark theme
				</p>
			</div>
			<div
				className={`flex pl-[14px] py-[7px] items-center ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} cursor-pointer`}
				onClick={() => {
					setThemeMode("light");
					setIsMouseOutsideMoreIconActive(false);
				}}
			>
				<Check2
					size={25}
					className={
						themeMode === "systemDark" ||
						themeMode === "systemLight" ||
						themeMode === "dark"
							? "invisible"
							: ""
					}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[17px] text-[15px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Light theme
				</p>
			</div>
		</div>
	);
};
