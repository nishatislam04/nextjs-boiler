"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useEffect } from "react";

// Create the UserContext with default values
export const UserContext = createContext(null);

export default function UserProvider({ children }) {
	const [userData, setUserData] = useState(null);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchUserData = async () => {
			if (!session?.userId) {
				return;
			}

			try {
				const response = await fetch(`/api/user/${session.userId}`);
				const data = await response.json();
				setUserData(data);
			} catch (error) {
				console.error("Error fetching user data", error);
			}
		};

		fetchUserData();
	}, [session]);

	return (
		<UserContext.Provider value={{ userData }}>
			{children}
		</UserContext.Provider>
	);
}
