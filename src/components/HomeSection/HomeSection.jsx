import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { decode } from "html-entities";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const HomeSection = ({ sidebarBurgerMenuClick }) => {
  const [clickedId, setClickedId] = useState(0);
  const [videoCategoryArr, setVideoCategoryArr] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const videoCategoryScroll = useRef();
  const leftScrollVideoCategory = useRef();
  const rightScrollVideoCategory = useRef();
  let isMouseDown = false;
  let startX;
  let currentPos;

  const getData = async () => {
    const countryCode = "UK";
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
      const videoDetailsResponse = await axios(
        `https://www.googleapis.com/youtube/v3/videos?key=${
          import.meta.env.VITE_API_KEY
        }&part=statistics&part=contentDetails&id=${videoData[i].id.videoId}`
      );

      const channelDataArray = await channelResponse.data.items;

      videoData[i].snippet.channelImg = await channelDataArray[0].snippet
        .thumbnails.default.url;

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

  useEffect(() => {
    getData();
  }, []);

  const handleMouseEnter = (e) => {
    e.currentTarget.children[1].children[2].children[0].style.display = "";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.children[1].children[2].children[0].style.display = "none";
  };

  //fix multiple entity in one string
  const decodeEntity = (str) => {
    let firstEntity = str.search("&");
    let SecondEntity = str.search(";");

    if (firstEntity != -1 && SecondEntity != -1) {
      let slicedEntity = str.slice(firstEntity, SecondEntity + 1);

      return str.replace(slicedEntity, decode(slicedEntity));
    }

    return str;
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
      return;
    }
  };

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
          <div
            className={`h-[56px] ${
              sidebarBurgerMenuClick ? "w-[90.1%]" : "w-[77.6%]"
            } bg-white fixed z-[100]`}
          >
            <div
              className="h-[32px] w-[75px] flex justify-end absolute left-0 top-[12px] hidden"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,1) 48%, rgba(255,255,255,0.1) 75%",
              }}
            ></div>
            <div
              className="w-[38px] h-[38px] flex justify-center absolute left-[-11px] top-[9px] items-center rounded-[50%] hover:bg-black/10 cursor-pointer hidden"
              onClick={handleLeftScrollVideoCategory}
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
                        clickedId === index ? "bg-black" : "bg-[#f2f2f2]"
                      } text-[14px] ${
                        clickedId === index ? "text-white" : ""
                      } mr-[12px] px-[12px] rounded-[8px] select-none ${
                        clickedId === index ? "" : "hover:bg-[#eaeaea]"
                      } transition-all duration-300`}
                      onClick={() => setClickedId(index)}
                    >
                      <p title={`${item}`}>{item}</p>
                    </button>
                  );
                })}
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
              className="w-[38px] h-[38px] flex justify-center absolute right-[-11px] top-[9px] items-center rounded-[50%] hover:bg-black/10 cursor-pointer"
              onClick={handleRightScrollVideoCategory}
              ref={rightScrollVideoCategory}
            >
              <NavigateNextIcon />
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
            ? videoData.map((item) => {
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
                const years = Math.trunc(
                  (currentDate.getTime() - videoDate.getTime()) / 31556952000
                );

                return (
                  <div
                    key={item.etag}
                    className="w-[341px] rounded-[11px] mb-[42px] cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative">
                      <img
                        src={item.snippet.thumbnails.medium.url}
                        alt="youtube thumbnail image"
                        className="w-full rounded-[12px]"
                      />
                      <div className="absolute bottom-[4px] right-[5px] bg-[#191C23] text-white font-medium text-[13px] px-[3px] rounded-[3px]">
                        <p>{extractVideoLength(item.snippet.videoLength)}</p>
                      </div>
                    </div>
                    <div className="flex relative">
                      <img
                        src={item.snippet.channelImg}
                        alt="youtube channel image"
                        className="h-[36px] w-[36px] rounded-full mr-[10px] mt-[11px]"
                      />
                      <div>
                        <p
                          className="text-[16px] font-medium text-ellipsis leading-[22px] mt-[10px] pr-[25px] overflow-hidden line-clamp-2"
                          title={`${decodeEntity(item.snippet.title)}`}
                        >
                          {decodeEntity(item.snippet.title)}
                        </p>
                        <div className="mt-[3px]">
                          <p className="text-[14px] text-[#626262] overflow-hidden line-clamp-1">
                            {item.snippet.channelTitle}
                          </p>
                        </div>
                        <div>
                          <p className="text-[14px] text-[#626262] leading-[19px]">
                            {item.snippet.videoViewCount.length <= 5
                              ? (
                                  Number(item.snippet.videoViewCount) / 100
                                ).toFixed(1) + " views"
                              : item.snippet.videoViewCount.length <= 6
                              ? (
                                  Number(item.snippet.videoViewCount) / 1000
                                ).toFixed(1) + "k views"
                              : item.snippet.videoViewCount.length >= 7
                              ? (
                                  Number(item.snippet.videoViewCount) / 1000000
                                ).toFixed(1) + "M views"
                              : item.snippet.videoViewCount.length >= 10
                              ? (
                                  Number(item.snippet.videoViewCount) /
                                  1000000000
                                ).toFixed(1) + "B views"
                              : item.snippet.videoViewCount + "views"}
                            &nbsp;&#x2022;&nbsp;
                            {years != 0
                              ? years + " years ago"
                              : months != 0
                              ? months + " months ago"
                              : days != 0
                              ? days + " days ago"
                              : hours != 0
                              ? hours + " hours ago"
                              : minutes != 0
                              ? minutes + " minutes ago"
                              : seconds != 0
                              ? seconds + " seconds ago"
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div>
                        <MoreVertIcon
                          className="text-[20px] absolute top-[10px] right-0"
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : [...Array(12).keys()].map(() => {
                return (
                  <div className="w-[341px] rounded-[9px] mb-[50px]">
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
