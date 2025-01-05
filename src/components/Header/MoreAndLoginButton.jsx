import {ThreeDotsVertical} from "react-bootstrap-icons";
import {PersonCircle} from "react-bootstrap-icons";
import {useSelector} from "react-redux";
import {useRef, useContext} from "react";
import {UseContext} from "../../App.jsx";
import {changeMoreIconActive} from "../../states/States1";
import {useDispatch} from "react-redux";

export const MoreAndLoginButton = () => {
	const dispatch = useDispatch();
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const {handleHeaderTooltipMouseEnter} = useContext(UseContext);
	const {handleHeaderTooltipMouseLeave} = useContext(UseContext);
	const moreIcon = useRef();

	const handleMoreIconClick = () => {
		dispatch(changeMoreIconActive(!moreIconActive));
	};

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
