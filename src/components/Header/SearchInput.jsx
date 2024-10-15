import {Search} from "react-bootstrap-icons";
import {XLg} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const SearchInput = ({handleSearch, searchText, searchBox, handleClearSearch}) => {
	const themeMode = useSelector((state) => state.navbar.value.themeMode);

	return (
		<div className="w-[70%] h-[40px] flex items-center justify-end relative">
			<input
				type="text"
				name="youtube-search"
				id="youtube-search"
				placeholder="Search"
				spellCheck="false"
				onChange={handleSearch}
				value={searchText}
				ref={searchBox}
				className={`w-[94.5%] h-full border ${
					themeMode === "systemDark" || themeMode === "dark"
						? "bg-[#121212] border-[#313131] text-[#ffffff]"
						: "bg-[#ffffff] border-[#00000033] text-[#000000]"
				} rounded-tl-[40px] border-r-0 rounded-bl-[40px] placeholder:text-[#888A88] outline-none pl-[17px] pr-[25px] focus:border-[#244abe] focus:border-r-[1px] focus:w-full peer focus:pl-[48.2px] shadow-[inset_0_1px_1px_rgba(50,50,50,0.1)] focus:shadow-[inset_0_1px_2px_rgba(50,50,50,0.4)]`}
			/>
			<Search
				className="absolute ml-[20px] left-0 hidden peer-focus:block"
				size={14}
				color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
			/>
			<div
				className={`flex justify-center items-center h-[40px] w-[40px] ${
					themeMode === "systemDark" || themeMode === "dark"
						? "hover:bg-[#4e4e4e] active:border-[#606060] active:bg-[#606060]"
						: "hover:bg-black/10 active:border-[#00000026] active:bg-black/20"
				} rounded-[50%] absolute right-[-4px] cursor-pointer ${searchText.length > 0 ? "" : "hidden"}`}
				onClick={handleClearSearch}
			>
				<XLg size={20} color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`} />
			</div>
		</div>
	);
};

SearchInput.propTypes = {
	handleSearch: PropTypes.func,
	handleClearSearch: PropTypes.func,
	searchText: PropTypes.string,
	searchBox: PropTypes.object,
};
