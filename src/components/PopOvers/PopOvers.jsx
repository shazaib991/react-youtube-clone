import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import { PersonVcard } from "react-bootstrap-icons";
import { Moon } from "react-bootstrap-icons";
import { Translate } from "react-bootstrap-icons";
import { ShieldLock } from "react-bootstrap-icons";
import { Globe } from "react-bootstrap-icons";
import { Keyboard } from "react-bootstrap-icons";
import { Gear } from "react-bootstrap-icons";
import { QuestionCircle } from "react-bootstrap-icons";
import { SendExclamation } from "react-bootstrap-icons";
import { ChevronRight } from "react-bootstrap-icons";
import { CollectionPlay } from "react-bootstrap-icons";
import { Share } from "react-bootstrap-icons";
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
        className={`w-[300px] rounded-[12px] fixed pt-[8px] pb-[10px] top-[48px] right-[125px] visible bg-white z-[1200] shadow-[0_0_25px_5px_rgba(212,212,212,0.35)] ${
          moreIconActive ? "" : "hidden"
        }`}
      >
        <div className="flex items-center pl-[18px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <PersonVcard size={20} />
          <p className="ml-[18px] text-[14px]">Your data in YouTube</p>
        </div>
        <div className="flex items-center justify-between pl-[18px] pr-[20px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <div className="flex items-center">
            <Moon size={20} />
            <p className="ml-[18px] text-[14px]">Appearance: Light</p>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="flex items-center justify-between pl-[18px] pr-[20px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <div className="flex items-center">
            <Translate size={20} />
            <p className="ml-[18px] text-[14px]">Language: English</p>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="flex items-center justify-between pl-[18px] pr-[20px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <div className="flex items-center">
            <ShieldLock size={20} />
            <p className="ml-[18px] text-[14px]">Restricted Mode: Off</p>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="flex items-center justify-between pl-[18px] pr-[20px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <div className="flex items-center">
            <Globe size={20} />
            <p className="ml-[18px] text-[14px]">Location: United Kingdom</p>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="flex items-center pl-[18px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <Keyboard size={20} />
          <p className="ml-[18px] text-[14px]">Keyboard shortcuts</p>
        </div>
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-[9px]"></div>
        <div className="flex items-center pl-[18px] mt-[8px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <Gear size={20} />
          <p className="ml-[18px] text-[14px]">Settings</p>
        </div>
        <div className="w-full h-[1px] bg-[#e5e5e5] mt-[9px]"></div>
        <div className="flex items-center pl-[18px] mt-[8px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <QuestionCircle size={20} />
          <p className="ml-[18px] text-[14px]">Help</p>
        </div>
        <div className="flex items-center pl-[18px] hover:bg-black/5 py-[9.3px] cursor-pointer">
          <SendExclamation size={20} />
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
                  window.innerWidth <=
                    Math.trunc(
                      videoMoreIconPos.x +
                        (videoMoreIconPopOver.current.clientWidth + 2)
                    ) &&
                  windowSize <=
                    Math.trunc(
                      videoMoreIconPos.y +
                        (videoMoreIconPopOver.current.clientHeight + 2)
                    )
                    ? String(Math.trunc(videoMoreIconPos.x - 132))
                    : window.innerWidth <=
                        Math.trunc(
                          videoMoreIconPos.x +
                            (videoMoreIconPopOver.current.clientWidth + 2)
                        ) &&
                      windowSize <=
                        Math.trunc(
                          videoMoreIconPos.y +
                            (videoMoreIconPopOver.current.clientHeight + 42)
                        )
                    ? String(Math.trunc(videoMoreIconPos.x - 170))
                    : window.innerWidth <=
                      Math.trunc(
                        videoMoreIconPos.x +
                          (videoMoreIconPopOver.current.clientWidth + 2)
                      )
                    ? String(Math.trunc(videoMoreIconPos.x - 132))
                    : windowSize <=
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
          <CollectionPlay size={20} />
          <p className="ml-[18px] text-[14px]">Add to queue</p>
        </div>
        <div className="flex items-center hover:bg-black/5 py-[7.5px] cursor-pointer pl-[17px] pr-[35px]">
          <Share size={20} />
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
