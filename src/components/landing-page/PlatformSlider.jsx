import { Youtube } from "lucide-react";
import Image from "next/image";
import { FaLastfm, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiBillboard, SiTencentqq } from "react-icons/si";

 const logos = [
	{
		name: "Youtube",
		url: <FaYoutube className="w-14 h-14 text-red-600 dark:text-white  brightness-100 invert-1 mx-10"  />,
	},
	{
		name: "Spotify",
		url: <FaSpotify className="w-14 text-green-600 dark:text-white h-14 brightness-100 invert-1 mx-10" />,
	},
	{
		name: "last.fm",
		url: (
			<FaLastfm className="w-14 h-14 text-red-500 dark:text-white  brightness-100 invert-1 mx-10" />
		),
	},
	{
		name: "Billboard",
		url: <SiBillboard className="w-[7.5rem] h-[7.5rem] brightness-100 invert-1 mx-7" />,
	},
	{
		name: "Melon",
		url: <img className="h-9 brightness-100 dark:invert dark:brightness-0 dark:contrast-200 invert-1 mx-5" src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Melon_logo.png" />,
	},
	{
		name: "Gennie",
		url: <img className="h-20 brightness-100  dark:invert dark:brightness-0 dark:contrast-200 invert-1 mx-2" src="https://image.ajunews.com/content/image/2021/10/05/20211005092058390766.png" />,
	},
	{
		name: "Bugs",
		url: <img className="h-20 brightness-100  dark:invert dark:brightness-0 dark:contrast-200 invert-1 mx-5" src="https://independentdigital.com/wp-content/uploads/2019/09/bugs_music-1.png" />,
	},
	,
];

const PlatformsSlider = () => {
	return (
		<div className="py-2 max-w-4xl scale-75">
            <p className="font-normal tracking-tighter text-base text-gray-100 bg-gradient-to-br from-zinc-400 via-zinc-300 to-zinc-700 bg-clip-text text-transparent text-center mt-8 mb-12">
				Data from multiple platforms*
			</p>

			<div className="relative bg-page-gradient h-full mx-auto max-w-full">
				<div className="absolute z-40 mx-auto  h-screen  overflow-hidden bg-inherit bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			</div>
			<div className="px-4 mx-auto w-full md:px-8 relative ">
				<div
					className="flex overflow-hidden relative gap-6 p-2 mt-[-40px] group"
					style={{
						maskImage:
							"linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
					}}
				>
					{Array(5)
						.fill(null)
						.map((_, index) => (
							<div
								key={`animated-logo-cloud-${index}`}
								className="flex flex-row gap-5 justify-around items-center animate-logo-cloud shrink-0"
							>
								{logos.map((logo, key) => (
									<div key={key}>{logo.url}</div>
								))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};



export default PlatformsSlider;