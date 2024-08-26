"use client";
import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Twitter } from "lucide-react";

export function TwitterBorder() {
	return (
		<a href="https://x.com/statscrave" target="_blank">
			<HoverBorderGradient
				containerClassName="rounded-full"
				className="group/anchor z-20  pr- flex items-center justify-center gap-4 rounded-full dark:bg-black bg-white text-black/80 dark:text-white/80  py-2 text-sm"
			>
				<Twitter className="h-4 w-4" />
				<div className="flex items-center justify-center">
					{" "}
					Follow us on Twitter{" "}
					<LinkArrow
						classname="group-hover/anchor:opacity-100 opacity-0 transition"
						stroke="#ffffff"
					/>
				</div>
			</HoverBorderGradient>
		</a>
	);
}

export function HoverBorderGradient({
	children,
	containerClassName,
	className,
	as: Tag = "button",
	duration = 1,
	clockwise = true,
	...props
}){
	const [hovered, setHovered] = useState(false);
	const [direction, setDirection] = useState("TOP");

	const rotateDirection = (currentDirection) => {
		const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
		const currentIndex = directions.indexOf(currentDirection);
		const nextIndex = clockwise
			? (currentIndex - 1 + directions.length) % directions.length
			: (currentIndex + 1) % directions.length;
		if (!directions[nextIndex]) {
			return directions[0];
		}
		return directions[nextIndex];
	};

	const movingMap = {
		TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		BOTTOM:
			"radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		RIGHT:
			"radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
	};

	const highlight =
		"radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";
	useEffect(() => {
		if (!hovered) {
			const interval = setInterval(() => {
				setDirection((prevState) => rotateDirection(prevState));
			}, duration * 1000);
			return () => clearInterval(interval);
		}
	}, [hovered]);
	return (
		<Tag
			onMouseEnter={(event) => {
				setHovered(true);
			}}
			onMouseLeave={() => setHovered(false)}
			className={cn(
				"relative h-min w-fit transition duration-500 group/anchor flex items-center justify-center gap-4 rounded-full text-white/80 text-sm",
				containerClassName,
			)}
			{...props}
		>
			<div
				className={cn(
					"z-10 w-auto rounded-[inherit] px-4 py-2 text-white",
					className,
				)}
			>
				{children}
			</div>
			<motion.div
				className={cn(
					"absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]",
				)}
				style={{
					filter: "blur(2px)",
					position: "absolute",
					width: "100%",
					height: "100%",
				}}
				initial={{ background: movingMap[direction] }}
				animate={{
					background: hovered
						? [movingMap[direction], highlight]
						: movingMap[direction],
				}}
				transition={{ ease: "linear", duration: duration ?? 1 }}
			/>
			<div className="z-1 absolute inset-[2px] flex-none rounded-[100px] bg-[#121E2C]" />
		</Tag>
	);
}


function LinkArrow({
	classname,
	stroke,
}) {
	return (
		<svg
			className={classname}
			stroke={stroke}
			width="24px"
			height="24px"
			viewBox="-2.4 -2.4 28.80 28.80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				{" "}
				<path
					d="M7 17L17 7M17 7H8M17 7V16"
					stroke="currentColor"
					strokeWidth="0.792"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>{" "}
			</g>
		</svg>
	);
}

export default LinkArrow;