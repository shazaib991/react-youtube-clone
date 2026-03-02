import { ThreeDotsVertical } from "react-bootstrap-icons";
import { PersonCircle } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useRef, useContext, useState, useEffect } from "react";
import { UseContext } from "../../App.jsx";
import { changeMoreIconActive } from "../../states/States1";
import { useDispatch } from "react-redux";

export const MoreAndLoginButton = () => {
	const dispatch = useDispatch();
	const themeMode = useSelector((state) => state.states.value.themeMode);
	const moreIconActive = useSelector((state) => state.states.value.moreIconActive);
	const { handleHeaderTooltipMouseEnter } = useContext(UseContext);
	const { handleHeaderTooltipMouseLeave } = useContext(UseContext);
	const moreIcon = useRef();

	// auth state
	const [loggedIn, setLoggedIn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [channelImage, setChannelImage] = useState(null);
	const [channelName, setChannelName] = useState("");

	useEffect(() => {
		// naive check: existence of username in localStorage
		const u = localStorage.getItem("username");
		if (u) setLoggedIn(true);
	}, []);

	const handleMoreIconClick = () => {
		dispatch(changeMoreIconActive(!moreIconActive));
	};

	const openModal = (signup) => {
		setIsSignup(signup);
		if (!signup) setChannelName("");
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		// clear fields to avoid stale values
		setUsername("");
		setPassword("");
		setChannelName("");
		setChannelImage(null);
	};

	const submitCreds = async () => {
		const url = isSignup ? "/signup" : "/signin";
		try {
			let options = {
				method: "POST",
				credentials: "include",
			};
			if (isSignup) {
				const formData = new FormData();
				formData.append("username", username);
				formData.append("password", password);
				// include the channel name so backend can persist it
				formData.append("channelName", channelName);
				if (channelImage) formData.append("channelImage", channelImage);
				options.body = formData;
			} else {
				options.headers = { "Content-Type": "application/json" };
				options.body = JSON.stringify({ username, password });
			}
			const res = await fetch("https://youtube-clone-api-gamma.vercel.app" + url, options);
			const data = await res.json();
			if (data.success) {
				localStorage.setItem("username", username);
				setLoggedIn(true);
				closeModal();
				// refresh to load user-specific videos
				window.location.reload();
			} else {
				alert("Authentication failed");
			}
		} catch (e) {
			console.error(e);
			alert("Auth error");
		}
	};

	const handleSignout = async () => {
		await fetch("http://localhost:3000/signout", { method: "POST", credentials: "include" });
		localStorage.removeItem("username");
		setLoggedIn(false);
	};

	return (
		<>
			<div
				className={themeMode === "systemDark" || themeMode === "dark" ? "headerMoreIconDark" : "headerMoreIcon"}
				onClick={handleMoreIconClick}
				onMouseEnter={() => handleHeaderTooltipMouseEnter("moreIconTooltip")}
				onMouseLeave={() => handleHeaderTooltipMouseLeave("moreIconTooltip")}
				ref={moreIcon}
			>
				<ThreeDotsVertical
					size={18}
					color={`${themeMode === "systemDark" || themeMode === "dark" ? "#ffffff" : "#000000"}`}
				/>
			</div>
			{loggedIn ? (
				<div
					className="h-[35px] flex items-center border pl-[10px] pr-[15px] rounded-[40px] cursor-pointer hover:bg-red-200"
					onClick={handleSignout}
				>
					<p className="text-[14px] font-[500] text-red-500">Sign out</p>
				</div>
			) : (
				<div className="flex space-x-2">
					<div
						className="h-[35px] flex items-center border pl-[10px] pr-[15px] rounded-[40px] cursor-pointer hover:bg-[#def1ff]"
						onClick={() => openModal(false)}
					>
						<p className="text-[14px] font-[500] text-[#5e5eff] dark:text-white">Sign in</p>
					</div>
					<div
						className="h-[35px] flex items-center border pl-[10px] pr-[15px] rounded-[40px] cursor-pointer hover:bg-[#def1ff]"
						onClick={() => openModal(true)}
					>
						<p className="text-[14px] font-[500] text-[#5e5eff] dark:text-white">Sign up</p>
					</div>
				</div>
			)}

			{modalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded">
						<h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="border p-1 mb-2 w-full"
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="border p-1 mb-2 w-full"
						/>
						{isSignup && (
							<>
								<input
									type="text"
									placeholder="Channel Name"
									value={channelName}
									onChange={(e) => setChannelName(e.target.value)}
									className="border p-1 mb-2 w-full"
								/>
								<input
									type="file"
									accept="image/*"
									onChange={(e) => setChannelImage(e.target.files[0])}
									className="mb-2 w-full"
								/>
							</>
						)}
						<button onClick={submitCreds} className="bg-blue-500 text-white px-4 py-2 mr-2">
							{isSignup ? "Sign Up" : "Sign In"}
						</button>
						<button onClick={closeModal} className="px-4 py-2">
							Cancel
						</button>
					</div>
				</div>
			)}
		</>
	);
};
