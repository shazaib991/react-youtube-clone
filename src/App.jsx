import { useState } from "react";
import { Header } from "./components/Header/Header";
import { HomeSection } from "./components/HomeSection/HomeSection";
import { Sidebar } from "./components/Sidebar/Sidebar";

export default function App() {
  const [moreIconActive, setMoreIconActive] = useState(false);

  return (
    <>
      <div onClick={() => (moreIconActive ? setMoreIconActive(false) : "")}>
        <Header setMoreIconActive={setMoreIconActive} />
        <div
          className="flex"
          onClick={() => (moreIconActive ? setMoreIconActive(false) : "")}
        >
          <Sidebar />
          <HomeSection moreIconActive={moreIconActive} />
        </div>
      </div>
    </>
  );
}
