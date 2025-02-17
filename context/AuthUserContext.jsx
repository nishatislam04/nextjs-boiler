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
      return setUserData(JSON.parse(cachedUser));
    } else if (session?.userId) {
      const fetchUserData = async () => {
        try {
          console.log("calling api routes");
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

// export default function UserProvider({ children }) {
//   const [userData, setUserData] = useState(null);
//   const [sessionLoaded, setSessionLoaded] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     // 1️⃣ Try to get cached user data first
//     const cachedUser = localStorage.getItem("authUserData");

//     if (cachedUser) {
//       setUserData(JSON.parse(cachedUser));
//       setSessionLoaded(true); // ✅ Mark session as loaded
//       return;
//     }

//     // 2️⃣ If no cached data, use session from `useSession()`
//     (async () => {
//       const { data: session } = await import("next-auth/react").then((mod) =>
//         mod.useSession(),
//       );

//       if (!session?.userId) return; // No session, do nothing

//       try {
//         const response = await fetch(`/api/user/${session.userId}`);
//         const data = await response.json();
//         setUserData(data);

//         localStorage.setItem("authUserData", JSON.stringify(data));
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       } finally {
//         setSessionLoaded(true);
//       }
//     })();
//   }, []); // ✅ Runs only once on mount

//   // Prevent rendering before session is loaded
//   if (!sessionLoaded) return null;

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
