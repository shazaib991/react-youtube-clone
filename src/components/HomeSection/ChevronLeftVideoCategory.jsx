import {ChevronLeft} from "react-bootstrap-icons";
import {useSelector} from "react-redux";
import {UseContext} from "../../App.jsx";
import {useContext} from "react";

export const ChevronLeftVideoCategory = () => {
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const {rightScrollVideoCategory} = useContext(UseContext);
	const {leftScrollVideoCategory} = useContext(UseContext);

	const handleLeftScrollVideoCategory = () => {
		leftScrollVideoCategory.current.parentElement.children[2].scrollLeft -= 400;
	};

	return (
		<div
			className={`videoCategoryNavigateBeforeIcon hidden ml-[4px]`}
			onClick={handleLeftScrollVideoCategory}
			onMouseLeave={(e) => {
				e.currentTarget.classList.remove(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateIconTransitionActiveDark"
						: "videoCategoryNavigateIconTransitionActive"
				);
				e.currentTarget.classList.remove(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateIconAnimationActiveDark"
						: "videoCategoryNavigateIconAnimationActive"
				);

				if (e.currentTarget.classList.contains("videoCategoryNavigateIconMouseDown")) {
					e.currentTarget.classList.remove("videoCategoryNavigateBeforeIconHover");
					e.currentTarget.classList.add("videoCategoryNavigateIconMouseOut");
					e.currentTarget.classList.remove(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateIconActiveDark"
							: "videoCategoryNavigateIconActive"
					);
					e.currentTarget.classList.add("videoCategoryNavigateIconActive2");
					return;
				}
				e.currentTarget.classList.remove(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateBeforeIconHoverDark"
						: "videoCategoryNavigateBeforeIconHover"
				);
			}}
			onMouseEnter={(e) => {
				if (e.currentTarget.classList.contains("videoCategoryNavigateIconMouseDown")) {
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateBeforeIconHoverDark"
							: "videoCategoryNavigateBeforeIconHover"
					);
					e.currentTarget.classList.remove("videoCategoryNavigateIconActive2");
					return;
				}
				e.currentTarget.classList.add(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateBeforeIconHoverDark"
						: "videoCategoryNavigateBeforeIconHover"
				);
			}}
			onMouseUp={(e) => {
				if (leftScrollVideoCategory.current.classList.contains("videoCategoryNavigateNextIconMouseDown")) {
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateIconAnimationActiveDark"
							: "videoCategoryNavigateIconAnimationActive"
					);
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateNextIconMouseDown");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconActive2");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseOut");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseDown");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateBeforeIconMouseDown");
					return;
				}
				if (e.currentTarget.classList.contains("videoCategoryNavigateIconMouseOut")) {
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateIconAnimationActiveDark"
							: "videoCategoryNavigateIconAnimationActive"
					);
					e.currentTarget.classList.remove("videoCategoryNavigateIconMouseDown");
					e.currentTarget.classList.remove("videoCategoryNavigateIconMouseOut");
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateBeforeIconMouseDown");
					return;
				}
				e.currentTarget.classList.remove(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateIconActiveDark"
						: "videoCategoryNavigateIconActive"
				);
				e.currentTarget.classList.add(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateIconTransitionActiveDark"
						: "videoCategoryNavigateIconTransitionActive"
				);
				e.currentTarget.classList.remove("videoCategoryNavigateIconMouseDown");
				rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateBeforeIconMouseDown");
			}}
			onMouseDown={(e) => {
				if (e.button === 0) {
					rightScrollVideoCategory.current.classList.add("videoCategoryNavigateBeforeIconMouseDown");
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateIconActiveDark"
							: "videoCategoryNavigateIconActive"
					);
					e.currentTarget.classList.remove(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateBeforeIconHoverDark"
							: "videoCategoryNavigateBeforeIconHover"
					);
					e.currentTarget.classList.add("videoCategoryNavigateIconMouseDown");
				}
				return;
			}}
			ref={leftScrollVideoCategory}
		>
			<ChevronLeft color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} size={16} />
		</div>
	);
};
