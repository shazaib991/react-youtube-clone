import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header/Header";
import { HomeSection } from "./components/HomeSection/HomeSection";
import { Sidebar } from "./components/Sidebar/Sidebar";
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

export default function App() {
  const [moreIconActive, setMoreIconActive] = useState(false);
  const disableScroll = useRef();

  const handleMoreIconClickDisable = () => {
    if (!moreIconActive) {
      return;
    }
    setMoreIconActive(false);
  };

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
      className={`h-[100vh] overflow-y-scroll relative ${
        moreIconActive ? "invisible" : ""
      }`}
      ref={disableScroll}
    >
      <div
        className={`w-[296px] rounded-[10px] fixed py-[8px] top-[48px] right-[140px] visible bg-white z-[200] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)] ${
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
      <div className="visible">
        <Header
          setMoreIconActive={setMoreIconActive}
          handleMoreIconClickDisable={handleMoreIconClickDisable}
          moreIconActive={moreIconActive}
        />
        <div className="flex" onClick={handleMoreIconClickDisable}>
          <Sidebar moreIconActive={moreIconActive} />
          <HomeSection moreIconActive={moreIconActive} />
        </div>
      </div>
    </div>
  );
}
