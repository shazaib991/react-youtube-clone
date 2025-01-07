import {useCallback, useEffect} from "react";
import axios from "axios";
import "./HomeSectionStyle.css";
import {ChevronLeftVideoCategory} from "./ChevronLeftVideoCategory";
import {VideoCategory} from "./VideoCategory";
import {ChevronRightVideoCategory} from "./ChevronRightVideoCategory";
import {Video} from "./Video";
import {countries, zones} from "moment-timezone/data/meta/latest.json";
import {useDispatch, useSelector} from "react-redux";
import {changeLocation} from "../../states/States1";
import {changeVideoCategoryArr} from "../../states/States2";
import {changeVideoData} from "../../states/States2";
import {changeAreNewVideosAtScrollDownLoading} from "../../states/States3";
import {changeNextPageToken} from "../../states/States3";

export const HomeSection = () => {
	const dispatch = useDispatch();
	const sidebarBurgerMenuClick = useSelector((state) => state.states.value.sidebarBurgerMenuClick);
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const userLocation = useSelector((state) => state.states.value.userLocation);
	const videoCategoryArr = useSelector((state) => state.states2.value.videoCategoryArr);
	const videoData = useSelector((state) => state.states2.value.videoData);
	const nextPageToken = useSelector((state) => state.states3.value.nextPageToken);
	const timeZoneCityToCountry = {};
	let userCity;
	let userTimeZone;

	const addVideosArray = useCallback(
		async (countryCode) => {
			const videoDataArray = [...videoData];

			const videoResponse = await axios(
				`https://www.googleapis.com/youtube/v3/search?key=${
					import.meta.env.VITE_API_KEY
				}&part=snippet&maxResults=12&type=video&regionCode=${userLocation || countryCode}&pageToken=${nextPageToken}`
			);

			dispatch(changeNextPageToken(await videoResponse.data.nextPageToken));

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
				const videoPlayerResponse = await axios(
					`https://www.googleapis.com/youtube/v3/videos?key=${import.meta.env.VITE_API_KEY}&part=player&id=${
						videoDataItems[i].id.videoId
					}`
				);
				videoDataItems[i].customId = uniqueVideoId;

				const channelDataArray = await channelResponse.data.items;
				const channelStatisticsDataArray = await channelStatisticsResponse.data.items;
				const videoPlayerDataArray = await videoPlayerResponse.data.items;

				if (channelDataArray !== undefined) {
					videoDataItems[i].snippet.channelImg = await channelDataArray[0].snippet.thumbnails.default.url;
					videoDataItems[i].snippet.channelSubscriberCount = await channelStatisticsDataArray[0].statistics
						.subscriberCount;
					videoDataItems[i].snippet.videoPlayer = await videoPlayerDataArray[0].player;
					videoDataItems[i].snippet.videoId = await videoDataItems[i].id.videoId;
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

			dispatch(changeVideoData(videoDataArray));
			dispatch(changeAreNewVideosAtScrollDownLoading(false));
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
			dispatch(changeVideoCategoryArr(videoCategoryArr));
		},
		[addVideosArray]
	);

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
			dispatch(changeLocation(timeZoneCityToCountry[userCity]["abbr"]));
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
				dispatch(changeAreNewVideosAtScrollDownLoading(true));
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
				<div className={`ml-[29px] max-md:ml-0`}>
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
							className={`relative h-full max-md:w-full ${
								sidebarBurgerMenuClick ? "w-[calc(100%-124px)]" : "w-[calc(100%-261px)]"
							}`}
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
							<ChevronLeftVideoCategory />
							<VideoCategory />
							<div
								className={`h-[34px] w-[125px] flex justify-end absolute top-[11px] right-[-2px] max-md:right-0`}
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
							<ChevronRightVideoCategory />
						</div>
					</div>
				) : (
					""
				)}
				<Video />
			</div>
		</div>
	);
};
