import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header/Header";
import { HomeSection } from "./components/HomeSection/HomeSection";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { HeaderPopOvers } from "./components/HeaderPopOvers/HeaderPopOvers";

export default function App() {
  const [moreIconActive, setMoreIconActive] = useState(false);
  const [moreIconHover, setMoreIconHover] = useState(false);
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

  const handleMoreIconMouseEnter = () => {
    setMoreIconHover(true);
  };

  const handleMoreIconMouseLeave = () => {
    setMoreIconHover(false);
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
      <HeaderPopOvers
        moreIconActive={moreIconActive}
        moreIconHover={moreIconHover}
      />
      <div className="visible">
        <Header
          setMoreIconActive={setMoreIconActive}
          handleMoreIconClickDisable={handleMoreIconClickDisable}
          moreIconActive={moreIconActive}
          setSidebarBurgerMenuClick={setSidebarBurgerMenuClick}
          handleMoreIconMouseEnter={handleMoreIconMouseEnter}
          handleMoreIconMouseLeave={handleMoreIconMouseLeave}
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
