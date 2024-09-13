import {ThreeDotsVertical} from "react-bootstrap-icons";
import {PersonCircle} from "react-bootstrap-icons";
import PropTypes from "prop-types";

export const MoreAndLoginButton = ({
	themeMode,
	handleMoreIconClick,
	handleHeaderTooltipMouseEnter,
	handleHeaderTooltipMouseLeave,
	moreIcon,
}) => {
	return (
		<>
			<div
				className={themeMode === "systemDark" || themeMode === "dark" ? "headerMoreIconDark" : "headerMoreIcon"}
				onClick={handleMoreIconClick}
				onMouseEnter={() => handleHeaderTooltipMouseEnter("moreIconTooltip")}
				onMouseLeave={() => handleHeaderTooltipMouseLeave("moreIconTooltip")}
				ref={moreIcon}
			>
				<ThreeDotsVertical
					size={18}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
			</div>
			<div
				className={`h-[35px] flex items-center border pl-[10px] pr-[15px] rounded-[40px] cursor-pointer ${
					themeMode === "dark" || themeMode === "systemDark"
						? "border-[#4d4d4d] hover:bg-[#263850]"
						: "hover:bg-[#def1ff]"
				}`}
			>
				<PersonCircle className="mr-[8px]" size={21} color="#5e5eff" />
				<p className="text-[14px] font-[500] text-[#5e5eff]">Sign in</p>
			</div>
		</>
	);
};

MoreAndLoginButton.propTypes = {
	themeMode: PropTypes.string,
	handleHeaderTooltipMouseEnter: PropTypes.func,
	handleHeaderTooltipMouseLeave: PropTypes.func,
	handleMoreIconClick: PropTypes.func,
	videoMoreIconActive: PropTypes.object,
	moreIcon: PropTypes.object,
};
