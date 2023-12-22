import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./HomeSectionStyle.css";

export const HomeSection = ({
  sidebarBurgerMenuClick,
  handleVideoMoreIconClick,
  videoMoreIconActive,
  videoMoreIconClickId,
  leftScrollVideoCategory,
  handleVideoMouseEnter,
}) => {
  const [videoCategoryClickedId, setVideoCategoryClickedId] = useState(0);
  const [videoCategoryArr, setVideoCategoryArr] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [channelHover, setChannelHover] = useState({ status: false, id: 0 });
  const [verifiedBadgeHover, setVerifiedBadgeHover] = useState({
    status: false,
    id: 0,
  });
  const videoCategoryScroll = useRef();
  const rightScrollVideoCategory = useRef();
  let isMouseDown = false;
  let startX;
  let currentPos;

  const getData = async () => {
    const countryCode = "US";
    const videoCategoryArr = [];

    const videoFilterResponse = await axios(
      `https://www.googleapis.com/youtube/v3/videoCategories?key=${
        import.meta.env.VITE_API_KEY
      }&part=snippet&regionCode=${countryCode}`
    );
    const videoResponse = await axios(
      `https://www.googleapis.com/youtube/v3/search?key=${
        import.meta.env.VITE_API_KEY
      }&part=snippet&maxResults=12&type=video&regionCode=${countryCode}`
    );

    const videoFilterData = await videoFilterResponse.data.items;
    const videoData = await videoResponse.data.items;

    videoCategoryArr.push("All");

    videoFilterData.forEach((item) => {
      videoCategoryArr.push(item.snippet.title);
    });

    for (let i = 0; i < videoData.length; i++) {
      const channelResponse = await axios(
        `https://www.googleapis.com/youtube/v3/channels?key=${
          import.meta.env.VITE_API_KEY
        }&part=snippet&id=${videoData[i].snippet.channelId}`
      );
      const channelStatisticsResponse = await axios(
        `https://www.googleapis.com/youtube/v3/channels?key=${
          import.meta.env.VITE_API_KEY
        }&part=statistics&id=${videoData[i].snippet.channelId}`
      );
      const videoDetailsResponse = await axios(
        `https://www.googleapis.com/youtube/v3/videos?key=${
          import.meta.env.VITE_API_KEY
        }&part=statistics&part=contentDetails&id=${videoData[i].id.videoId}`
      );

      const channelDataArray = await channelResponse.data.items;
      const channelStatisticsDataArray = await channelStatisticsResponse.data
        .items;

      if (channelDataArray !== undefined) {
        videoData[i].snippet.channelImg = await channelDataArray[0].snippet
          .thumbnails.default.url;
        videoData[i].snippet.channelSubscriberCount =
          await channelStatisticsDataArray[0].statistics.subscriberCount;
      } else {
        videoData[i].snippet.channelImg = "";
        videoData[i].snippet.channelSubscriberCount = "";
      }

      const videoDetailsArray = await videoDetailsResponse.data.items;

      if (videoDetailsArray[0] !== undefined) {
        videoData[i].snippet.videoViewCount = await videoDetailsArray[0]
          .statistics.viewCount;
        videoData[i].snippet.videoLength = await videoDetailsArray[0]
          .contentDetails.duration;
      }
    }

    setVideoCategoryArr(videoCategoryArr);
    setVideoData(videoData);
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
    } else if (videoCategoryScroll.current.scrollLeft === 0) {
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

  return (
    <div className="w-full">
      {videoCategoryArr.length !== 0 ? (
        ""
      ) : (
        <div
          className={`${sidebarBurgerMenuClick ? "ml-[96px]" : "ml-[265px]"}`}
        >
          <div className="w-full h-[1px] bg-[#e5e5e5] mb-[68px]"></div>
          <div className="w-full h-[1px] bg-[#e5e5e5]"></div>
        </div>
      )}
      <div
        className={`${
          sidebarBurgerMenuClick ? "ml-[96px]" : "ml-[265px]"
        } mr-[25px] flex justify-center`}
      >
        {videoCategoryArr.length !== 0 ? (
          <div className="flex justify-center w-full h-[56px] bg-white fixed z-[900]">
            <div
              className={`relative h-full ${
                sidebarBurgerMenuClick ? "w-[91%]" : "w-[78.5%]"
              }`}
            >
              <div
                className="h-[32px] w-[75px] flex justify-end absolute left-0 top-[12px] hidden"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,1) 48%, rgba(255,255,255,0.1) 75%",
                }}
              ></div>
              <div
                className="videoCategoryNavigateBeforeIcon"
                onClick={handleLeftScrollVideoCategory}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconTransitionActive"
                  );
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconAnimationActive"
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
                      "videoCategoryNavigateIconActive"
                    );
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconActive2"
                    );
                    return;
                  }
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateBeforeIconHover"
                  );
                }}
                onMouseEnter={(e) => {
                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateNextIconMouseDown"
                    )
                  ) {
                    return;
                  }
                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateIconMouseDown"
                    )
                  ) {
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateBeforeIconHover"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconActive2"
                    );
                    return;
                  }
                  e.currentTarget.classList.add(
                    "videoCategoryNavigateBeforeIconHover"
                  );
                }}
                onMouseUp={(e) => {
                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateIconMouseOut"
                    )
                  ) {
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconAnimationActive"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconMouseDown"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconMouseOut"
                    );
                    return;
                  }
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconActive"
                  );
                  e.currentTarget.classList.add(
                    "videoCategoryNavigateIconTransitionActive"
                  );
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconMouseDown"
                  );
                }}
                onMouseDown={(e) => {
                  if (e.button === 0) {
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconActive"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateBeforeIconHover"
                    );
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconMouseDown"
                    );
                  }
                  return;
                }}
                ref={leftScrollVideoCategory}
              >
                <NavigateBeforeIcon />
              </div>
              <div
                className="h-full w-full overflow-scroll scrollbar-hide bg-white scroll-smooth"
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
                            ? "bg-black"
                            : "bg-[#f2f2f2]"
                        } text-[14px] ${
                          videoCategoryClickedId === index ? "text-white" : ""
                        } mr-[12px] px-[12px] rounded-[8px] select-none ${
                          videoCategoryClickedId === index
                            ? ""
                            : "hover:bg-[#eaeaea]"
                        } transition-all duration-300 font-medium`}
                        onClick={() => setVideoCategoryClickedId(index)}
                      >
                        <p title={`${item}`}>{item}</p>
                      </button>
                    );
                  })}
                  {/* TODO:  click active*/}
                  {videoCategoryArr.length !== 0 ? (
                    <div>
                      <button className="h-[32px] bg-[#f2f2f2] text-[14px] mr-[10px] px-[12px] rounded-[8px] select-none hover:bg-[#eaeaea] transition-all">
                        Recently uploaded
                      </button>
                      <button className="h-[32px] bg-[#f2f2f2] text-[14px] px-[12px] rounded-[8px] select-none hover:bg-[#eaeaea] transition-all">
                        Watched
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                className="h-[32px] w-[75px] flex justify-end absolute right-0 top-[12px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.1) 10%, rgba(255,255,255,1) 50%)",
                }}
              ></div>
              <div
                className="videoCategoryNavigateNextIcon"
                onClick={handleRightScrollVideoCategory}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconTransitionActive"
                  );
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconAnimationActive"
                  );

                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateIconMouseDown"
                    )
                  ) {
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateNextIconHover"
                    );
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconMouseOut"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconActive"
                    );
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconActive2"
                    );
                    return;
                  }
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateNextIconHover"
                  );
                }}
                onMouseEnter={(e) => {
                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateBeforeIconMouseDown"
                    )
                  ) {
                    return;
                  }
                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateIconMouseDown"
                    )
                  ) {
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateNextIconHover"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconActive2"
                    );
                    return;
                  }
                  e.currentTarget.classList.add(
                    "videoCategoryNavigateNextIconHover"
                  );
                }}
                onMouseUp={(e) => {
                  if (
                    e.currentTarget.classList.contains(
                      "videoCategoryNavigateIconMouseOut"
                    )
                  ) {
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconAnimationActive"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconMouseDown"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateIconMouseOut"
                    );
                    return;
                  }
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconActive"
                  );
                  e.currentTarget.classList.add(
                    "videoCategoryNavigateIconTransitionActive"
                  );
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateIconMouseDown"
                  );
                  e.currentTarget.classList.remove(
                    "videoCategoryNavigateNextIconMouseDown"
                  );
                }}
                onMouseDown={(e) => {
                  if (e.button === 0) {
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateNextIconMouseDown"
                    );
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconActive"
                    );
                    e.currentTarget.classList.remove(
                      "videoCategoryNavigateNextIconHover"
                    );
                    e.currentTarget.classList.add(
                      "videoCategoryNavigateIconMouseDown"
                    );
                  }
                  return;
                }}
                ref={rightScrollVideoCategory}
              >
                <NavigateNextIcon />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`flex flex-wrap justify-between ${
            videoData.length !== 0 ? "mt-[80px]" : "mt-[18px]"
          }`}
        >
          {videoData.length !== 0
            ? videoData.map((item, index) => {
                const videoDate = new Date(item.snippet.publishedAt);
                const currentDate = new Date(Date.now());
                const days = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 86400000
                );
                const hours = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 3600000
                );
                const seconds = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 1000
                );
                const minutes = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 60000
                );
                const months = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 2629746000
                );
                const weeks = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 604800000
                );
                const years = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 31556952000
                );

                return (
                  <div
                    key={item.etag}
                    className="w-[343px] rounded-[11px] mb-[42px] cursor-pointer videoCard"
                    onMouseEnter={() => handleVideoMouseEnter(index)}
                  >
                    <div className="relative">
                      <img
                        src={item.snippet.thumbnails.medium.url}
                        alt="youtube thumbnail image"
                        className="w-full rounded-[12px]"
                      />
                      <div className="absolute bottom-[4px] right-[4px] bg-[#191C23] text-white font-medium text-[12px] px-[5px] rounded-[3px]">
                        <p>{extractVideoLength(item.snippet.videoLength)}</p>
                      </div>
                    </div>
                    <div className="flex relative">
                      <img
                        src={item.snippet.channelImg}
                        alt="youtube channel image"
                        className="h-[36px] w-[36px] rounded-full mr-[11px] mt-[11px]"
                      />
                      <div className="w-full">
                        <p
                          className="w-[90%] text-[16px] font-medium text-ellipsis leading-[22px] mt-[11px] overflow-hidden line-clamp-2"
                          title={`${decodeEntity(item.snippet.title)}`}
                        >
                          {decodeEntity(item.snippet.title)}
                        </p>
                        <div className="w-full mt-[2px] relative">
                          <div
                            className={`absolute top-[-52px] left-[-3px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
                              channelHover.status && channelHover.id === index
                                ? "opacity-100"
                                : "opacity-0"
                            } ${
                              channelHover.status && channelHover.id === index
                                ? "visible"
                                : "invisible"
                            } transition-all cursor-default`}
                          >
                            {item.snippet.channelTitle}
                          </div>
                          <div className="flex items-center">
                            <div className="max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap">
                              <p
                                className="inline text-[14px] text-[#626262] mr-[5px]"
                                onMouseEnter={() =>
                                  channelHoverMouseEnter(index)
                                }
                                onMouseLeave={() =>
                                  channelHoverMouseLeave(index)
                                }
                                title={item.snippet.channelTitle}
                              >
                                {item.snippet.channelTitle}
                              </p>
                            </div>
                            {item.snippet.channelSubscriberCount >= 100000 ? (
                              <div className="relative">
                                <div
                                  className={`absolute top-[-55px] left-[-24px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
                                    verifiedBadgeHover.status &&
                                    verifiedBadgeHover.id === index
                                      ? "opacity-100"
                                      : "opacity-0"
                                  } ${
                                    verifiedBadgeHover.status &&
                                    verifiedBadgeHover.id === index
                                      ? "visible"
                                      : "invisible"
                                  } transition-all cursor-default`}
                                >
                                  Verified
                                </div>
                                <div
                                  className="w-[12px] h-[12px] rounded-[50%] bg-[#5e5e5e] pt-[1px] pl-[1px]"
                                  onMouseEnter={() =>
                                    verifiedBadgeHoverEnter(index)
                                  }
                                  onMouseLeave={() =>
                                    verifiedBadgeHoverLeave(index)
                                  }
                                >
                                  <svg
                                    width="10.5px"
                                    height="10.8px"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    color="#ffffff"
                                  >
                                    <path
                                      d="M5 13L9 17L19 7"
                                      stroke="#ffffff"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-[14px] text-[#626262] leading-[16px]">
                            {item.snippet.videoViewCount !== undefined
                              ? Number(item.snippet.videoViewCount) === 1
                                ? item.snippet.videoViewCount + " view"
                                : item.snippet.videoViewCount.length <= 3
                                ? item.snippet.videoViewCount + " views"
                                : item.snippet.videoViewCount.length <= 4
                                ? ParseFloat(
                                    (Number(item.snippet.videoViewCount) / 1000,
                                    2)
                                  ) + "k views"
                                : item.snippet.videoViewCount.length <= 6
                                ? ParseFloat(
                                    Number(item.snippet.videoViewCount) / 1000,
                                    0
                                  ) + "k views"
                                : item.snippet.videoViewCount.length <= 7
                                ? ParseFloat(
                                    Number(item.snippet.videoViewCount) /
                                      1000000,
                                    2
                                  ) + "M views"
                                : item.snippet.videoViewCount.length <= 9
                                ? ParseFloat(
                                    Number(item.snippet.videoViewCount) /
                                      1000000,
                                    0
                                  ) + "M views"
                                : item.snippet.videoViewCount.length <= 10
                                ? ParseFloat(
                                    Number(item.snippet.videoViewCount) /
                                      1000000000,
                                    2
                                  ) + "B views"
                                : item.snippet.videoViewCount.length <= 12
                                ? ParseFloat(
                                    Number(item.snippet.videoViewCount) /
                                      1000000000,
                                    0
                                  ) + "B views"
                                : item.snippet.videoViewCount + " views"
                              : "? views"}
                            &nbsp;&#x2022;&nbsp;
                            {years != 0
                              ? years +
                                `${years === 1 ? " year" : " years"} ago`
                              : months != 0
                              ? months +
                                `${months === 1 ? " month" : " months"} ago`
                              : weeks != 0
                              ? weeks +
                                `${weeks === 1 ? " week" : " weeks"} ago`
                              : days != 0
                              ? days + `${days === 1 ? " day" : " days"} ago`
                              : hours != 0
                              ? hours +
                                `${hours === 1 ? " hour" : " hours"} ago`
                              : minutes != 0
                              ? minutes +
                                `${minutes === 1 ? " minute" : " minutes"} ago`
                              : seconds != 0
                              ? seconds +
                                `${seconds === 1 ? " second" : " seconds"} ago`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`videoMoreIcon ${
                          videoMoreIconActive.status &&
                          videoMoreIconClickId === index
                            ? ""
                            : "videoMoreIconHidden"
                        }`}
                        onClick={(e) => handleVideoMoreIconClick(e, index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })
            : [...Array(12).keys()].map((index) => {
                return (
                  <div
                    className="w-[343px] rounded-[9px] mb-[50px]"
                    key={index}
                  >
                    <div className="w-full h-[193px] bg-[#cccccc] rounded-[9px]"></div>
                    <div className="flex mt-[12px]">
                      <div className="w-[36px] h-[36px] rounded-full bg-[#e3e3e3]"></div>
                      <div className="ml-[12px]">
                        <div className="w-[266px] h-[20px] bg-[#e3e3e3] mt-[-2px]"></div>
                        <div className="w-[177px] h-[20px] bg-[#e3e3e3] mt-[10px]"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
