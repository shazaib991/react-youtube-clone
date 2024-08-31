import { Globe } from "react-bootstrap-icons";
import { Keyboard } from "react-bootstrap-icons";
import { Gear } from "react-bootstrap-icons";
import { QuestionCircle } from "react-bootstrap-icons";
import { SendExclamation } from "react-bootstrap-icons";
import { ChevronRight } from "react-bootstrap-icons";

export const PopOversBottomHalf = ({ themeMode }) => {
	return (
		<>
			<div
				className={`flex items-center justify-between pl-[18px] pr-[20px] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<div className="flex items-center">
					<Globe
						size={20}
						color={`${
							themeMode === "systemDark" || themeMode === "dark"
								? "#ffffff"
								: "#000000"
						}`}
					/>
					<p
						className={`ml-[18px] text-[14px] ${
							themeMode === "dark" || themeMode === "systemDark"
								? "text-[#ffffff]"
								: "text-[#000000]"
						}`}
					>
						Location: United Kingdom
					</p>
				</div>
				<ChevronRight
					size={16}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
			</div>
			<div
				className={`flex items-center pl-[18px] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<Keyboard
					size={20}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Keyboard shortcuts
				</p>
			</div>
			<hr
				className={`${
					themeMode === "dark" || themeMode === "systemDark"
						? "border-[#4d4d4d]"
						: ""
				} mt-[9px]`}
			></hr>
			<div
				className={`flex items-center pl-[18px] mt-[8px] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<Gear
					size={20}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Settings
				</p>
			</div>
			<hr
				className={`${
					themeMode === "dark" || themeMode === "systemDark"
						? "border-[#4d4d4d]"
						: ""
				} mt-[9px]`}
			></hr>
			<div
				className={`flex items-center pl-[18px] mt-[8px] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<QuestionCircle
					size={20}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Help
				</p>
			</div>
			<div
				className={`flex items-center pl-[18px] ${
					themeMode === "dark" || themeMode === "systemDark"
						? "hover:bg-[#3e3e3e]"
						: "hover:bg-[#f2f2f2]"
				} py-[9.3px] cursor-pointer`}
			>
				<SendExclamation
					size={20}
					color={`${
						themeMode === "systemDark" || themeMode === "dark"
							? "#ffffff"
							: "#000000"
					}`}
				/>
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark"
							? "text-[#ffffff]"
							: "text-[#000000]"
					}`}
				>
					Send feedback
				</p>
			</div>
		</>
	);
};
