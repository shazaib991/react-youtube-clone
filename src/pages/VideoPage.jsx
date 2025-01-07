import {useParams} from "react-router-dom";
import {Header} from "../components/Header/Header";
import {Video} from "../components/HomeSection/Video";
import {useSelector} from "react-redux";

export const VideoPage = () => {
	const videoData = useSelector((state) => state.states2.value.videoData);
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const {id} = useParams();
	const videoDataArr = videoData.filter((item) => item.snippet.videoId === id)[0].snippet.videoPlayer.embedHtml.split('"');

	return (
		<>
			<Header />
			<div
				className={`flex flex-col ${
					themeMode === "dark" || themeMode === "systemDark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
				} h-[100vh]`}
			>
				<iframe
					width="full"
					height={500}
					src={videoDataArr[5]}
					allow={videoDataArr[9]}
					referrerPolicy={videoDataArr[11]}
					allowFullScreen
				></iframe>
			</div>
		</>
	);
};
