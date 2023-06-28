import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import FeedIcon from "@mui/icons-material/Feed";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useCallback, useEffect, useRef } from "react";

export const Sidebar = ({ moreIconActive, sidebarBurgerMenuClick }) => {
  const date = new Date();
  const disableScroll = useRef();

  let handleEvent = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (moreIconActive) {
      disableScroll.current.addEventListener("scroll", handleEvent);
      disableScroll.current.addEventListener("mousewheel", handleEvent);
      disableScroll.current.addEventListener("touchmove", handleEvent);
    } else {
      disableScroll.current.removeEventListener("scroll", handleEvent);
      disableScroll.current.removeEventListener("mousewheel", handleEvent);
      disableScroll.current.removeEventListener("touchmove", handleEvent);
    }
  }, [moreIconActive]);

  return (
    <div
      className={`${
        sidebarBurgerMenuClick ? "w-[83px]" : "w-[240px]"
      } h-[100vh] fixed overflow-y-scroll invisible ${
        moreIconActive ? "" : "hover:visible"
      } overscroll-contain scroll-smooth`}
      ref={disableScroll}
    >
      <div
        className={`visible ${
          sidebarBurgerMenuClick ? "pt-[4px]" : "pt-[12px]"
        } mb-[70px]`}
      >
        <a
          className={`block ${
            sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
          }`}
          href="/"
          title="Home"
        >
          <div
            className={`${
              sidebarBurgerMenuClick ? "flex-col" : "flex"
            } items-center ${sidebarBurgerMenuClick ? "" : "bg-[#f2f2f2]"} ${
              sidebarBurgerMenuClick
                ? "hover:bg-[#f2f2f2]"
                : "hover:bg-[#e6e6e6]"
            } rounded-[11px] ${
              sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9px]"
            } ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house hidden ml-[16px]"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className={`bi bi-house-fill ${
                sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[16px]"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
            </svg>
            <p
              className={`${
                sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
              } ${sidebarBurgerMenuClick ? "ml-[19px]" : "ml-[26px]"} ${
                sidebarBurgerMenuClick ? "mt-[7px]" : ""
              }`}
            >
              Home
            </p>
          </div>
        </a>
        <a
          className={`block ${
            sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
          }`}
          href="/"
          title="Shorts"
        >
          <div
            className={`${
              sidebarBurgerMenuClick ? "flex-col" : "flex"
            } items-center hover:bg-[#f2f2f2] rounded-[11px] ${
              sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9px]"
            } ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className={`bi bi-play ${
                sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[16px]"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-play-fill hidden ml-[16px]"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <p
              className={`${
                sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
              } ${sidebarBurgerMenuClick ? "ml-[18px]" : "ml-[26px]"} ${
                sidebarBurgerMenuClick ? "mt-[7px]" : ""
              }`}
            >
              Shorts
            </p>
          </div>
        </a>
        <a
          className={`block ${
            sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
          }`}
          href="/"
          title="Subscriptions"
        >
          <div
            className={`${
              sidebarBurgerMenuClick ? "flex-col" : "flex"
            } items-center hover:bg-[#f2f2f2] rounded-[11px] ${
              sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9px]"
            } ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className={`bi bi-collection-play ${
                sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[16px]"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
              <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-play-fill hidden ml-[16px]"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <p
              className={`${
                sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
              } ${sidebarBurgerMenuClick ? "ml-[1px]" : "ml-[26px]"} ${
                sidebarBurgerMenuClick ? "mt-[7px]" : ""
              }`}
            >
              Subscriptions
            </p>
          </div>
        </a>
        <hr
          className={`${
            sidebarBurgerMenuClick ? "hidden" : ""
          } mt-[14px] mb-[12px]`}
        />
        <a
          className={`block ${
            sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
          }`}
          href="/"
          title="Library"
        >
          <div
            className={`${
              sidebarBurgerMenuClick ? "flex-col" : "flex"
            } items-center hover:bg-[#f2f2f2] rounded-[11px] ${
              sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9px]"
            } ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
          >
            <VideoLibraryOutlinedIcon
              className={`${
                sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[16px]"
              }`}
              fontSize="inherit"
            />
            <VideoLibraryIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p
              className={`${
                sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
              } ${sidebarBurgerMenuClick ? "ml-[17px]" : "ml-[26px]"} ${
                sidebarBurgerMenuClick ? "mt-[3px]" : ""
              }`}
            >
              Library
            </p>
          </div>
        </a>
        <a
          className={`block ${
            sidebarBurgerMenuClick ? "ml-[4px]" : "mx-[11px]"
          }`}
          href="/"
          title="History"
        >
          <div
            className={`${
              sidebarBurgerMenuClick ? "flex-col" : "flex"
            } items-center hover:bg-[#f2f2f2] rounded-[11px] ${
              sidebarBurgerMenuClick ? "pb-[14px]" : "py-[9px]"
            } ${sidebarBurgerMenuClick ? "pt-[18px]" : ""}`}
          >
            <AccessTimeIcon
              className={`${
                sidebarBurgerMenuClick ? "ml-[23px]" : "ml-[16px]"
              } text-[20px]`}
              fontSize="inherit"
            />
            <WatchLaterIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p
              className={`${
                sidebarBurgerMenuClick ? "text-[10px]" : "text-[14px]"
              } ${sidebarBurgerMenuClick ? "ml-[16px]" : "ml-[26px]"} ${
                sidebarBurgerMenuClick ? "mt-[3px]" : ""
              }`}
            >
              History
            </p>
          </div>
        </a>
        <div className={`${sidebarBurgerMenuClick ? "hidden" : ""}`}>
          <hr className="mt-[14px] mb-[14px]" />
          <p className="ml-[34px] text-[14px] mb-[12px]">
            Sign in to like videos, comment and subscribe.
          </p>
          <div className="h-[35px] w-[103px] flex items-center border ml-[34px] pl-[10px] pr-[15px] rounded-[40px] cursor-pointer">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="blue"
                className="bi bi-person-circle mr-[8px]"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </div>
            <p className="text-[15px] font-[500] text-[blue]">Sign in</p>
          </div>
          <hr className="mt-[16px] mb-[16px]" />
          <p className="ml-[25px] mb-[5px]">Explore</p>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Trending"
          >
            <WhatshotOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <WhatshotIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Trending</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Music"
          >
            <MusicNoteOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <MusicNoteIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Music</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Gaming"
          >
            <VideogameAssetOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <VideogameAssetIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Gaming</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="News"
          >
            <FeedOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <FeedIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">News</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Sports"
          >
            <EmojiEventsOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <EmojiEventsIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Sports</p>
          </a>
          <hr className="mt-[14px] mb-[13px]" />
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Browse channels"
          >
            <AddCircleOutlineIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <AddCircleIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Browse channels</p>
          </a>
          <hr className="mt-[14px] mb-[13px]" />
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Settings"
          >
            <SettingsOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <SettingsIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Settings</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Report history"
          >
            <FlagOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <FlagIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Report history</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Help"
          >
            <HelpOutlineOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <HelpIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Help</p>
          </a>
          <a
            className="flex items-center hover:bg-[#f2f2f2] mx-[11px] text-[20px] py-[9px] rounded-[11px]"
            href="/"
            title="Send feedback"
          >
            <FeedbackOutlinedIcon
              className="ml-[16px] text-[20px]"
              fontSize="inherit"
            />
            <FeedbackIcon
              className="ml-[16px] text-[20px]"
              style={{ display: "none" }}
              fontSize="inherit"
            />
            <p className="text-[14px] ml-[26px]">Send feedback</p>
          </a>
          <hr className="mt-[14px] mb-[13px]" />
          <div className="mx-[26px] leading-[18px]">
            <a
              href="#"
              className="text-[13px] text-[#606060] inline-block font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
            >
              Press
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
            >
              Copyright
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] inline-block font-medium"
            >
              Contact us
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
            >
              Creators
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] inline-block font-medium"
            >
              Advertise
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
            >
              Developers
            </a>
          </div>
          <div className="ml-[26px] mt-[8px] leading-[18px]">
            <a
              href="#"
              className="text-[13px] text-[#606060] inline-block font-medium"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium"
            >
              Policy & safety
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] inline-block font-medium"
            >
              How YouTube works
            </a>
            <a
              href="#"
              className="text-[13px] text-[#606060] inline-block font-medium"
            >
              Test new Features
            </a>
            <p className="text-[12px] text-[#93929E] mt-[15px]">
              &copy; {date.getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
