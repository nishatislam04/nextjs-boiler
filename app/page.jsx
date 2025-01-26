"use client";
import { Button } from "@mantine/core";
import prisma from "../lib/db";
import { useEffect, useState } from "react";

export default function Home() {
	const [first, setfirst] = useState("");
	useEffect(() => {
		console.log(first);
	}, []);

	function hello() {
		<image
			src=""
			alt=""
		/>;
		console.log("tet");
	}

	hello();

	var ami = "test";
	let unusedVar = "I'm not used";
	console.log("Hello World"); // Should be flagged by ESLint
	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">home</div>
	);
}
