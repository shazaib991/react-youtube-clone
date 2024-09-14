import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import "./HomeSectionStyle.css";
import {ChevronLeftVideoCategory} from "./ChevronLeftVideoCategory";
import {VideoCategory} from "./VideoCategory";
import {ChevronRightVideoCategory} from "./ChevronRightVideoCategory";
import {Video} from "./Video";
import PropTypes from "prop-types";
import {countries, zones} from "moment-timezone/data/meta/latest.json";

export const HomeSection = ({
	sidebarBurgerMenuClick,
	userLocation,
	setUserLocation,
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
	const [areNewVideosAtScrollDownLoading, setAreNewVideosAtScrollDownLoading] = useState(false);
	const [nextPageToken, setNextPageToken] = useState("");
	// const countryCode = "US";
	const timeZoneCityToCountry = {};
	// let userRegion;
	let userCity;
	// let userCountry;
	let userTimeZone;

	const addVideosArray = useCallback(
		async (countryCode) => {
			const videoDataArray = [...videoData];

			const videoResponse = await axios(
				`https://www.googleapis.com/youtube/v3/search?key=${
					import.meta.env.VITE_API_KEY
				}&part=snippet&maxResults=12&type=video&regionCode=${userLocation || countryCode}&pageToken=${nextPageToken}`
			);

			setNextPageToken(await videoResponse.data.nextPageToken);

			const videoDataItems = await videoResponse.data.items;

			for (let i = 0; i < videoDataItems.length; i++) {
				const uniqueVideoId = Math.random().toString(16).slice(2);
				const channelResponse = await axios(
					`https://www.googleapis.com/youtube/v3/channels?key=${import.meta.env.VITE_API_KEY}&part=snippet&id=${
						videoDataItems[i].snippet.channelId
					}`
				);
				const channelStatisticsResponse = await axios(
					`https://www.googleapis.com/youtube/v3/channels?key=${import.meta.env.VITE_API_KEY}&part=statistics&id=${
						videoDataItems[i].snippet.channelId
					}`
				);
				const videoDetailsResponse = await axios(
					`https://www.googleapis.com/youtube/v3/videos?key=${
						import.meta.env.VITE_API_KEY
					}&part=statistics&part=contentDetails&id=${videoDataItems[i].id.videoId}`
				);
				videoDataItems[i].customId = uniqueVideoId;

				const channelDataArray = await channelResponse.data.items;
				const channelStatisticsDataArray = await channelStatisticsResponse.data.items;

				if (channelDataArray !== undefined) {
					videoDataItems[i].snippet.channelImg = await channelDataArray[0].snippet.thumbnails.default.url;
					videoDataItems[i].snippet.channelSubscriberCount = await channelStatisticsDataArray[0].statistics
						.subscriberCount;
				} else {
					videoDataItems[i].snippet.channelImg = "";
					videoDataItems[i].snippet.channelSubscriberCount = "";
				}

				const videoDetailsArray = await videoDetailsResponse.data.items;

				if (videoDetailsArray[0] !== undefined) {
					videoDataItems[i].snippet.videoViewCount = await videoDetailsArray[0].statistics.viewCount;
					videoDataItems[i].snippet.videoLength = await videoDetailsArray[0].contentDetails.duration;
				}

				videoDataArray.push(videoDataItems[i]);
			}

			setVideoData(videoDataArray);
			setAreNewVideosAtScrollDownLoading(false);
		},
		[nextPageToken, videoData]
	);

	const getData = useCallback(
		async (countryCode) => {
			const videoCategoryArr = [];

			const videoFilterResponse = await axios(
				`https://www.googleapis.com/youtube/v3/videoCategories?key=${
					import.meta.env.VITE_API_KEY
				}&part=snippet&regionCode=${userLocation || countryCode}`
			);

			const videoFilterData = await videoFilterResponse.data.items;

			videoCategoryArr.push("All");

			videoFilterData.forEach((item) => {
				videoCategoryArr.push(item.snippet.title);
			});

			videoCategoryArr.push("Recently uploaded");
			videoCategoryArr.push("Watched");

			addVideosArray(userLocation || countryCode);
			setVideoCategoryArr(videoCategoryArr);
		},
		[addVideosArray]
	);

	const handleRightScrollVideoCategory = () => {
		rightScrollVideoCategory.current.parentElement.children[2].scrollLeft += 400;
	};

	const handleLeftScrollVideoCategory = () => {
		leftScrollVideoCategory.current.parentElement.children[2].scrollLeft -= 400;
	};

	useEffect(() => {
		//https://www.techighness.com/post/get-user-country-and-region-on-browser-with-javascript-only/
		Object.keys(zones).forEach((z) => {
			const cityArr = z.split("/");
			const city = cityArr[cityArr.length - 1];
			timeZoneCityToCountry[city] = countries[zones[z].countries[0]];
		});

		if (Intl) {
			userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			var tzArr = userTimeZone.split("/");
			// userRegion = tzArr[0];
			userCity = tzArr[tzArr.length - 1];
			setUserLocation(timeZoneCityToCountry[userCity]["abbr"]);
			// userCountry = timeZoneCityToCountry[userCity];

			// console.log(JSON.stringify(timeZoneCityToCountry[userCity]["abbr"], null, 2));
		}
		getData(timeZoneCityToCountry[userCity]["abbr"]);
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

		let observerVideoCardObserver = new window.IntersectionObserver((entry, self) => {
			if (entry[0].isIntersecting) {
				setAreNewVideosAtScrollDownLoading(true);
				addVideosArray();
				self.unobserve(entry[0].target);
			}
		}, configInfiniteScroll);

		const videoCardDiv = document.querySelector(".videoCardParent");

		if (!videoCardDiv.lastElementChild.classList.contains("videoCard")) {
			return;
		}
		observerVideoCardObserver.observe(videoCardDiv.lastElementChild);
	}, [videoData]);

	return (
		<div className="w-full">
			{videoCategoryArr.length !== 0 && videoData.length !== 0 ? (
				""
			) : (
				<div className={`ml-[29px]`}>
					<hr
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""} mb-[68px]`}
					></hr>
					<hr className={`${themeMode === "dark" || themeMode === "systemDark" ? "border-[#4d4d4d]" : ""}`}></hr>
				</div>
			)}
			<div className={`mr-[27px] max-md:mr-0 flex justify-center`}>
				{videoCategoryArr.length !== 0 && videoData.length !== 0 ? (
					<div
						className={`max-md:pl-[13px] flex justify-center w-full h-[56px] ${
							themeMode === "dark" || themeMode === "systemDark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
						} fixed z-[900]`}
					>
						<div
							className={`relative h-full ${
								sidebarBurgerMenuClick ? "w-[calc(100%-115px)]" : "w-[calc(100%-258px)]"
							} max-md:w-full`}
						>
							<div
								className={`h-[35px] w-[75px] flex justify-end absolute left-[-2px] max-md:left-0 top-[10px] hidden`}
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
							<ChevronLeftVideoCategory
								sidebarBurgerMenuClick={sidebarBurgerMenuClick}
								handleLeftScrollVideoCategory={handleLeftScrollVideoCategory}
								themeMode={themeMode}
								leftScrollVideoCategory={leftScrollVideoCategory}
								rightScrollVideoCategory={rightScrollVideoCategory}
							/>
							<VideoCategory
								videoCategoryArr={videoCategoryArr}
								videoCategoryClickedId={videoCategoryClickedId}
								themeMode={themeMode}
								sidebarBurgerMenuClick={sidebarBurgerMenuClick}
								moreIconActive={moreIconActive}
								isMouseOutsideMoreIconActive={isMouseOutsideMoreIconActive}
								setVideoCategoryClickedId={setVideoCategoryClickedId}
							/>
							<div
								className={`h-[34px] w-[125px] flex justify-end absolute top-[12px] right-[-2px] max-md:right-0`}
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
							<ChevronRightVideoCategory
								handleRightScrollVideoCategory={handleRightScrollVideoCategory}
								themeMode={themeMode}
								sidebarBurgerMenuClick={sidebarBurgerMenuClick}
								rightScrollVideoCategory={rightScrollVideoCategory}
								leftScrollVideoCategory={leftScrollVideoCategory}
							/>
						</div>
					</div>
				) : (
					""
				)}
				<Video
					videoData={videoData}
					handleVideoMouseEnter={handleVideoMouseEnter}
					themeMode={themeMode}
					handleVideoMoreIconClick={handleVideoMoreIconClick}
					videoMoreIconClickId={videoMoreIconClickId}
					videoMoreIconActive={videoMoreIconActive}
					areNewVideosAtScrollDownLoading={areNewVideosAtScrollDownLoading}
				/>
			</div>
		</div>
	);
};

HomeSection.propTypes = {
	sidebarBurgerMenuClick: PropTypes.bool,
	userLocation: PropTypes.string,
	setUserLocation: PropTypes.func,
	handleVideoMoreIconClick: PropTypes.func,
	moreIconActive: PropTypes.bool,
	videoMoreIconActive: PropTypes.object,
	isMouseOutsideMoreIconActive: PropTypes.bool,
	videoMoreIconClickId: PropTypes.number,
	themeMode: PropTypes.string,
	leftScrollVideoCategory: PropTypes.object,
	rightScrollVideoCategory: PropTypes.object,
	handleVideoMouseEnter: PropTypes.func,
};
