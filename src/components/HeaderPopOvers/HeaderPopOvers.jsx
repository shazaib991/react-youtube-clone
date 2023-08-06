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

export const HeaderPopOvers = ({
  moreIconActive,
  moreIconHover,
  micIconHover,
  searchIconHover,
}) => {
  return (
    <>
      <div
        className={`w-[296px] rounded-[10px] fixed py-[8px] top-[48px] right-[140px] visible bg-white z-[300] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)] ${
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
        className={`fixed top-[64px] right-[412px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
          searchIconHover ? "opacity-100" : "opacity-0"
        } ${
          searchIconHover ? "visible" : "invisible"
        } transition-all z-[200] cursor-default`}
      >
        Search
      </div>
      <div
        className={`fixed top-[64px] right-[305px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
          micIconHover ? "opacity-100" : "opacity-0"
        } ${
          micIconHover ? "visible" : "invisible"
        } transition-all z-[200] cursor-default`}
      >
        Search with your voice
      </div>
      <div
        className={`fixed top-[64px] right-[130px] bg-[#646464e6] px-[7px] py-[8px] text-white text-[12px] rounded-[4px] ${
          moreIconHover ? "opacity-100" : "opacity-0"
        } ${
          moreIconHover ? "visible" : "invisible"
        } transition-all z-[200] cursor-default`}
      >
        Settings
      </div>
    </>
  );
};
