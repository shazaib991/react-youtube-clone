import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import axios from "axios";

export const HomeSection = () => {
  const [clickedId, setClickedId] = useState(0);
  const [videoCategoryArr, setVideoCategoryArr] = useState([]);
  const [videoData, setVideoData] = useState([]);
  let isMouseDown = false;
  let startX;
  let currentPos;

  const getData = async () => {
    const countryCode = "US";
    const videoCategoryArr = [];

    const videoFilterResponse = await axios(
      `https://www.googleapis.com/youtube/v3/videoCategories?key=${import.meta.env.VITE_API_KEY}&part=snippet&regionCode=${countryCode}`
    );
    const videoResponse = await axios(
      `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_API_KEY}&part=snippet&maxResults=12&regionCode=${countryCode}`
    );

    const videoFilterData = await videoFilterResponse.data.items;
    const videoData = await videoResponse.data.items;

    videoCategoryArr.push("All");

    videoFilterData.forEach((item) => {
      videoCategoryArr.push(item.snippet.title);
    });

    for (let i = 0; i < videoData.length; i++) {
      const channelResponse = await axios(
        `https://www.googleapis.com/youtube/v3/channels?key=${import.meta.env.VITE_API_KEY}&part=snippet&id=${videoData[i].snippet.channelId}`
      );
      const videoDetailsResponse = await axios(
        `https://www.googleapis.com/youtube/v3/videos?key=${import.meta.env.VITE_API_KEY}&part=statistics&part=contentDetails&id=${videoData[i].id.videoId}`
      );

      const channelDataArray = await channelResponse.data.items;
      videoData[i].snippet.channelImg = await channelDataArray[0].snippet
        .thumbnails.default.url;

      const videoDetailsArray = await videoDetailsResponse.data.items;
      videoData[i].snippet.videoViewCount = await videoDetailsArray[0]
        .statistics.viewCount;
      videoData[i].snippet.videoLength = await videoDetailsArray[0]
        .contentDetails.duration;
    }

    setVideoCategoryArr(videoCategoryArr);
    setVideoData(videoData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMouseOver = (e) => {
    e.currentTarget.children[1].children[2].children[0].style.display = null;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.children[1].children[2].children[0].style.display = "none";
  };

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

  const handleRightScrollVideoCategory = (e) => {
    e.currentTarget.parentElement.children[2].scrollLeft += 400;
  };

  const handleLeftScrollVideoCategory = (e) => {
    e.currentTarget.parentElement.children[2].scrollLeft -= 400;
  };

  const handleScrollVideoCategory = (e) => {
    if (e.currentTarget.scrollLeft > 0) {
      e.currentTarget.previousSibling.classList.remove("hidden");
      e.currentTarget.previousSibling.previousSibling.classList.remove(
        "hidden"
      );
      e.currentTarget.nextSibling.classList.remove("hidden");
      e.currentTarget.nextSibling.nextSibling.classList.remove("hidden");
    } else if (e.currentTarget.scrollLeft === 0) {
      e.currentTarget.previousSibling.classList.add("hidden");
      e.currentTarget.previousSibling.previousSibling.classList.add("hidden");
    }

    if (
      e.currentTarget.scrollLeft ===
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth
    ) {
      e.currentTarget.nextSibling.classList.add("hidden");
      e.currentTarget.nextSibling.nextSibling.classList.add("hidden");
    }
  };

  const handleMouseDownVideoCategory = (e) => {
    isMouseDown = true;
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

  return (
    <div className="w-full ml-[265px] mr-[25px]">
      <div className="h-[56px] w-[78.6%] bg-white fixed z-[100]">
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
        >
          <NavigateBeforeIcon />
        </div>
        <div
          className="h-full w-full overflow-scroll scrollbar-hide bg-white"
          onScroll={handleScrollVideoCategory}
          onMouseDown={handleMouseDownVideoCategory}
          onMouseLeave={() => (isMouseDown = false)}
          onMouseUp={() => (isMouseDown = false)}
          onMouseMove={handleMouseMoveVideoCategory}
        >
          <div className="w-max flex mt-[12px] mb-[12px]">
            {videoCategoryArr.length !== 0
              ? videoCategoryArr.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`h-[32px] ${
                        clickedId === index ? "bg-black" : "bg-[#f2f2f2]"
                      } text-[14px] ${
                        clickedId === index ? "text-white" : ""
                      } mr-[10px] px-[12px] rounded-[8px] select-none`}
                      onClick={() => setClickedId(index)}
                    >
                      {item}
                    </button>
                  );
                })
              : "test"}
            {videoCategoryArr.length !== 0 ? (
              <div>
                <button className="h-[32px] bg-[#f2f2f2] text-[14px] mr-[10px] px-[12px] rounded-[8px] select-none">
                  Recently uploaded
                </button>
                <button className="h-[32px] bg-[#f2f2f2] text-[14px] px-[12px] rounded-[8px] select-none">
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
        >
          <NavigateNextIcon />
        </div>
      </div>
      <div className="flex flex-wrap justify-between mt-[80px]">
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
                  className="w-[343.5px] rounded-[11px] mb-[42px] cursor-pointer"
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative">
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      alt="youtube thumbnail image"
                      className="w-full rounded-[12px]"
                    />
                    <div className="absolute bottom-[4px] right-1 bg-[#191C23] text-white font-medium text-[13px] px-[3px] rounded-[3px]">
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
                      <p className="text-[16px] font-medium text-ellipsis leading-[22px] mt-[10px] pr-[25px] overflow-hidden line-clamp-2">
                        {decodeEntity(item.snippet.title)}
                      </p>
                      <div className="mt-[3px]">
                        <p className="text-[14px] text-[#626262] overflow-hidden line-clamp-1">
                          {item.snippet.channelTitle}
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] text-[#626262] leading-[19px]">
                          {item.snippet.videoViewCount.length < 7
                            ? (
                                Number(item.snippet.videoViewCount) / 1000
                              ).toFixed(1) + "k views"
                            : item.snippet.videoViewCount.length >= 7
                            ? (
                                Number(item.snippet.videoViewCount) / 1000000
                              ).toFixed(1) + "M views"
                            : item.snippet.videoViewCount.length >= 10
                            ? (
                                Number(item.snippet.videoViewCount) / 1000000000
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
                      <MoreVertIcon className="text-[20px] absolute top-[10px] right-0" style={{display: "none"}}/>
                    </div>
                  </div>
                </div>
              );
            })
          : "test2"}
      </div>
    </div>
  );
};
