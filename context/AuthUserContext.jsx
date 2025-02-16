"use client";

import Logger from "@/lib/logger";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useEffect } from "react";

// Create the UserContext with default values
export const UserContext = createContext(null);

export default function UserProvider({ children }) {
	const { data: session } = useSession(null);

	// Initialize userData state as null (don't try to access localStorage immediately)
	const [userData, setUserData] = useState(null);

	// Read from localStorage inside useEffect (only runs on the client)
	useEffect(() => {
		if (typeof window === "undefined") return; // Ensure it's running on the client

		const cachedUser = localStorage.getItem("authUserData");

		if (cachedUser) {
			setUserData(JSON.parse(cachedUser));
		} else if (session?.userId) {
			const fetchUserData = async () => {
				try {
					const response = await fetch(`/api/user/${session.userId}`);
					const data = await response.json();
					setUserData(data);

					localStorage.setItem("authUserData", JSON.stringify(data));
				} catch (error) {
					console.error("Error fetching user data", error);
				}
			};

			Logger.info(null, "calling fetch user");
			fetchUserData();
		}
	}, [session]); // Only re-run when `session` changes

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
}
