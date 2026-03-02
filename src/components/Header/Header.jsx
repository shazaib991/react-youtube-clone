import youtubeLogo from "../../assets/images/yt_logo_rgb_light.png";
import youtubeLogoDark from "../../assets/images/yt_logo_rgb_dark.png";
import {useEffect, useRef, useState} from "react";
import "./HeaderStyle.css";
import {BurgerMenu} from "./BurgerMenu";
import {SearchInput} from "./SearchInput";
import {SearchAndMicButton} from "./SearchAndMicButton";
import {MoreAndLoginButton} from "./MoreAndLoginButton";
import {Search} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {changeTheme} from "../../states/States1";
import {useSelector} from "react-redux";
import {useContext} from "react";
import {UseContext} from "../../App.jsx";
import axios from "axios";

// always send cookies so we stay authenticated
axios.defaults.withCredentials = true;

export const Header = () => {
	const dispatch = useDispatch();
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const userLocation = useSelector((state) => state.states.value.userLocation);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const videoMoreIconActive = useSelector((state) => state.states.value.videoMoreIconActive);
	const {handlePopoverDisable} = useContext(UseContext);
	const hiddenFileInput = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [videoTitle, setVideoTitle] = useState("");
	const [uploading, setUploading] = useState(false);
	const [uploadMessage, setUploadMessage] = useState("");
	const [showUploadPopup, setShowUploadPopup] = useState(false);

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			dispatch(changeTheme("systemDark"));
			return;
		}
		dispatch(changeTheme("systemLight"));
	}, []);

	// show the modal when upload button pressed
	const handleClick = (event) => {
		event.preventDefault();
		setShowUploadPopup(true);
	};

	const handleChange = (event) => {
		const fileUploaded = event.target.files[0];
		setSelectedFile(fileUploaded);
		// You can add immediate upload logic here or wait for a second "Upload" button click
	};

	const handleUpload = () => {
		// close modal as soon as user hits upload
		setShowUploadPopup(false);
		// always show spinner initially, even if we bail early
		setUploading(true);
		setUploadMessage("Preparing upload...");

		// authentication check
		if (!localStorage.getItem("username")) {
			alert("You must be signed in to upload videos.");
			setUploading(false);
			setUploadMessage("");
			return;
		}

		if (!selectedFile) {
			alert("Please select a file first!");
			setUploading(false);
			setUploadMessage("");
			return;
		}

		// proceed with actual upload
		setUploadMessage(`Uploading ${videoTitle || selectedFile.name}...`);
		const formData = new FormData();
		formData.append("videoFile", selectedFile); // "file" is the key expected by the server
		formData.append("title", videoTitle);

		// Replace with your actual backend endpoint
		axios
			.post("http://localhost:3000/upload", formData)
			.then((response) => {
				console.log("Upload success:", response.data);
				alert("File uploaded successfully!");
				// optionally reload the page or refresh video list
			})
			.catch((error) => {
				console.error("Upload error:", error);
				alert("File upload failed.");
			})
			.finally(() => {
				setUploading(false);
				setUploadMessage("");
			});
	};

	return (
		<>
			<div
				className={`w-[100%] h-[56px] flex items-center fixed top-0 justify-between pr-[18px] pl-[16px] z-[1000] ${
					themeMode === "systemDark" || themeMode === "dark" ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
				} max-md:pr-0 max-md:pl-0`}
				onClick={moreIconActive || videoMoreIconActive ? handlePopoverDisable : ""}
			>
				<div className="w-full flex justify-between">
					<div className="flex items-center">
						<BurgerMenu />
						<div title="YouTube Home" className="flex items-center ml-[14px] cursor-pointer">
							<img
								src={themeMode === "systemDark" || themeMode === "dark" ? youtubeLogoDark : youtubeLogo}
								width={90}
								height={20}
								alt="youtube logo"
								className=""
							/>
							<p
								className={`${
									themeMode === "dark" || themeMode === "systemDark" ? "text-white" : "text-black"
								} text-[10px] mb-[18px] ml-[5px]`}
							>
								{userLocation !== "" ? userLocation : ""}
							</p>
						</div>
					</div>
					<div className="w-[53%] flex mt-[1px] max-md:hidden">
						<SearchInput />
						<SearchAndMicButton />
					</div>
					{/* move overlay outside of the small flex container so it always appears on top */}
					{uploading && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
							<div className="bg-white dark:bg-gray-800 p-4 rounded">
								<p className="text-black dark:text-white">{uploadMessage}</p>
							</div>
						</div>
					)}
					<div className="flex items-center text-white cursor-pointer">
						<button onClick={handleClick}>Select File</button>
						{showUploadPopup && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
								<div className="bg-white dark:bg-gray-800 p-6 rounded w-[90%] max-w-[400px]">
									<h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Upload Video</h2>
									<input
										type="file"
										onChange={handleChange}
										name="videoFile"
										accept="video/*"
										className="mb-2 w-full"
									/>
									{selectedFile && (
										<p className="mb-2 text-sm text-black dark:text-white">{selectedFile.name}</p>
									)}
									<input
										value={videoTitle}
										onChange={(e) => setVideoTitle(e.target.value)}
										placeholder="Enter video title"
										className={`border p-1 mb-4 w-full bg-transparent ${
											themeMode === "dark" || themeMode === "systemDark" ? "text-white" : "text-black"
										}`}
									/>
									<div className="flex justify-end">
										<button
											className="mr-2 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
											onClick={() => setShowUploadPopup(false)}
										>
											Cancel
										</button>
										<button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleUpload}>
											Upload
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
					{/* authentication controls */}
					<div className="flex items-center">
						<MoreAndLoginButton />
					</div>
					<div className="hidden max-md:block max-md:mr-[15px] max-md:mt-[4px]">
						<Search
							className=""
							size={18}
							color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
