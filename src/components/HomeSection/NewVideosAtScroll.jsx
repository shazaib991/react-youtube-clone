import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

export const NewVideosAtScroll = ({areNewVideosAtScrollDownLoading, themeMode}) => {
	{
		const [loaderInterval1, setLoaderInterval1] = useState(0);
		const [loaderInterval2, setLoaderInterval2] = useState(0);
		const loader1 = useRef();
		const loader2 = useRef();
		useEffect(() => {
			if (areNewVideosAtScrollDownLoading) {
				setLoaderInterval1(
					setInterval(() => {
						loader1.current.classList.remove("loader-animation");
						loader2.current.classList.add("loader2-animation");
					}, 900)
				);

				setLoaderInterval2(
					setInterval(() => {
						loader1.current.classList.add("loader-animation");
						loader2.current.classList.remove("loader2-animation");
					}, 1800)
				);

				return;
			}

			clearInterval(loaderInterval1);
			clearInterval(loaderInterval2);
		}, [areNewVideosAtScrollDownLoading]);

		return areNewVideosAtScrollDownLoading ? (
			<div className="flex flex-col items-center">
				<div className="flex flex-wrap justify-between max-md:justify-center">
					{[...Array(6).keys()].map((index) => {
						return (
							<div className="max-md:w-[300px] w-[365px] rounded-[9px] mb-[50px]" key={index}>
								<div
									className={`w-full h-[193px] ${
										themeMode === "dark" || themeMode === "systemDark" ? "bg-[#3f3f3f]" : "bg-[#e5e5e5]"
									} rounded-[9px]`}
								></div>
								<div className="flex mt-[12px] max-md:flex-col max-md:items-center">
									<div
										className={`w-[36px] h-[36px] rounded-full ${
											themeMode === "dark" || themeMode === "systemDark" ? "bg-[#3f3f3f]" : "bg-[#e5e5e5]"
										} max-md:mb-[10px]`}
									></div>
									<div className="ml-[12px] max-md:ml-0">
										<div
											className={`w-[266px] h-[20px] ${
												themeMode === "dark" || themeMode === "systemDark"
													? "bg-[#3f3f3f]"
													: "bg-[#e5e5e5]"
											} mt-[-2px]`}
										></div>
										<div
											className={`w-[177px] h-[20px] ${
												themeMode === "dark" || themeMode === "systemDark"
													? "bg-[#3f3f3f]"
													: "bg-[#e5e5e5]"
											} mt-[10px]`}
										></div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="loader-container mb-[10px]">
					<div className="loader-dot"></div>
					<div
						className={`${
							themeMode === "dark" || themeMode === "systemDark" ? "loader-dark" : "loader"
						} loader-animation`}
						ref={loader1}
					>
						<div
							className={`${
								themeMode === "dark" || themeMode === "systemDark" ? "loader-hole-dark" : "loader-hole"
							}`}
						></div>
					</div>
					<div
						className={`${themeMode === "dark" || themeMode === "systemDark" ? "loader2-dark" : "loader2"}`}
						ref={loader2}
					>
						<div
							className={`${
								themeMode === "dark" || themeMode === "systemDark" ? "loader-hole-dark" : "loader-hole"
							}`}
						></div>
					</div>
				</div>
			</div>
		) : (
			""
		);
	}
};

NewVideosAtScroll.propTypes = {
	themeMode: PropTypes.string,
	areNewVideosAtScrollDownLoading: PropTypes.bool,
};
