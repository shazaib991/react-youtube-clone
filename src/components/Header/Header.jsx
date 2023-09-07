import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import React from "react";
import { useRef, useState } from "react";

export const Header = ({
  setMoreIconActive,
  handlePopoverDisable,
  moreIconActive,
  setSidebarBurgerMenuClick,
  handleHeaderTooltipMouseEnter,
  handleHeaderTooltipMouseLeave,
  handleMicListenClick,
  videoMoreIconActive,
}) => {
  const [searchText, setSearchText] = useState("");
  const moreIcon = useRef();
  const burgerIcon = useRef();
  const searchBox = useRef();

  const handleSearch = (e) => {
    setSearchText(e.currentTarget.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    searchBox.current.focus();
  };

  const handleMoreIconClick = () => {
    setMoreIconActive((prevState) => !prevState);
  };

  const handleSidebarBurgerMenuClick = () => {
    setSidebarBurgerMenuClick((prevState) => !prevState);
  };

  return (
    <div
      className="w-[100%] h-[56px] flex items-center fixed top-0 justify-between px-[18px] z-[1000] bg-white"
      onClick={
        moreIconActive || videoMoreIconActive ? handlePopoverDisable : ""
      }
    >
      <div className="flex">
        <div className="flex items-center">
          <div
            className="w-[38px] h-[38px] flex justify-center mb-[2px] items-center rounded-[50%] cursor-pointer transition-[border] duration-300 active:transition-none hover:bg-black/10 active:border-[#00000026] active:border-[1px] active:bg-black/20"
            onClick={handleSidebarBurgerMenuClick}
            ref={burgerIcon}
          >
            <div className="w-[18px] h-[13px] flex flex-col justify-between">
              <div className="w-full h-[1px] bg-black"></div>
              <div className="w-full h-[1px] bg-black"></div>
              <div className="w-full h-[1px] bg-black"></div>
            </div>
          </div>
          <div
            title="YouTube Home"
            className="flex items-center ml-[17px] cursor-pointer"
          >
            <img src={youtubeLogo} width={90} height={20} alt="youtube logo" />
          </div>
        </div>
        <div className="flex items-center ml-[165px]">
          <div className="w-[567px] h-[40px] flex items-center justify-end relative">
            <input
              type="text"
              name="youtube-search"
              id="youtube-search"
              placeholder="Search"
              spellcheck="false"
              onChange={handleSearch}
              value={searchText}
              ref={searchBox}
              className="w-[94.5%] h-full border border-[#00000033] rounded-tl-[40px] border-r-0 rounded-bl-[40px] placeholder:text-[#888A88] outline-none pl-[17px] pr-[25px] focus:border-[#002db3] focus:border-r-[1px] focus:w-full peer focus:pl-[48.2px] shadow-[inset_0_1px_1px_rgba(50,50,50,0.1)] focus:shadow-[inset_0_1px_2px_rgba(50,50,50,0.4)]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-search ml-[20px] absolute left-0 hidden peer-focus:block"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <div
              className={`flex justify-center items-center h-[40px] w-[40px] hover:bg-black/10 rounded-[50%] absolute right-[-4px] cursor-pointer ${
                searchText.length > 0 ? "" : "hidden"
              } active:border-[#00000026] active:border-[1px] active:bg-black/20 transition-[border] duration-300 active:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                fill="currentColor"
                className={`bi bi-x`}
                onClick={handleClearSearch}
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </div>
          <div
            className="w-[63px] h-[40px] flex items-center bg-[#f8f8f8] border border-[#d6d6d6] rounded-tr-[40px] mr-[2px] rounded-br-[40px] cursor-pointer hover:bg-[#0000000f] active:bg-[#0000001a] hover:border-[#0000002e] hover:shadow-[0_1px_1px_rgba(50,50,50,0.12)]"
            onMouseEnter={() =>
              handleHeaderTooltipMouseEnter("searchIconTooltip")
            }
            onMouseLeave={() =>
              handleHeaderTooltipMouseLeave("searchIconTooltip")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-search ml-[22px]"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <div
            className="w-[40px] h-[40px] flex justify-center items-center bg-[#f2f2f2] rounded-[50%] hover:bg-black/10 ml-[14px] cursor-pointer active:border-[#00000026] active:border-[1px] active:bg-black/20 transition-[border] duration-300 active:transition-none"
            onMouseEnter={() => handleHeaderTooltipMouseEnter("micIconTooltip")}
            onMouseLeave={() => handleHeaderTooltipMouseLeave("micIconTooltip")}
            onClick={handleMicListenClick}
          >
            <MicIcon sx={{ fontSize: "23px" }} />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="w-[40px] h-[40px] flex justify-center items-center rounded-[50%] mr-[7.5px] cursor-pointer active:transition-none transition-[background,border] duration-300 z-[300] active:bg-black/10 active:border-[2px]"
          onClick={handleMoreIconClick}
          onMouseEnter={() => handleHeaderTooltipMouseEnter("moreIconTooltip")}
          onMouseLeave={() => handleHeaderTooltipMouseLeave("moreIconTooltip")}
          ref={moreIcon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </div>
        <div className="h-[35px] flex items-center border pl-[10px] pr-[15px] rounded-[40px] cursor-pointer hover:bg-[#def1ff]">
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
          <p className="text-[14px] font-[500] text-[blue]">Sign in</p>
        </div>
      </div>
    </div>
  );
};
