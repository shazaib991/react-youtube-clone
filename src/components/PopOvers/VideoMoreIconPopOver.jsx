/* eslint-disable no-mixed-spaces-and-tabs */
import {CollectionPlay} from "react-bootstrap-icons";
import {Share} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const VideoMoreIconPopOver = ({videoMoreIconPopOver}) => {
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const videoMoreIconPos = useSelector((state) => state.states4.value.videoMoreIconPos);
	const windowSize = useSelector((state) => state.states4.value.windowSize);

	return (
		<div
			className={`fixed rounded-[10px] py-[8px] visible ${
				themeMode === "systemDark" || themeMode === "dark"
					? "bg-[#282828]"
					: "bg-[#ffffff] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)]"
			} ${videoMoreIconActive.status ? "" : "invisible"} z-[1200]`}
			ref={videoMoreIconPopOver}
			style={
				videoMoreIconActive.status
					? {
							top: `${
								windowSize <= Math.trunc(videoMoreIconPos.y + (videoMoreIconPopOver.current.clientHeight + 2))
									? String(Math.trunc(videoMoreIconPos.y - 85))
									: windowSize <=
									  Math.trunc(videoMoreIconPos.y + (videoMoreIconPopOver.current.clientHeight + 42))
									? String(Math.trunc(videoMoreIconPos.y + 2))
									: String(Math.trunc(videoMoreIconPos.y + 42))
							}px`,
							left: `${
								window.innerWidth <=
									Math.trunc(videoMoreIconPos.x + (videoMoreIconPopOver.current.clientWidth + 2)) &&
								windowSize <= Math.trunc(videoMoreIconPos.y + (videoMoreIconPopOver.current.clientHeight + 2))
									? String(Math.trunc(videoMoreIconPos.x - 132))
									: window.innerWidth <=
											Math.trunc(videoMoreIconPos.x + (videoMoreIconPopOver.current.clientWidth + 2)) &&
									  windowSize <=
											Math.trunc(videoMoreIconPos.y + (videoMoreIconPopOver.current.clientHeight + 42))
									? String(Math.trunc(videoMoreIconPos.x - 170))
									: window.innerWidth <=
									  Math.trunc(videoMoreIconPos.x + (videoMoreIconPopOver.current.clientWidth + 2))
									? String(Math.trunc(videoMoreIconPos.x - 132))
									: windowSize <=
									  Math.trunc(videoMoreIconPos.y + (videoMoreIconPopOver.current.clientHeight + 2))
									? String(Math.trunc(videoMoreIconPos.x))
									: windowSize <=
									  Math.trunc(videoMoreIconPos.y + (videoMoreIconPopOver.current.clientHeight + 42))
									? String(Math.trunc(videoMoreIconPos.x + 40))
									: String(Math.trunc(videoMoreIconPos.x))
							}px`,
					  }
					: {}
			}
		>
			<div
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#535353]" : "hover:bg-[#e5e5e5]"
				} py-[7.5px] cursor-pointer pl-[17px] pr-[35px]`}
			>
				<CollectionPlay
					size={20}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					}`}
				>
					Add to queue
				</p>
			</div>
			<div
				className={`flex items-center ${
					themeMode === "dark" || themeMode === "systemDark" ? "hover:bg-[#535353]" : "hover:bg-[#e5e5e5]"
				} py-[7.5px] cursor-pointer pl-[17px] pr-[35px]`}
			>
				<Share size={20} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
				<p
					className={`ml-[18px] text-[14px] ${
						themeMode === "dark" || themeMode === "systemDark" ? "text-[#ffffff]" : "text-[#000000]"
					}`}
				>
					Share
				</p>
			</div>
		</div>
	);
};

VideoMoreIconPopOver.propTypes = {
	videoMoreIconPopOver: PropTypes.object,
};
