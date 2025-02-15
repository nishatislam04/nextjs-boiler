"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useEffect } from "react";

// Create the UserContext with default values
export const UserContext = createContext(null);

export default function UserProvider({ children }) {
	// Always call useSession() unconditionally
	const { data: session, status } = useSession(); // Get session status (loading, authenticated, etc.)

	// Retrieve cached user data from localStorage if available
	const cachedUser =
		typeof window !== "undefined"
			? localStorage.getItem("authUserData")
			: null;

	// Initialize userData state with cached user data or null if not available
	const [userData, setUserData] = useState(
		cachedUser ? JSON.parse(cachedUser) : null
	);
	const [loading, setLoading] = useState(cachedUser ? false : true); // Set loading to false if data is cached

	useEffect(() => {
		// If cached data exists, no need to fetch again
		if (cachedUser) {
			setLoading(false);
			return;
		}

		// Only fetch user data if session is available and cached data doesn't exist
		const fetchUserData = async () => {
			if (!session?.userId) {
				setLoading(false);
				return;
			}

			try {
				const response = await fetch(`/api/user/${session.userId}`);
				const data = await response.json();
				setUserData(data);

				// Store user data in localStorage for future requests
				localStorage.setItem("authUserData", JSON.stringify(data));
			} catch (error) {
				console.error("Error fetching user data", error);
			} finally {
				setLoading(false);
			}
		};

		// Fetch user data only if session is available and cached data is not available
		if (!cachedUser && session?.userId) {
			fetchUserData();
		}
	}, [session, cachedUser, status]); // Only refetch if session changes

	return (
		<UserContext.Provider value={{ userData, setUserData, loading }}>
			{children}
		</UserContext.Provider>
	);
}
