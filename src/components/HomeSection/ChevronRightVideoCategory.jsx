import {ChevronRight} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const ChevronRightVideoCategory = ({
	handleRightScrollVideoCategory,
	rightScrollVideoCategory,
	leftScrollVideoCategory,
}) => {
	const themeMode = useSelector((state) => state.states.value.themeMode);

	return (
		<div
			className={`videoCategoryNavigateNextIcon max-md:mr-[15px] mr-[-12px]`}
			onClick={handleRightScrollVideoCategory}
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
					e.currentTarget.classList.remove(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateNextIconHoverDark"
							: "videoCategoryNavigateNextIconHover"
					);
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
						? "videoCategoryNavigateNextIconHoverDark"
						: "videoCategoryNavigateNextIconHover"
				);
			}}
			onMouseEnter={(e) => {
				if (e.currentTarget.classList.contains("videoCategoryNavigateIconMouseDown")) {
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateNextIconHoverDark"
							: "videoCategoryNavigateNextIconHover"
					);
					e.currentTarget.classList.remove("videoCategoryNavigateIconActive2");
					return;
				}
				e.currentTarget.classList.add(
					themeMode === "dark" || themeMode === "systemDark"
						? "videoCategoryNavigateNextIconHoverDark"
						: "videoCategoryNavigateNextIconHover"
				);
			}}
			onMouseUp={(e) => {
				if (rightScrollVideoCategory.current.classList.contains("videoCategoryNavigateBeforeIconMouseDown")) {
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateIconAnimationActiveDark"
							: "videoCategoryNavigateIconAnimationActive"
					);
					rightScrollVideoCategory.current.classList.remove("videoCategoryNavigateBeforeIconMouseDown");
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconActive2");
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseDown");
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateIconMouseOut");
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateNextIconMouseDown");
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
					leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateNextIconMouseDown");
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
				leftScrollVideoCategory.current.classList.remove("videoCategoryNavigateNextIconMouseDown");
			}}
			onMouseDown={(e) => {
				if (e.button === 0) {
					leftScrollVideoCategory.current.classList.add("videoCategoryNavigateNextIconMouseDown");
					e.currentTarget.classList.add(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateIconActiveDark"
							: "videoCategoryNavigateIconActive"
					);
					e.currentTarget.classList.remove(
						themeMode === "dark" || themeMode === "systemDark"
							? "videoCategoryNavigateNextIconHoverDark"
							: "videoCategoryNavigateNextIconHover"
					);
					e.currentTarget.classList.add("videoCategoryNavigateIconMouseDown");
				}
				return;
			}}
			ref={rightScrollVideoCategory}
		>
			<ChevronRight color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} size={16} />
		</div>
	);
};

ChevronRightVideoCategory.propTypes = {
	leftScrollVideoCategory: PropTypes.object,
	rightScrollVideoCategory: PropTypes.object,
	handleRightScrollVideoCategory: PropTypes.func,
};
