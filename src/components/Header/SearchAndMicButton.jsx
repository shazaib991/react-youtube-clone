import {MicFill, Search} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const SearchAndMicButton = ({handleHeaderTooltipMouseEnter, handleHeaderTooltipMouseLeave, handleMicListenClick}) => {
	const themeMode = useSelector((state) => state.states.value.themeMode);

	return (
		<>
			<div
				className={`w-[63px] h-[40px] flex items-center ${
					themeMode === "systemDark" || themeMode === "dark"
						? "bg-[#222222] border-[#313131]"
						: "bg-[#f8f8f8] border-[#d6d6d6] hover:bg-[#0000000f] hover:border-[#0000002e] hover:shadow-[0_1px_1px_rgba(50,50,50,0.12)] active:bg-[#0000001a]"
				} border rounded-tr-[40px] mr-[2px] rounded-br-[40px] cursor-pointer`}
				onMouseEnter={() => handleHeaderTooltipMouseEnter("searchIconTooltip")}
				onMouseLeave={() => handleHeaderTooltipMouseLeave("searchIconTooltip")}
			>
				<Search
					className="ml-[22px]"
					size={18}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
			</div>
			<div
				className={`w-[40px] h-[40px] flex justify-center items-center ${
					themeMode === "systemDark" || themeMode === "dark"
						? "bg-[#272727] hover:bg-[#3d3d3d] active:border-[#272727] active:bg-[#515151]"
						: "bg-[#f2f2f2] hover:bg-black/10 active:border-[#00000026] active:bg-black/20"
				}  rounded-[50%] ml-[14px] cursor-pointer active:border-[1px]`}
				onMouseEnter={() => handleHeaderTooltipMouseEnter("micIconTooltip")}
				onMouseLeave={() => handleHeaderTooltipMouseLeave("micIconTooltip")}
				onClick={handleMicListenClick}
			>
				<MicFill size={18} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
			</div>
		</>
	);
};

SearchAndMicButton.propTypes = {
	handleHeaderTooltipMouseEnter: PropTypes.func,
	handleHeaderTooltipMouseLeave: PropTypes.func,
	handleMicListenClick: PropTypes.func,
};
