/* eslint-disable no-mixed-spaces-and-tabs */
import {ThreeDotsVertical} from "react-bootstrap-icons";
import {Check2} from "react-bootstrap-icons";
import {useState} from "react";
import {NewVideosAtScroll} from "./NewVideosAtScroll";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const Video = ({handleVideoMouseEnter, handleVideoMoreIconClick}) => {
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const videoMoreIconClickId = useSelector((state) => state.states2.value.videoMoreIconClickId);
	const videoData = useSelector((state) => state.states2.value.videoData);

	const [verifiedBadgeHover, setVerifiedBadgeHover] = useState({
		status: false,
		id: 0,
	});
	const [channelHover, setChannelHover] = useState({status: false, id: 0});

	const channelHoverMouseEnter = (indexId) => {
		setChannelHover({status: true, id: indexId});
	};

	const channelHoverMouseLeave = () => {
		setChannelHover({status: false, id: 0});
	};

	const verifiedBadgeHoverEnter = (indexId) => {
		setVerifiedBadgeHover({status: true, id: indexId});
	};

	const verifiedBadgeHoverLeave = () => {
		setVerifiedBadgeHover({status: false, id: 0});
	};

	const ParseFloat = (str, val) => {
		str = str.toString();
		str = str.slice(0, str.indexOf(".") + val);

		return Number(str);
	};

	const extractVideoLength = (videoLength) => {
		if (videoLength.includes("H") && videoLength.includes("M") && videoLength.includes("S")) {
			const hour = videoLength.match(/[0-9]*H/);
			const minute = videoLength.match(/[0-9]*M/);
			const second = videoLength.match(/[0-9]*S/);

			hour[0] = hour[0].slice(0, hour[0].length - 1);
			minute[0] = minute[0].slice(0, minute[0].length - 1);
			second[0] = second[0].slice(0, second[0].length - 1);

			if (second[0] < 10) {
				return `${hour[0]}:${minute[0]}:0${second[0]}`;
			}
			if (minute[0] < 10) {
				return `${hour[0]}:0${minute[0]}:${second[0]}`;
			}
			if (second[0] < 10 && minute < 10) {
				return `${hour[0]}:0${minute[0]}:0${second[0]}`;
			}

			return `${hour[0]}:${minute[0]}:${second[0]}`;
		} else if (videoLength.includes("M") && videoLength.includes("S")) {
			const minute = videoLength.match(/[0-9]*M/);
			const second = videoLength.match(/[0-9]*S/);

			minute[0] = minute[0].slice(0, minute[0].length - 1);
			second[0] = second[0].slice(0, second[0].length - 1);

			if (second[0] < 10) {
				return `${minute[0]}:0${second[0]}`;
			}

			return `${minute[0]}:${second[0]}`;
		} else if (videoLength.includes("S")) {
			const second = videoLength.match(/[0-9]*S/);

			second[0] = second[0].slice(0, second[0].length - 1);

			if (second[0] < 10) {
				return `0:0${second[0]}`;
			}

			return `0:${second[0]}`;
		} else {
			return `?:?:?`;
		}
	};

	const decodeEntity = (str) => {
		let txt = document.createElement("textarea");

		txt.innerHTML = str;

		return txt.value;
	};

	return (
		<div
			className={`flex flex-wrap ${
				videoData.length !== 0 ? "mt-[80px]" : "mt-[18px]"
			} videoCardParent max-md:justify-center`}
		>
			{videoData.length === 0
				? [...Array(12).keys()].map((index) => {
						return (
							<div className="max-md:w-[300px] w-[350px] rounded-[9px] mb-[50px] ml-[25px] max-md:ml-0" key={index}>
								<div
									className={`w-full h-[193px] ${
										themeMode === "dark" || themeMode === "systemDark" ? "bg-[#3f3f3f]" : "bg-[#e5e5e5]"
									} rounded-[9px]`}
								></div>
								<div className="flex mt-[12px] max-md:flex-col max-md:items-center">
									<div
										className={`w-[36px] h-[36px] rounded-full ${
											themeMode === "dark" || themeMode === "systemDark" ? "bg-[#3f3f3f]" : "bg-[#e5e5e5]"
										} max-md:mb-[10px]`}
									></div>
									<div className="ml-[12px] max-md:ml-0">
										<div
											className={`w-[266px] h-[20px] ${
												themeMode === "dark" || themeMode === "systemDark"
													? "bg-[#3f3f3f]"
													: "bg-[#e5e5e5]"
											} mt-[-2px]`}
										></div>
										<div
											className={`w-[177px] h-[20px] ${
												themeMode === "dark" || themeMode === "systemDark"
													? "bg-[#3f3f3f]"
													: "bg-[#e5e5e5]"
											} mt-[10px]`}
										></div>
									</div>
								</div>
							</div>
						);
				  })
				: videoData.map((item, index) => {
						const videoDate = new Date(item.snippet.publishedAt);
						const currentDate = new Date(Date.now());
						const days = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 86400000);
						const hours = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 3600000);
						const seconds = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 1000);
						const minutes = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 60000);
						const months = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 2629746000);
						const weeks = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 604800000);
						const years = Math.trunc((currentDate.getTime() - videoDate.getTime()) / 31556952000);

						return (
							<div
								key={item.customId}
								className="flex-[31%] max-md:flex-[100%] rounded-[11px] mb-[42px] cursor-pointer videoCard ml-[15px] max-md:ml-0"
								onMouseEnter={() => handleVideoMouseEnter(index)}
							>
								<div className="min-w-[300px] max-md:min-h-auto min-h-[190px] relative">
									<div
										className={`h-full w-full absolute left-0 top-0 ${
											themeMode === "dark" || themeMode === "systemDark" ? "bg-[#3f3f3f]" : "bg-[#e5e5e5]"
										} rounded-[12px] z-[100]`}
										style={{display: "block"}}
									></div>
									{item.snippet.thumbnails.medium.url ? (
										<img
											src=""
											className="w-full h-full rounded-[12px]"
											data-src={item.snippet.thumbnails.medium.url}
											onLoad={(e) => {
												e.currentTarget.previousElementSibling.style.display = "none";
											}}
										/>
									) : (
										<div className="w-full rounded-[12px] bg-[#cccccc]"></div>
									)}
									<div className="absolute bottom-[4px] right-[4px] bg-[#191C23] text-white font-medium text-[12px] px-[5px] rounded-[3px]">
										<p>{extractVideoLength(item.snippet.videoLength)}</p>
									</div>
								</div>
								<div className="flex relative max-md:flex-col max-md:items-center">
									<div className="w-[36px] h-[36px] absolute left-0 top-0 max-md:static mt-[12px]">
										{item.snippet.channelImg ? (
											""
										) : (
											<div className={`w-[36px] h-[36px] bg-[#cccccc] rounded-full z-[100]`}></div>
										)}
										{item.snippet.channelImg ? (
											<img
												src=""
												className="w-[36px] h-[36px] rounded-full"
												data-src={item.snippet.channelImg}
												onLoad={(e) =>
													e.currentTarget.previousSibling
														? e.currentTarget.previousSibling.classList.add("hidden")
														: ""
												}
												width={36}
												height={36}
											/>
										) : (
											""
										)}
									</div>
									<div className="w-full ml-[50px] max-md:ml-0 max-md:text-center">
										<p
											className={`w-[86%] max-md:w-full text-[16px] ${
												themeMode === "dark" || themeMode === "systemDark" ? "text-white" : "text-black"
											} font-medium text-ellipsis leading-[22px] mt-[12px] overflow-hidden line-clamp-2`}
											title={`${decodeEntity(item.snippet.title)}`}
										>
											{decodeEntity(item.snippet.title)}
										</p>
										<div className="w-full mt-[2px] relative">
											<p
												className={`absolute top-[-52px] left-[-3px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
													channelHover.status && channelHover.id === index ? "opacity-100" : "opacity-0"
												} ${
													channelHover.status && channelHover.id === index ? "visible" : "invisible"
												} transition-all cursor-default`}
											>
												{item.snippet.channelTitle}
											</p>
											<div className="flex items-center max-md:justify-center max-md:flex-col">
												{/* TODO fix overflow width  */}
												<div className="max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap">
													<p
														className={`inline text-[14px] ${
															themeMode === "dark" || themeMode === "systemDark"
																? "text-[#a5a5a5]"
																: "text-[#777777]"
														}`}
														onMouseEnter={() => channelHoverMouseEnter(index)}
														onMouseLeave={() => channelHoverMouseLeave(index)}
														title={item.snippet.channelTitle}
													>
														{item.snippet.channelTitle}
													</p>
												</div>
												{item.snippet.channelSubscriberCount >= 100000 ? (
													<div className="relative">
														<div
															className={`absolute top-[-55px] left-[-24px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
																verifiedBadgeHover.status && verifiedBadgeHover.id === index
																	? "opacity-100"
																	: "opacity-0"
															} ${
																verifiedBadgeHover.status && verifiedBadgeHover.id === index
																	? "visible"
																	: "invisible"
															} transition-all cursor-default`}
														>
															Verified
														</div>
														<div
															className="relative w-[12px] h-[12px] rounded-[50%] bg-[#5e5e5e] pt-[1px] pl-[1px] ml-[5px] max-md:ml-0"
															onMouseEnter={() => verifiedBadgeHoverEnter(index)}
															onMouseLeave={() => verifiedBadgeHoverLeave(index)}
														>
															<Check2 height={10.5} width={10.3} color="white" />
															<Check2
																className="absolute left-[1px] top-[1px]"
																height={10.5}
																width={10.3}
																color="white"
															/>
															<Check2
																className="absolute left-[1px] top-[1px]"
																height={10.5}
																width={10.3}
																color="white"
															/>
														</div>
													</div>
												) : (
													""
												)}
											</div>
										</div>
										<div>
											<p
												className={`text-[14px] ${
													themeMode === "dark" || themeMode === "systemDark"
														? "text-[#a5a5a5]"
														: "text-[#777777]"
												} leading-[16px]`}
											>
												{item.snippet.videoViewCount !== undefined
													? Number(item.snippet.videoViewCount) === 1
														? item.snippet.videoViewCount + " view"
														: item.snippet.videoViewCount.length <= 3
														? item.snippet.videoViewCount + " views"
														: item.snippet.videoViewCount.length <= 4
														? ParseFloat((Number(item.snippet.videoViewCount) / 1000, 2)) + "k views"
														: item.snippet.videoViewCount.length <= 6
														? ParseFloat(Number(item.snippet.videoViewCount) / 1000, 0) + "k views"
														: item.snippet.videoViewCount.length <= 7
														? ParseFloat(Number(item.snippet.videoViewCount) / 1000000, 2) + "M views"
														: item.snippet.videoViewCount.length <= 9
														? ParseFloat(Number(item.snippet.videoViewCount) / 1000000, 0) + "M views"
														: item.snippet.videoViewCount.length <= 10
														? ParseFloat(Number(item.snippet.videoViewCount) / 1000000000, 2) +
														  "B views"
														: item.snippet.videoViewCount.length <= 12
														? ParseFloat(Number(item.snippet.videoViewCount) / 1000000000, 0) +
														  "B views"
														: item.snippet.videoViewCount + " views"
													: "? views"}
												&nbsp;&#x2022;&nbsp;
												{years != 0
													? years + `${years === 1 ? " year" : " years"} ago`
													: months != 0
													? months + `${months === 1 ? " month" : " months"} ago`
													: weeks != 0
													? weeks + `${weeks === 1 ? " week" : " weeks"} ago`
													: days != 0
													? days + `${days === 1 ? " day" : " days"} ago`
													: hours != 0
													? hours + `${hours === 1 ? " hour" : " hours"} ago`
													: minutes != 0
													? minutes + `${minutes === 1 ? " minute" : " minutes"} ago`
													: seconds != 0
													? seconds + `${seconds === 1 ? " second" : " seconds"} ago`
													: ""}
											</p>
										</div>
									</div>
									<div
										className={`${
											videoMoreIconActive.status && videoMoreIconClickId === index
												? ""
												: "videoMoreIconHidden"
										} ${
											themeMode === "dark" || themeMode === "systemDark"
												? "videoMoreIconDark"
												: "videoMoreIcon"
										} max-md:right-0 max-md:flex`}
										onClick={(e) => handleVideoMoreIconClick(e, index)}
									>
										<ThreeDotsVertical
											color={`${
												themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"
											}`}
											size={18}
										/>
									</div>
								</div>
							</div>
						);
				  })}
			<NewVideosAtScroll />
		</div>
	);
};

Video.propTypes = {
	handleVideoMoreIconClick: PropTypes.func,
	handleVideoMouseEnter: PropTypes.func,
};
