import { useEffect, useRef, useState } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { ChevronLeft } from "react-bootstrap-icons";
import { ChevronRight } from "react-bootstrap-icons";
import { Check2 } from "react-bootstrap-icons";
import axios from "axios";
import "./HomeSectionStyle.css";

export const HomeSection = ({
	sidebarBurgerMenuClick,
	handleVideoMoreIconClick,
	moreIconActive,
	videoMoreIconActive,
	isMouseOutsideMoreIconActive,
	videoMoreIconClickId,
	themeMode,
	leftScrollVideoCategory,
	rightScrollVideoCategory,
	handleVideoMouseEnter,
}) => {
	const [videoCategoryClickedId, setVideoCategoryClickedId] = useState(0);
	const [videoCategoryArr, setVideoCategoryArr] = useState([]);
	const [videoData, setVideoData] = useState([]);
	const [areNewVideosAtScrollDownLoading, setAreNewVideosAtScrollDownLoading] =
		useState(false);
	const [channelHover, setChannelHover] = useState({ status: false, id: 0 });
	const [nextPageToken, setNextPageToken] = useState("");
	const [loaderInterval1, setLoaderInterval1] = useState(0);
	const [loaderInterval2, setLoaderInterval2] = useState(0);
	const [verifiedBadgeHover, setVerifiedBadgeHover] = useState({
		status: false,
		id: 0,
	});
	const videoCategoryScroll = useRef();
	const loader1 = useRef();
	const loader2 = useRef();
	const countryCode = "US";
	let isMouseDown = false;
	let startX;
	let currentPos;

	const addVideosArray = async () => {
		const videoDataArray = [...videoData];
		const videoResponse = await axios(
			`https://www.googleapis.com/youtube/v3/search?key=${
				import.meta.env.VITE_API_KEY
			}&part=snippet&maxResults=12&type=video&regionCode=${countryCode}&pageToken=${nextPageToken}`
		);

		setNextPageToken(await videoResponse.data.nextPageToken);

		const videoDataItems = await videoResponse.data.items;

		for (let i = 0; i < videoDataItems.length; i++) {
			const uniqueVideoId = Math.random().toString(16).slice(2);
			const channelResponse = await axios(
				`https://www.googleapis.com/youtube/v3/channels?key=${
					import.meta.env.VITE_API_KEY
				}&part=snippet&id=${videoDataItems[i].snippet.channelId}`
			);
			const channelStatisticsResponse = await axios(
				`https://www.googleapis.com/youtube/v3/channels?key=${
					import.meta.env.VITE_API_KEY
				}&part=statistics&id=${videoDataItems[i].snippet.channelId}`
			);
			const videoDetailsResponse = await axios(
				`https://www.googleapis.com/youtube/v3/videos?key=${
					import.meta.env.VITE_API_KEY
				}&part=statistics&part=contentDetails&id=${
					videoDataItems[i].id.videoId
				}`
			);
			videoDataItems[i].customId = uniqueVideoId;

			const channelDataArray = await channelResponse.data.items;
			const channelStatisticsDataArray = await channelStatisticsResponse.data
				.items;

			if (channelDataArray !== undefined) {
				videoDataItems[i].snippet.channelImg = await channelDataArray[0]
					.snippet.thumbnails.default.url;
				videoDataItems[i].snippet.channelSubscriberCount =
					await channelStatisticsDataArray[0].statistics.subscriberCount;
			} else {
				videoDataItems[i].snippet.channelImg = "";
				videoDataItems[i].snippet.channelSubscriberCount = "";
			}

			const videoDetailsArray = await videoDetailsResponse.data.items;

			if (videoDetailsArray[0] !== undefined) {
				videoDataItems[i].snippet.videoViewCount =
					await videoDetailsArray[0].statistics.viewCount;
				videoDataItems[i].snippet.videoLength = await videoDetailsArray[0]
					.contentDetails.duration;
			}

			videoDataArray.push(videoDataItems[i]);
		}

		setVideoData(videoDataArray);
		setAreNewVideosAtScrollDownLoading(false);
	};

	const getData = async () => {
		const videoCategoryArr = [];

		const videoFilterResponse = await axios(
			`https://www.googleapis.com/youtube/v3/videoCategories?key=${
				import.meta.env.VITE_API_KEY
			}&part=snippet&regionCode=${countryCode}`
		);

		const videoFilterData = await videoFilterResponse.data.items;

		videoCategoryArr.push("All");

		videoFilterData.forEach((item) => {
			videoCategoryArr.push(item.snippet.title);
		});

		videoCategoryArr.push("Recently uploaded");
		videoCategoryArr.push("Watched");

		addVideosArray();
		setVideoCategoryArr(videoCategoryArr);
	};

	const decodeEntity = (str) => {
		let txt = document.createElement("textarea");

		txt.innerHTML = str;

		return txt.value;
	};

	const extractVideoLength = (videoLength) => {
		if (
			videoLength.includes("H") &&
			videoLength.includes("M") &&
			videoLength.includes("S")
		) {
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

	const handleRightScrollVideoCategory = () => {
		rightScrollVideoCategory.current.parentElement.children[2].scrollLeft += 400;
	};

	const handleLeftScrollVideoCategory = () => {
		leftScrollVideoCategory.current.parentElement.children[2].scrollLeft -= 400;
	};

	const handleScrollVideoCategory = () => {
		if (videoCategoryScroll.current.scrollLeft > 0) {
			videoCategoryScroll.current.previousSibling.classList.remove("hidden");
			videoCategoryScroll.current.previousSibling.previousSibling.classList.remove(
				"hidden"
			);
			videoCategoryScroll.current.nextSibling.classList.remove("hidden");
			videoCategoryScroll.current.nextSibling.nextSibling.classList.remove(
				"hidden"
			);
		}

		if (videoCategoryScroll.current.scrollLeft === 0) {
			videoCategoryScroll.current.previousSibling.classList.add("hidden");
			videoCategoryScroll.current.previousSibling.previousSibling.classList.add(
				"hidden"
			);
		}

		if (
			videoCategoryScroll.current.scrollLeft + 1 >=
			videoCategoryScroll.current.scrollWidth -
				videoCategoryScroll.current.clientWidth
		) {
			videoCategoryScroll.current.nextSibling.classList.add("hidden");
			videoCategoryScroll.current.nextSibling.nextSibling.classList.add(
				"hidden"
			);
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

	const channelHoverMouseEnter = (indexId) => {
		setChannelHover({ status: true, id: indexId });
	};

	const channelHoverMouseLeave = () => {
		setChannelHover({ status: false, id: 0 });
	};

	const verifiedBadgeHoverEnter = (indexId) => {
		setVerifiedBadgeHover({ status: true, id: indexId });
	};

	const verifiedBadgeHoverLeave = () => {
		setVerifiedBadgeHover({ status: false, id: 0 });
	};

	const ParseFloat = (str, val) => {
		str = str.toString();
		str = str.slice(0, str.indexOf(".") + val);

		return Number(str);
	};

	useEffect(() => {
		getData();
	}, []);

	const loadImages = (image) => {
		image.src = image.dataset.src;
	};

	const configImgLazyLoad = {
		rootMargin: "0px 0px 0px 0px",
		threshold: 0,
	};

	const configInfiniteScroll = {
		rootMargin: "0px 0px 0px 0px",
		threshold: 1,
	};

	useEffect(() => {
		if (videoData.length === 0) {
			return;
		}

		let observer = new window.IntersectionObserver((entries, self) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadImages(entry.target);
					self.unobserve(entry.target);
				}
			});
		}, configImgLazyLoad);

		const imgs = document.querySelectorAll("[data-src]");
		imgs.forEach((img) => {
			observer.observe(img);
		});

		let observerVideoCardObserver = new window.IntersectionObserver(
			(entry, self) => {
				if (entry[0].isIntersecting) {
					setAreNewVideosAtScrollDownLoading(true);
					addVideosArray();
					self.unobserve(entry[0].target);
				}
			},
			configInfiniteScroll
		);

		const videoCardDiv = document.querySelector(".videoCardParent");

		if (!videoCardDiv.lastElementChild.classList.contains("videoCard")) {
			return;
		}
		observerVideoCardObserver.observe(videoCardDiv.lastElementChild);
	}, [videoData]);

	useEffect(() => {
		if (areNewVideosAtScrollDownLoading) {
			setLoaderInterval1(
				setInterval(() => {
					loader1.current.classList.remove("loader-animation");
					loader2.current.classList.add("loader2-animation");
				}, 900)
			);

			setLoaderInterval2(
				setInterval(() => {
					loader1.current.classList.add("loader-animation");
					loader2.current.classList.remove("loader2-animation");
				}, 1800)
			);

			return;
		}

		clearInterval(loaderInterval1);
		clearInterval(loaderInterval2);
	}, [areNewVideosAtScrollDownLoading]);

	return (
		<div className="w-full">
			{videoCategoryArr.length !== 0 && videoData.length !== 0 ? (
				""
			) : (
				<div
					className={`${
						sidebarBurgerMenuClick ? "ml-[96px]" : "ml-[265px]"
					}`}
				>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						} mb-[68px]`}
					></hr>
					<hr
						className={`${
							themeMode === "dark" || themeMode === "systemDark"
								? "border-[#4d4d4d]"
								: ""
						}`}
					></hr>
				</div>
			)}
			<div
				className={`${
					sidebarBurgerMenuClick ? "ml-[96px]" : "ml-[265px]"
				} mr-[25px] flex justify-center`}
			>
				{videoCategoryArr.length !== 0 && videoData.length !== 0 ? (
					<div
						className={`flex justify-center w-full h-[56px] ${
							themeMode === "dark" || themeMode === "systemDark"
								? "bg-[#0f0f0f]"
								: "bg-[#ffffff]"
						} fixed z-[900]`}
					>
						<div
							className={`relative h-full ${
								sidebarBurgerMenuClick ? "w-[91%]" : "w-[78.5%]"
							}`}
						>
							<div
								className="h-[32px] w-[75px] flex justify-end absolute left-0 top-[12px] hidden"
								style={{
									background: `linear-gradient(90deg, ${
										themeMode === "dark" || themeMode === "systemDark"
											? "rgba(15,15,15,1)"
											: "rgba(255,255,255,1)"
									} 48%, ${
										themeMode === "dark" || themeMode === "systemDark"
											? "rgba(0,0,0,0.1)"
											: "rgba(255,255,255,0.1)"
									} 75%`,
								}}
							></div>
							<div
								className="videoCategoryNavigateBeforeIcon hidden"
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

									if (
										e.currentTarget.classList.contains(
											"videoCategoryNavigateIconMouseDown"
										)
									) {
										e.currentTarget.classList.remove(
											"videoCategoryNavigateBeforeIconHover"
										);
										e.currentTarget.classList.add(
											"videoCategoryNavigateIconMouseOut"
										);
										e.currentTarget.classList.remove(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconActiveDark"
												: "videoCategoryNavigateIconActive"
										);
										e.currentTarget.classList.add(
											"videoCategoryNavigateIconActive2"
										);
										return;
									}
									e.currentTarget.classList.remove(
										themeMode === "dark" || themeMode === "systemDark"
											? "videoCategoryNavigateBeforeIconHoverDark"
											: "videoCategoryNavigateBeforeIconHover"
									);
								}}
								onMouseEnter={(e) => {
									if (
										e.currentTarget.classList.contains(
											"videoCategoryNavigateIconMouseDown"
										)
									) {
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateBeforeIconHoverDark"
												: "videoCategoryNavigateBeforeIconHover"
										);
										e.currentTarget.classList.remove(
											"videoCategoryNavigateIconActive2"
										);
										return;
									}
									e.currentTarget.classList.add(
										themeMode === "dark" || themeMode === "systemDark"
											? "videoCategoryNavigateBeforeIconHoverDark"
											: "videoCategoryNavigateBeforeIconHover"
									);
								}}
								onMouseUp={(e) => {
									if (
										leftScrollVideoCategory.current.classList.contains(
											"videoCategoryNavigateNextIconMouseDown"
										)
									) {
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconAnimationActiveDark"
												: "videoCategoryNavigateIconAnimationActive"
										);
										leftScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateNextIconMouseDown"
										);
										rightScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateIconActive2"
										);
										rightScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateIconMouseOut"
										);
										rightScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateIconMouseDown"
										);
										rightScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateBeforeIconMouseDown"
										);
										return;
									}
									if (
										e.currentTarget.classList.contains(
											"videoCategoryNavigateIconMouseOut"
										)
									) {
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconAnimationActiveDark"
												: "videoCategoryNavigateIconAnimationActive"
										);
										e.currentTarget.classList.remove(
											"videoCategoryNavigateIconMouseDown"
										);
										e.currentTarget.classList.remove(
											"videoCategoryNavigateIconMouseOut"
										);
										rightScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateBeforeIconMouseDown"
										);
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
									e.currentTarget.classList.remove(
										"videoCategoryNavigateIconMouseDown"
									);
									rightScrollVideoCategory.current.classList.remove(
										"videoCategoryNavigateBeforeIconMouseDown"
									);
								}}
								onMouseDown={(e) => {
									if (e.button === 0) {
										rightScrollVideoCategory.current.classList.add(
											"videoCategoryNavigateBeforeIconMouseDown"
										);
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconActiveDark"
												: "videoCategoryNavigateIconActive"
										);
										e.currentTarget.classList.remove(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateBeforeIconHoverDark"
												: "videoCategoryNavigateBeforeIconHover"
										);
										e.currentTarget.classList.add(
											"videoCategoryNavigateIconMouseDown"
										);
									}
									return;
								}}
								ref={leftScrollVideoCategory}
							>
								<ChevronLeft
									color={`${
										themeMode === "systemDark" || themeMode === "dark"
											? "#ffffff"
											: "#000000"
									}`}
									size={16}
								/>
							</div>
							<div
								className={`h-full w-full overflow-scroll scrollbar-hide ${
									themeMode === "dark" || themeMode === "systemDark"
										? "bg-[#0f0f0f]"
										: "bg-[#ffffff]"
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
														? themeMode === "dark" ||
														  themeMode === "systemDark"
															? "bg-white"
															: "bg-black"
														: themeMode === "dark" ||
														  themeMode === "systemDark"
														? "bg-[#272727]"
														: "bg-[#f2f2f2]"
												} text-[14px] ${
													videoCategoryClickedId === index
														? themeMode === "dark" ||
														  themeMode === "systemDark"
															? "text-black"
															: "text-white"
														: themeMode === "dark" ||
														  themeMode === "systemDark"
														? "text-white"
														: "text-black"
												} mr-[12px] px-[12px] rounded-[8px] select-none ${
													videoCategoryClickedId === index
														? ""
														: themeMode === "dark" ||
														  themeMode === "systemDark"
														? "hover:bg-[#3f3f3f]"
														: "hover:bg-[#e5e5e5]"
												} ${
													moreIconActive &&
													!isMouseOutsideMoreIconActive
														? "duration-0"
														: "duration-300"
												} transition-all font-medium`}
												onClick={() =>
													setVideoCategoryClickedId(index)
												}
											>
												<p title={`${item}`}>{item}</p>
											</button>
										);
									})}
								</div>
							</div>
							<div
								className="h-[32px] w-[75px] flex justify-end absolute right-0 top-[12px]"
								style={{
									background: `linear-gradient(90deg, ${
										themeMode === "dark" || themeMode === "systemDark"
											? "rgba(0,0,0,0.1)"
											: "rgba(255,255,255,0.1)"
									} 10%, ${
										themeMode === "dark" || themeMode === "systemDark"
											? "rgba(15,15,15,1)"
											: "rgba(255,255,255,1)"
									} 50%)`,
								}}
							></div>
							<div
								className="videoCategoryNavigateNextIcon"
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

									if (
										e.currentTarget.classList.contains(
											"videoCategoryNavigateIconMouseDown"
										)
									) {
										e.currentTarget.classList.remove(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateNextIconHoverDark"
												: "videoCategoryNavigateNextIconHover"
										);
										e.currentTarget.classList.add(
											"videoCategoryNavigateIconMouseOut"
										);
										e.currentTarget.classList.remove(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconActiveDark"
												: "videoCategoryNavigateIconActive"
										);
										e.currentTarget.classList.add(
											"videoCategoryNavigateIconActive2"
										);
										return;
									}
									e.currentTarget.classList.remove(
										themeMode === "dark" || themeMode === "systemDark"
											? "videoCategoryNavigateNextIconHoverDark"
											: "videoCategoryNavigateNextIconHover"
									);
								}}
								onMouseEnter={(e) => {
									if (
										e.currentTarget.classList.contains(
											"videoCategoryNavigateIconMouseDown"
										)
									) {
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateNextIconHoverDark"
												: "videoCategoryNavigateNextIconHover"
										);
										e.currentTarget.classList.remove(
											"videoCategoryNavigateIconActive2"
										);
										return;
									}
									e.currentTarget.classList.add(
										themeMode === "dark" || themeMode === "systemDark"
											? "videoCategoryNavigateNextIconHoverDark"
											: "videoCategoryNavigateNextIconHover"
									);
								}}
								onMouseUp={(e) => {
									if (
										rightScrollVideoCategory.current.classList.contains(
											"videoCategoryNavigateBeforeIconMouseDown"
										)
									) {
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconAnimationActiveDark"
												: "videoCategoryNavigateIconAnimationActive"
										);
										rightScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateBeforeIconMouseDown"
										);
										leftScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateIconActive2"
										);
										leftScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateIconMouseDown"
										);
										leftScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateIconMouseOut"
										);
										leftScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateNextIconMouseDown"
										);
										return;
									}
									if (
										e.currentTarget.classList.contains(
											"videoCategoryNavigateIconMouseOut"
										)
									) {
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconAnimationActiveDark"
												: "videoCategoryNavigateIconAnimationActive"
										);
										e.currentTarget.classList.remove(
											"videoCategoryNavigateIconMouseDown"
										);
										e.currentTarget.classList.remove(
											"videoCategoryNavigateIconMouseOut"
										);
										leftScrollVideoCategory.current.classList.remove(
											"videoCategoryNavigateNextIconMouseDown"
										);
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
									e.currentTarget.classList.remove(
										"videoCategoryNavigateIconMouseDown"
									);
									leftScrollVideoCategory.current.classList.remove(
										"videoCategoryNavigateNextIconMouseDown"
									);
								}}
								onMouseDown={(e) => {
									if (e.button === 0) {
										leftScrollVideoCategory.current.classList.add(
											"videoCategoryNavigateNextIconMouseDown"
										);
										e.currentTarget.classList.add(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateIconActiveDark"
												: "videoCategoryNavigateIconActive"
										);
										e.currentTarget.classList.remove(
											themeMode === "dark" ||
												themeMode === "systemDark"
												? "videoCategoryNavigateNextIconHoverDark"
												: "videoCategoryNavigateNextIconHover"
										);
										e.currentTarget.classList.add(
											"videoCategoryNavigateIconMouseDown"
										);
									}
									return;
								}}
								ref={rightScrollVideoCategory}
							>
								<ChevronRight
									color={`${
										themeMode === "systemDark" || themeMode === "dark"
											? "#ffffff"
											: "#000000"
									}`}
									size={16}
								/>
							</div>
						</div>
					</div>
				) : (
					""
				)}
				<div
					className={`flex flex-wrap justify-between ${
						videoData.length !== 0 ? "mt-[80px]" : "mt-[18px]"
					} videoCardParent`}
				>
					{videoData.length !== 0
						? videoData.map((item, index) => {
								const videoDate = new Date(item.snippet.publishedAt);
								const currentDate = new Date(Date.now());
								const days = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) /
										86400000
								);
								const hours = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) /
										3600000
								);
								const seconds = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) / 1000
								);
								const minutes = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) / 60000
								);
								const months = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) /
										2629746000
								);
								const weeks = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) /
										604800000
								);
								const years = Math.trunc(
									(currentDate.getTime() - videoDate.getTime()) /
										31556952000
								);

								return (
									<div
										key={item.customId}
										className="w-[340px] rounded-[11px] mb-[42px] cursor-pointer videoCard"
										onMouseEnter={() => handleVideoMouseEnter(index)}
									>
										<div className="w-[340px] h-[190px] relative">
											<div
												className={`h-full w-full absolute left-0 top-0 ${
													themeMode === "dark" ||
													themeMode === "systemDark"
														? "bg-[#3f3f3f]"
														: "bg-[#e5e5e5]"
												} rounded-[12px] z-[100]`}
												style={{ display: "block" }}
											></div>
											{item.snippet.thumbnails.medium.url ? (
												<img
													src=""
													className="w-full h-full rounded-[12px]"
													data-src={
														item.snippet.thumbnails.medium.url
													}
													onLoad={(e) => {
														e.currentTarget.previousElementSibling.style.display =
															"none";
													}}
													height={190}
													width={340}
												/>
											) : (
												<div className="w-full rounded-[12px] bg-[#cccccc]"></div>
											)}
											<div className="absolute bottom-[4px] right-[4px] bg-[#191C23] text-white font-medium text-[12px] px-[5px] rounded-[3px]">
												<p>
													{extractVideoLength(
														item.snippet.videoLength
													)}
												</p>
											</div>
										</div>
										<div className="flex relative">
											<div className="w-[16%] relative mt-[12px]">
												<div
													className={`w-[36px] h-[36px] absolute left-0 top-0 bg-[#cccccc] rounded-full z-[100]`}
												></div>
												<img
													src=""
													className="w-[36px] h-[36px] absolute left-0 top-0 rounded-full"
													data-src={item.snippet.channelImg}
													onLoad={(e) =>
														e.currentTarget.previousSibling.classList.add(
															"hidden"
														)
													}
													width={36}
													height={36}
												/>
											</div>
											<div className="w-full">
												<p
													className={`w-[86%] text-[16px] ${
														themeMode === "dark" ||
														themeMode === "systemDark"
															? "text-white"
															: "text-black"
													} font-medium text-ellipsis leading-[22px] mt-[12px] overflow-hidden line-clamp-2`}
													title={`${decodeEntity(
														item.snippet.title
													)}`}
												>
													{decodeEntity(item.snippet.title)}
												</p>
												<div className="w-full mt-[2px] relative">
													<div
														className={`absolute top-[-52px] left-[-3px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
															channelHover.status &&
															channelHover.id === index
																? "opacity-100"
																: "opacity-0"
														} ${
															channelHover.status &&
															channelHover.id === index
																? "visible"
																: "invisible"
														} transition-all cursor-default`}
													>
														{item.snippet.channelTitle}
													</div>
													<div className="flex items-center">
														{/* TODO fix overflow width  */}
														<div className="max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap">
															<p
																className={`inline text-[14px] ${
																	themeMode === "dark" ||
																	themeMode === "systemDark"
																		? "text-[#a5a5a5]"
																		: "text-[#777777]"
																} mr-[5px]`}
																onMouseEnter={() =>
																	channelHoverMouseEnter(index)
																}
																onMouseLeave={() =>
																	channelHoverMouseLeave(index)
																}
																title={
																	item.snippet.channelTitle
																}
															>
																{item.snippet.channelTitle}
															</p>
														</div>
														{item.snippet
															.channelSubscriberCount >=
														100000 ? (
															<div className="relative">
																<div
																	className={`absolute top-[-55px] left-[-24px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
																		verifiedBadgeHover.status &&
																		verifiedBadgeHover.id ===
																			index
																			? "opacity-100"
																			: "opacity-0"
																	} ${
																		verifiedBadgeHover.status &&
																		verifiedBadgeHover.id ===
																			index
																			? "visible"
																			: "invisible"
																	} transition-all cursor-default`}
																>
																	Verified
																</div>
																<div
																	className="relative w-[12px] h-[12px] rounded-[50%] bg-[#5e5e5e] pt-[1px] pl-[1px]"
																	onMouseEnter={() =>
																		verifiedBadgeHoverEnter(
																			index
																		)
																	}
																	onMouseLeave={() =>
																		verifiedBadgeHoverLeave(
																			index
																		)
																	}
																>
																	<Check2
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
															themeMode === "dark" ||
															themeMode === "systemDark"
																? "text-[#a5a5a5]"
																: "text-[#777777]"
														} leading-[16px]`}
													>
														{item.snippet.videoViewCount !==
														undefined
															? Number(
																	item.snippet.videoViewCount
															  ) === 1
																? item.snippet.videoViewCount +
																  " view"
																: item.snippet.videoViewCount
																		.length <= 3
																? item.snippet.videoViewCount +
																  " views"
																: item.snippet.videoViewCount
																		.length <= 4
																? ParseFloat(
																		(Number(
																			item.snippet
																				.videoViewCount
																		) / 1000,
																		2)
																  ) + "k views"
																: item.snippet.videoViewCount
																		.length <= 6
																? ParseFloat(
																		Number(
																			item.snippet
																				.videoViewCount
																		) / 1000,
																		0
																  ) + "k views"
																: item.snippet.videoViewCount
																		.length <= 7
																? ParseFloat(
																		Number(
																			item.snippet
																				.videoViewCount
																		) / 1000000,
																		2
																  ) + "M views"
																: item.snippet.videoViewCount
																		.length <= 9
																? ParseFloat(
																		Number(
																			item.snippet
																				.videoViewCount
																		) / 1000000,
																		0
																  ) + "M views"
																: item.snippet.videoViewCount
																		.length <= 10
																? ParseFloat(
																		Number(
																			item.snippet
																				.videoViewCount
																		) / 1000000000,
																		2
																  ) + "B views"
																: item.snippet.videoViewCount
																		.length <= 12
																? ParseFloat(
																		Number(
																			item.snippet
																				.videoViewCount
																		) / 1000000000,
																		0
																  ) + "B views"
																: item.snippet.videoViewCount +
																  " views"
															: "? views"}
														&nbsp;&#x2022;&nbsp;
														{years != 0
															? years +
															  `${
																	years === 1
																		? " year"
																		: " years"
															  } ago`
															: months != 0
															? months +
															  `${
																	months === 1
																		? " month"
																		: " months"
															  } ago`
															: weeks != 0
															? weeks +
															  `${
																	weeks === 1
																		? " week"
																		: " weeks"
															  } ago`
															: days != 0
															? days +
															  `${
																	days === 1 ? " day" : " days"
															  } ago`
															: hours != 0
															? hours +
															  `${
																	hours === 1
																		? " hour"
																		: " hours"
															  } ago`
															: minutes != 0
															? minutes +
															  `${
																	minutes === 1
																		? " minute"
																		: " minutes"
															  } ago`
															: seconds != 0
															? seconds +
															  `${
																	seconds === 1
																		? " second"
																		: " seconds"
															  } ago`
															: ""}
													</p>
												</div>
											</div>
											<div
												className={`${
													videoMoreIconActive.status &&
													videoMoreIconClickId === index
														? ""
														: "videoMoreIconHidden"
												} ${
													themeMode === "dark" ||
													themeMode === "systemDark"
														? "videoMoreIconDark"
														: "videoMoreIcon"
												}`}
												onClick={(e) =>
													handleVideoMoreIconClick(e, index)
												}
											>
												<ThreeDotsVertical
													color={`${
														themeMode === "systemDark" ||
														themeMode === "dark"
															? "#ffffff"
															: "#000000"
													}`}
													size={18}
												/>
											</div>
										</div>
									</div>
								);
						  })
						: [...Array(12).keys()].map((index) => {
								return (
									<div
										className="w-[340px] rounded-[9px] mb-[50px]"
										key={index}
									>
										<div
											className={`w-full h-[193px] ${
												themeMode === "dark" ||
												themeMode === "systemDark"
													? "bg-[#3f3f3f]"
													: "bg-[#e5e5e5]"
											} rounded-[9px]`}
										></div>
										<div className="flex mt-[12px]">
											<div
												className={`w-[36px] h-[36px] rounded-full ${
													themeMode === "dark" ||
													themeMode === "systemDark"
														? "bg-[#3f3f3f]"
														: "bg-[#e5e5e5]"
												}`}
											></div>
											<div className="ml-[12px]">
												<div
													className={`w-[266px] h-[20px] ${
														themeMode === "dark" ||
														themeMode === "systemDark"
															? "bg-[#3f3f3f]"
															: "bg-[#e5e5e5]"
													} mt-[-2px]`}
												></div>
												<div
													className={`w-[177px] h-[20px] ${
														themeMode === "dark" ||
														themeMode === "systemDark"
															? "bg-[#3f3f3f]"
															: "bg-[#e5e5e5]"
													} mt-[10px]`}
												></div>
											</div>
										</div>
									</div>
								);
						  })}
					{areNewVideosAtScrollDownLoading ? (
						<div className="flex flex-col items-center">
							<div className="flex flex-wrap justify-between">
								{[...Array(6).keys()].map((index) => {
									return (
										<div
											className="w-[340px] rounded-[9px] mb-[50px]"
											key={index}
										>
											<div
												className={`w-full h-[193px] ${
													themeMode === "dark" ||
													themeMode === "systemDark"
														? "bg-[#3f3f3f]"
														: "bg-[#e5e5e5]"
												} rounded-[9px]`}
											></div>
											<div className="flex mt-[12px]">
												<div
													className={`w-[36px] h-[36px] rounded-full ${
														themeMode === "dark" ||
														themeMode === "systemDark"
															? "bg-[#3f3f3f]"
															: "bg-[#e5e5e5]"
													}`}
												></div>
												<div className="ml-[12px]">
													<div
														className={`w-[266px] h-[20px] ${
															themeMode === "dark" ||
															themeMode === "systemDark"
																? "bg-[#3f3f3f]"
																: "bg-[#e5e5e5]"
														} mt-[-2px]`}
													></div>
													<div
														className={`w-[177px] h-[20px] ${
															themeMode === "dark" ||
															themeMode === "systemDark"
																? "bg-[#3f3f3f]"
																: "bg-[#e5e5e5]"
														} mt-[10px]`}
													></div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="loader-container mb-[10px]">
								<div className="loader-dot"></div>
								<div
									className={`${
										themeMode === "dark" || themeMode === "systemDark"
											? "loader-dark"
											: "loader"
									} loader-animation`}
									ref={loader1}
								>
									<div
										className={`${
											themeMode === "dark" ||
											themeMode === "systemDark"
												? "loader-hole-dark"
												: "loader-hole"
										}`}
									></div>
								</div>
								<div
									className={`${
										themeMode === "dark" || themeMode === "systemDark"
											? "loader2-dark"
											: "loader2"
									}`}
									ref={loader2}
								>
									<div
										className={`${
											themeMode === "dark" ||
											themeMode === "systemDark"
												? "loader-hole-dark"
												: "loader-hole"
										}`}
									></div>
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};
