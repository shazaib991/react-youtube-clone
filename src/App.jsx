import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header/Header";
import { HomeSection } from "./components/HomeSection/HomeSection";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { HeaderPopOvers } from "./components/HeaderPopOvers/HeaderPopOvers";
import MicIcon from "@mui/icons-material/Mic";

export default function App() {
  const [moreIconActive, setMoreIconActive] = useState(false);
  const [moreIconHover, setMoreIconHover] = useState(false);
  const [micIconHover, setMicIconHover] = useState(false);
  const [searchIconHover, setSearchIconHover] = useState(false);
  const [isMicListening, setIsMicListening] = useState(false);
  const [
    isMouseInsideMicListeningPopover,
    setIsMouseInsideMicListeningPopover,
  ] = useState(false);
  const [showMicListeningPopover, setShowMicListeningPopover] = useState(false);
  const [sidebarBurgerMenuClick, setSidebarBurgerMenuClick] = useState(false);
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

  const handleHeaderTooltipMouseEnter = (TargetTooltip) => {
    if (TargetTooltip === "moreIconTooltip") {
      setMoreIconHover(true);
    }
    if (TargetTooltip === "micIconTooltip") {
      setMicIconHover(true);
    }
    if (TargetTooltip === "searchIconTooltip") {
      setSearchIconHover(true);
    }
  };

  const handleHeaderTooltipMouseLeave = (TargetTooltip) => {
    if (TargetTooltip === "moreIconTooltip") {
      setMoreIconHover(false);
    }
    if (TargetTooltip === "micIconTooltip") {
      setMicIconHover(false);
    }
    if (TargetTooltip === "searchIconTooltip") {
      setSearchIconHover(false);
    }
  };

  const handleMicListenPopoverClick = () => {
    setIsMicListening((prev) => !prev);
  };

  const handleMicListenClick = () => {
    setIsMicListening(true);
    setShowMicListeningPopover(true);
  };

  const handleMicListenPopoverCancelClick = (status) => {
    if (status === "outside") {
      setShowMicListeningPopover(false);
    }
    return;
  };

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
      } scroll-smooth`}
      ref={disableScroll}
    >
      <div
        className={`h-full w-full fixed bg-[#0000004d] z-[300] ${
          showMicListeningPopover ? "visible" : "invisible"
        } ${
          showMicListeningPopover ? "opacity-100" : "opacity-0"
        } transition-[opacity,visibility] duration-300`}
        onClick={
          isMouseInsideMicListeningPopover
            ? () => handleMicListenPopoverCancelClick("inside")
            : () => handleMicListenPopoverCancelClick("outside")
        }
      >
        <div
          className={`h-[416px] w-[592px] absolute top-[8px] left-[27.5%] bg-white shadow-[rgba(0,_0,_0,_0.40)_0px_25px_50px_-12px] transition-[opacity,visibility] duration-300 ${
            showMicListeningPopover ? "opacity-100" : "opacity-0"
          } ${showMicListeningPopover ? "visible" : "invisible"}`}
          onMouseEnter={() => setIsMouseInsideMicListeningPopover(true)}
          onMouseLeave={() => setIsMouseInsideMicListeningPopover(false)}
        >
          <div className="h-[calc(100%-46px)]">
            <div
              className={`flex justify-center items-center h-[40px] w-[40px] hover:bg-black/10 rounded-[50%] absolute right-[6px] top-[8px] cursor-pointer active:border-[#00000026] active:border-[1px] active:bg-black/20 transition-[border] duration-300 active:transition-none`}
              onClick={() => handleMicListenPopoverCancelClick("outside")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                fill="currentColor"
                className={`bi bi-x`}
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className="h-full flex flex-col justify-between mt-[46px]">
              <h1 className="text-[24px] ml-[33px]">
                {isMicListening ? "Listening..." : "Microphone off. Try again."}
              </h1>
              <div className="flex flex-col items-center ml-[33px]">
                <div
                  className={`flex justify-center items-center h-[68px] w-[68px] rounded-[50%] ${
                    isMicListening ? "bg-[#cc0000]" : "bg-[#cecece]"
                  } mb-[15px] cursor-pointer`}
                  onClick={handleMicListenPopoverClick}
                >
                  <MicIcon
                    sx={{
                      fontSize: "38px",
                      color: `${isMicListening ? "white" : "black"}`,
                    }}
                    className="mt-[2px]"
                  />
                </div>
                <p
                  className={`text-[14px] mb-[20px] text-[#606060] ${
                    isMicListening ? "invisible" : "visible"
                  }`}
                >
                  Tap microphone to try again
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeaderPopOvers
        moreIconActive={moreIconActive}
        moreIconHover={moreIconHover}
        micIconHover={micIconHover}
        searchIconHover={searchIconHover}
      />
      <div className="visible">
        <Header
          setMoreIconActive={setMoreIconActive}
          handleMoreIconClickDisable={handleMoreIconClickDisable}
          moreIconActive={moreIconActive}
          setSidebarBurgerMenuClick={setSidebarBurgerMenuClick}
          handleHeaderTooltipMouseEnter={handleHeaderTooltipMouseEnter}
          handleHeaderTooltipMouseLeave={handleHeaderTooltipMouseLeave}
          handleMicListenClick={handleMicListenClick}
        />
        <div className="flex" onClick={handleMoreIconClickDisable}>
          <Sidebar
            moreIconActive={moreIconActive}
            sidebarBurgerMenuClick={sidebarBurgerMenuClick}
          />
          <HomeSection sidebarBurgerMenuClick={sidebarBurgerMenuClick} />
        </div>
      </div>
    </div>
  );
}
