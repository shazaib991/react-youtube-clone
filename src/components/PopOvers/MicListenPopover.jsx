import {MicFill} from "react-bootstrap-icons";
import {XLg} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {changeIsMouseInsideMicListeningPopover} from "../../states/States4";
import {useContext} from "react";
import {UseContext} from "../../App.jsx";

export const MicListenPopover = () => {
	const {handleMicListenPopoverCancelClick} = useContext(UseContext);
	const {handleMicListenPopoverClick} = useContext(UseContext);
	const dispatch = useDispatch();

	const showMicListeningPopover = useSelector((state) => state.states4.value.showMicListeningPopover);
	const isMicListening = useSelector((state) => state.states4.value.isMicListening);
	const isMouseInsideMicListeningPopover = useSelector((state) => state.states4.value.isMouseInsideMicListeningPopover);

	return (
		<div
			className={`h-[100vh] w-full fixed bg-[#0000004d] z-[1200] ${showMicListeningPopover ? "visible" : "invisible"} ${
				showMicListeningPopover ? "opacity-100" : "opacity-0"
			} transition-[opacity,visibility] duration-300`}
			onClick={
				isMouseInsideMicListeningPopover
					? () => handleMicListenPopoverCancelClick("inside")
					: () => handleMicListenPopoverCancelClick("outside")
			}
		>
			<div
				className={`h-[416px] w-[592px] absolute top-[8px] left-[27.5%] bg-white shadow-[rgba(0,_0,_0,_0.40)_0px_25px_50px_-12px] transition-[opacity,visibility] duration-300 ${
					showMicListeningPopover ? "opacity-100" : "opacity-0"
				} ${showMicListeningPopover ? "visible" : "invisible"}`}
				onMouseEnter={() => dispatch(changeIsMouseInsideMicListeningPopover(true))}
				onMouseLeave={() => dispatch(changeIsMouseInsideMicListeningPopover(false))}
			>
				<div className="h-[calc(100%-46px)]">
					<div
						className={`flex justify-center items-center h-[40px] w-[40px] hover:bg-black/10 rounded-[50%] absolute right-[6px] top-[8px] cursor-pointer active:border-[#00000026] active:border-[1px] active:bg-black/20 transition-[border] duration-300 active:transition-none`}
						onClick={() => handleMicListenPopoverCancelClick("outside")}
					>
						<XLg size={20} />
					</div>
					<div className={`h-full flex flex-col justify-between mt-[46px]`}>
						<h1 className="text-[24px] ml-[33px]">
							{isMicListening ? "Listening..." : "Microphone off. Try again."}
						</h1>
						<div className="flex flex-col items-center ml-[33px]">
							<div
								className={`flex justify-center items-center h-[68px] w-[68px] rounded-[50%] ${
									isMicListening ? "bg-[#cc0000]" : "bg-[#cecece]"
								} mb-[15px] cursor-pointer ${isMicListening ? "mb-[56px]" : ""}`}
								onClick={handleMicListenPopoverClick}
							>
								<MicFill className="mt-[2px]" size={38} color={`${isMicListening ? "white" : "black"}`} />
							</div>
							<p className={`text-[14px] mb-[20px] text-[#606060] ${isMicListening ? "hidden" : "block"}`}>
								Tap microphone to try again
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
