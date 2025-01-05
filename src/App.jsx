import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Video} from "./pages/Video";
import {HeaderFunctions} from "./functions/HeaderFunctions.jsx";
import {HomesectionFunctions} from "./functions/HomesectionFunctions.jsx";
import {PopoversFunctions} from "./functions/PopoversFunctions.jsx";
import {createContext} from "react";

export const UseContext = createContext();

export default function App() {
	const {
		handleMicListenClick,
		handleMicListenPopoverClick,
		handleMicListenPopoverCancelClick,
		burgerIcon,
		handleHeaderTooltipMouseLeave,
		handleHeaderTooltipMouseEnter,
		handlePopoverDisable,
	} = HeaderFunctions();
	const {handleVideoMoreIconClick, handleVideoMouseEnter, leftScrollVideoCategory, rightScrollVideoCategory} =
		HomesectionFunctions();
	const {videoMoreIconPopOver} = PopoversFunctions();

	return (
		<UseContext.Provider
			value={{
				handleMicListenClick,
				handleMicListenPopoverClick,
				handleMicListenPopoverCancelClick,
				handlePopoverDisable,
				handleVideoMoreIconClick,
				handleVideoMouseEnter,
				leftScrollVideoCategory,
				videoMoreIconPopOver,
				handleHeaderTooltipMouseLeave,
				handleHeaderTooltipMouseEnter,
				rightScrollVideoCategory,
				burgerIcon,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/watch" element={<Video />} />
				</Routes>
			</BrowserRouter>
		</UseContext.Provider>
	);
}
