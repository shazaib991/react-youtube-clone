import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useEffect, useState } from "react";

export const PopOvers = ({
  moreIconActive,
  moreIconHover,
  micIconHover,
  searchIconHover,
  videoMoreIconPos,
  videoMoreIconActive,
  videoMoreIconPopOver,
}) => {
  const [windowSize, setWindowSize] = useState(0);

  const windowResize = () => {
    setWindowSize(window.innerHeight);
  };

  useEffect(() => {
    setWindowSize(window.innerHeight);
  }, []);

  window.onresize = windowResize;

  return (
    <>
      <div
        className={`w-[296px] rounded-[10px] fixed py-[8px] top-[48px] right-[140px] visible bg-white z-[1200] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)] ${
          moreIconActive ? "" : "hidden"
        }`}
      >
        <div className="flex items-center pl-[15px] hover:bg-black/5 py-[8px] cursor-pointer">
          <AdminPanelSettingsOutlinedIcon />
          <p className="ml-[18px] text-[14px]">Your data in YouTube</p>
        </div>
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-[8px]"></div>
        <div className="flex items-center justify-between px-[15px] mt-[8px] hover:bg-black/5 py-[8px] cursor-pointer">
          <div className="flex items-center">
            <ModeNightOutlinedIcon />
            <p className="ml-[18px] text-[14px]">Appearance: Light</p>
          </div>
          <NavigateNextIcon />
        </div>
        <div className="flex items-center justify-between px-[15px] hover:bg-black/5 py-[8px] cursor-pointer">
          <div className="flex items-center">
            <TranslateOutlinedIcon />
            <p className="ml-[18px] text-[14px]">Language: English</p>
          </div>
          <NavigateNextIcon />
        </div>
        <div className="flex items-center justify-between px-[15px] hover:bg-black/5 py-[8px] cursor-pointer">
          <div className="flex items-center">
            <GppMaybeOutlinedIcon />
            <p className="ml-[18px] text-[14px]">Restricted Mode: Off</p>
          </div>
          <NavigateNextIcon />
        </div>
        <div className="flex items-center justify-between px-[15px] hover:bg-black/5 py-[8px] cursor-pointer">
          <div className="flex items-center">
            <LanguageOutlinedIcon />
            <p className="ml-[18px] text-[14px]">Location: United Kingdom</p>
          </div>
          <NavigateNextIcon />
        </div>
        <div className="flex items-center pl-[15px] hover:bg-black/5 py-[8px] cursor-pointer">
          <KeyboardOutlinedIcon />
          <p className="ml-[18px] text-[14px]">Keyboard shortcuts</p>
        </div>
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-[8px]"></div>
        <div className="flex items-center pl-[15px] mt-[8px] hover:bg-black/5 py-[8px] cursor-pointer">
          <SettingsOutlinedIcon />
          <p className="ml-[18px] text-[14px]">Settings</p>
        </div>
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-[8px]"></div>
        <div className="flex items-center pl-[15px] mt-[8px] hover:bg-black/5 py-[8px] cursor-pointer">
          <HelpOutlineOutlinedIcon />
          <p className="ml-[18px] text-[14px]">Help</p>
        </div>
        <div className="flex items-center pl-[15px] hover:bg-black/5 py-[8px] cursor-pointer">
          <FeedbackOutlinedIcon />
          <p className="ml-[18px] text-[14px]">Send feedback</p>
        </div>
      </div>
      <div
        className={`fixed rounded-[10px] py-[8px] visible bg-white z-[1200] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)] ${
          videoMoreIconActive.status ? "" : "invisible"
        }`}
        ref={videoMoreIconPopOver}
        style={
          videoMoreIconActive.status
            ? {
                top: `${
                  windowSize <=
                  Math.trunc(
                    videoMoreIconPos.y +
                      (videoMoreIconPopOver.current.clientHeight + 2)
                  )
                    ? String(Math.trunc(videoMoreIconPos.y - 85))
                    : windowSize <=
                      Math.trunc(
                        videoMoreIconPos.y +
                          (videoMoreIconPopOver.current.clientHeight + 42)
                      )
                    ? String(Math.trunc(videoMoreIconPos.y + 2))
                    : String(Math.trunc(videoMoreIconPos.y + 42))
                }px`,
                left: `${
                  windowSize <=
                  Math.trunc(
                    videoMoreIconPos.y +
                      (videoMoreIconPopOver.current.clientHeight + 2)
                  )
                    ? String(Math.trunc(videoMoreIconPos.x))
                    : windowSize <=
                      Math.trunc(
                        videoMoreIconPos.y +
                          (videoMoreIconPopOver.current.clientHeight + 42)
                      )
                    ? String(Math.trunc(videoMoreIconPos.x + 40))
                    : String(Math.trunc(videoMoreIconPos.x))
                }px`,
              }
            : {}
        }
      >
        <div className="flex items-center hover:bg-black/5 py-[7.5px] cursor-pointer pl-[17px] pr-[35px]">
          <VideoLibraryOutlinedIcon sx={{ fontSize: "20px" }} />
          <p className="ml-[18px] text-[14px]">Add to queue</p>
        </div>
        <div className="flex items-center hover:bg-black/5 py-[7.5px] cursor-pointer pl-[17px] pr-[35px]">
          <ShareOutlinedIcon sx={{ fontSize: "20px" }} />
          <p className="ml-[18px] text-[14px]">Share</p>
        </div>
      </div>
      <div
        className={`fixed top-[64px] right-[398px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
          searchIconHover ? "opacity-100" : "opacity-0"
        } ${
          searchIconHover ? "visible" : "invisible"
        } transition-all z-[1000] cursor-default`}
      >
        Search
      </div>
      <div
        className={`fixed top-[64px] right-[290px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
          micIconHover ? "opacity-100" : "opacity-0"
        } ${
          micIconHover ? "visible" : "invisible"
        } transition-all z-[1000] cursor-default`}
      >
        Search with your voice
      </div>
      <div
        className={`fixed top-[64px] right-[115px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
          moreIconHover ? "opacity-100" : "opacity-0"
        } ${
          moreIconHover ? "visible" : "invisible"
        } transition-all z-[1000] cursor-default`}
      >
        Settings
      </div>
    </>
  );
};
