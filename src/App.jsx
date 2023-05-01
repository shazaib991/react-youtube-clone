import { Header } from "./components/Header/Header";
import { HomeSection } from "./components/HomeSection/HomeSection";
import { Sidebar } from "./components/Sidebar/Sidebar";

export default function App() {
  return (
    <>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <HomeSection />
        </div>
      </div>
    </>
  )
}
