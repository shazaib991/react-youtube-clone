import {useSelector} from "react-redux";
import {useContext} from "react";
import {UseContext} from "../../App.jsx";
import {changeSidebarBurgerMenuClick} from "../../states/States1";
import {useDispatch} from "react-redux";

export const BurgerMenu = () => {
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const sidebarBurgerMenuClick = useSelector((state) => state.states.value.sidebarBurgerMenuClick);
	const {burgerIcon} = useContext(UseContext);
	const dispatch = useDispatch();

	const handleSidebarBurgerMenuClick = () => {
		dispatch(changeSidebarBurgerMenuClick(!sidebarBurgerMenuClick));
	};

	return (
		<div
			className="burgerMenuIcon mr-[2px] max-md:hidden"
			onClick={handleSidebarBurgerMenuClick}
			onMouseLeave={(e) => {
				if (themeMode === "systemDark" || themeMode === "dark") {
					e.currentTarget.classList.remove("burgerMenuTransitionActiveDark");
				} else {
					e.currentTarget.classList.remove("burgerMenuTransitionActive");
				}

				if (e.currentTarget.classList.contains("burgerMenuIconMouseDown")) {
					if (themeMode === "systemDark" || themeMode === "dark") {
						e.currentTarget.classList.add("burgerMenuIconHoverDark");
						e.currentTarget.classList.remove("burgerMenuIconActiveDark");
						e.currentTarget.classList.add("burgerMenuIconActive2Dark");
						return;
					}
					e.currentTarget.classList.add("burgerMenuIconHover");
					e.currentTarget.classList.remove("burgerMenuIconActive");
					e.currentTarget.classList.add("burgerMenuIconActive2");
					return;
				}
				if (themeMode === "systemDark" || themeMode === "dark") {
					e.currentTarget.classList.remove("burgerMenuIconHoverDark");
					return;
				}
				e.currentTarget.classList.remove("burgerMenuIconHover");
			}}
			onMouseEnter={(e) => {
				if (e.currentTarget.classList.contains("burgerMenuIconMouseDown")) {
					if (themeMode === "systemDark" || themeMode === "dark") {
						e.currentTarget.classList.remove("burgerMenuIconHoverDark");
						e.currentTarget.classList.add("burgerMenuIconActiveDark");
						e.currentTarget.classList.remove("burgerMenuIconActive2Dark");
						return;
					}
					e.currentTarget.classList.remove("burgerMenuIconHover");
					e.currentTarget.classList.add("burgerMenuIconActive");
					e.currentTarget.classList.remove("burgerMenuIconActive2");
					return;
				}
				if (themeMode === "systemDark" || themeMode === "dark") {
					e.currentTarget.classList.add("burgerMenuIconHoverDark");
					return;
				}
				e.currentTarget.classList.add("burgerMenuIconHover");
			}}
			onMouseDown={(e) => {
				if (e.button === 0) {
					if (themeMode === "systemDark" || themeMode === "dark") {
						e.currentTarget.classList.add("burgerMenuIconActiveDark");
						e.currentTarget.classList.add("burgerMenuIconMouseDown");
						e.currentTarget.classList.remove("burgerMenuIconHoverDark");
						return;
					}
					e.currentTarget.classList.add("burgerMenuIconActive");
					e.currentTarget.classList.add("burgerMenuIconMouseDown");
					e.currentTarget.classList.remove("burgerMenuIconHover");
				}
				return;
			}}
			onMouseUp={(e) => {
				if (themeMode === "systemDark" || themeMode === "dark") {
					e.currentTarget.classList.remove("burgerMenuIconActiveDark");
					e.currentTarget.classList.add("burgerMenuTransitionActiveDark");
					e.currentTarget.classList.remove("burgerMenuIconMouseDown");
					return;
				}
				e.currentTarget.classList.remove("burgerMenuIconActive");
				e.currentTarget.classList.add("burgerMenuTransitionActive");
				e.currentTarget.classList.remove("burgerMenuIconMouseDown");
			}}
			ref={burgerIcon}
		>
			<div className="w-[18px] h-[13px] flex flex-col justify-between">
				<div
					className={`w-full h-[1px] ${
						themeMode === "systemDark" || themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
					}`}
				></div>
				<div
					className={`w-full h-[1px] ${
						themeMode === "systemDark" || themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
					}`}
				></div>
				<div
					className={`w-full h-[1px] ${
						themeMode === "systemDark" || themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
					}`}
				></div>
			</div>
		</div>
	);
};
