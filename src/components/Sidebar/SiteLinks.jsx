export const SiteLinks = () => {
	const date = new Date();

	return (
		<>
			<div className="mx-[26px] leading-[18px]">
				<a href="#" className="text-[13px] text-[#606060] inline-block font-medium">
					About
				</a>
				<a href="#" className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium">
					Press
				</a>
				<a href="#" className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium">
					Copyright
				</a>
				<a href="#" className="text-[13px] text-[#606060] inline-block font-medium">
					Contact us
				</a>
				<a href="#" className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium">
					Creators
				</a>
				<a href="#" className="text-[13px] text-[#606060] inline-block font-medium">
					Advertise
				</a>
				<a href="#" className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium">
					Developers
				</a>
			</div>
			<div className="ml-[26px] mt-[8px] leading-[18px]">
				<a href="#" className="text-[13px] text-[#606060] inline-block font-medium">
					Terms
				</a>
				<a href="#" className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium">
					Privacy
				</a>
				<a href="#" className="text-[13px] text-[#606060] ml-[8px] inline-block font-medium">
					Policy & safety
				</a>
				<a href="#" className="text-[13px] text-[#606060] inline-block font-medium">
					How YouTube works
				</a>
				<a href="#" className="text-[13px] text-[#606060] inline-block font-medium">
					Test new Features
				</a>
				<p className="text-[12px] text-[#93929E] mt-[15px]">&copy; {date.getFullYear()}</p>
			</div>
		</>
	);
};
