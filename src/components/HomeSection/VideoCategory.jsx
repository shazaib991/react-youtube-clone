import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeVideoCategoryClickedId} from "../../states/States2";

export const VideoCategory = () => {
	let isMouseDown = false;
	let startX;
	let currentPos;

	const dispatch = useDispatch();
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const isMouseOutsideMoreIconActive = useSelector((state) => state.states2.value.isMouseOutsideMoreIconActive);
	const videoCategoryClickedId = useSelector((state) => state.states2.value.videoCategoryClickedId);
	const videoCategoryArr = useSelector((state) => state.states2.value.videoCategoryArr);
	const videoCategoryScroll = useRef();

	const handleScrollVideoCategory = () => {
		if (videoCategoryScroll.current.scrollLeft > 0) {
			videoCategoryScroll.current.previousSibling.classList.remove("hidden");
			videoCategoryScroll.current.previousSibling.previousSibling.classList.remove("hidden");
			videoCategoryScroll.current.nextSibling.classList.remove("hidden");
			videoCategoryScroll.current.nextSibling.nextSibling.classList.remove("hidden");
		}

		if (videoCategoryScroll.current.scrollLeft === 0) {
			videoCategoryScroll.current.previousSibling.classList.add("hidden");
			videoCategoryScroll.current.previousSibling.previousSibling.classList.add("hidden");
		}

		if (
			videoCategoryScroll.current.scrollLeft + 1 >=
			videoCategoryScroll.current.scrollWidth - videoCategoryScroll.current.clientWidth
		) {
			videoCategoryScroll.current.nextSibling.classList.add("hidden");
			videoCategoryScroll.current.nextSibling.nextSibling.classList.add("hidden");
		}
	};

	const handleMouseDownVideoCategory = (e) => {
		isMouseDown = true;
		e.currentTarget.classList.remove("scroll-smooth");
		startX = e.pageX - e.currentTarget.offsetLeft;
		currentPos = e.currentTarget.scrollLeft;
	};

	const handleMouseMoveVideoCategory = (e) => {
		const x = e.pageX - e.currentTarget.offsetLeft;
		const walkX = x - startX;

		if (isMouseDown === false) {
			return;
		}
		e.currentTarget.scrollLeft = currentPos - walkX;
	};

	const handleScrollVideoCategoryMouseUp = () => {
		videoCategoryScroll.current.classList.add("scroll-smooth");
		isMouseDown = false;
	};

	const handleScrollVideoCategoryMouseLeave = () => {
		if (isMouseDown) {
			videoCategoryScroll.current.classList.add("scroll-smooth");
			isMouseDown = false;
		}
	};
	return (
		<div
			className={`h-full w-full overflow-scroll scrollbar-hide ${
				themeMode === "dark" || themeMode === "systemDark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
			} scroll-smooth`}
			onScroll={handleScrollVideoCategory}
			onMouseDown={handleMouseDownVideoCategory}
			onMouseLeave={handleScrollVideoCategoryMouseLeave}
			onMouseUp={handleScrollVideoCategoryMouseUp}
			onMouseMove={handleMouseMoveVideoCategory}
			ref={videoCategoryScroll}
		>
			<div className="w-max flex mt-[12px] mb-[12px]">
				{videoCategoryArr.map((item, index) => {
					return (
						<button
							key={index}
							className={`h-[32px] ${
								videoCategoryClickedId === index
									? themeMode === "dark" || themeMode === "systemDark"
										? "bg-white"
										: "bg-black"
									: themeMode === "dark" || themeMode === "systemDark"
									? "bg-[#272727]"
									: "bg-[#f2f2f2]"
							} text-[14px] ${
								videoCategoryClickedId === index
									? themeMode === "dark" || themeMode === "systemDark"
										? "text-black"
										: "text-white"
									: themeMode === "dark" || themeMode === "systemDark"
									? "text-white"
									: "text-black"
							} mr-[12px] px-[12px] rounded-[8px] select-none ${
								videoCategoryClickedId === index
									? ""
									: themeMode === "dark" || themeMode === "systemDark"
									? "hover:bg-[#3f3f3f]"
									: "hover:bg-[#e5e5e5]"
							} ${
								moreIconActive && !isMouseOutsideMoreIconActive ? "duration-0" : "duration-300"
							} transition-all font-medium`}
							onClick={() => dispatch(changeVideoCategoryClickedId(index))}
						>
							<p title={`${item}`}>{item}</p>
						</button>
					);
				})}
			</div>
		</div>
	);
};
