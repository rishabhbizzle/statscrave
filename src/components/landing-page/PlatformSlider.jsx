import Image from "next/image";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import { SiBillboard, SiTencentqq } from "react-icons/si";

 const logos = [
	{
		name: "Spotify",
		url: <FaSpotify className="w-16 h-16 brightness-100 invert-1 mx-10" />,
	},
	{
		name: "last.fm",
		url: (
			<FaLastfm className="w-16 h-16 brightness-100 invert-1 mx-10" />
		),
	},
	{
		name: "Billboard",
		url: <SiBillboard className="w-28 h-28 brightness-100 invert-1 mx-10" />,
	},
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