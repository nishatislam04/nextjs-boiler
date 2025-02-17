import { rolesConfig } from "@/lib/roleConfig";
import { matchPath } from "@/lib/matchPath"; // Function to match dynamic routes
import RoleErrorPage from "@/components/ui/auth/RoleErrorPage";
import { forbidden, unauthorized } from "next/navigation";
import { auth } from "@/app/auth";

export async function checkAuthAndRoles(pathname = "") {
  // 🔹Get the user session
  // const session = await sessionHelper.getUserSession();
  const session = await auth();
  if (!session) return unauthorized();

  // 🔹Find matching route in config (supports dynamic `[id]` paths)
  const matchedPath = Object.keys(rolesConfig).find((route) =>
    matchPath(route, pathname),
  );

  // 🔹 If no config found, show role config not setup page
  if (!matchedPath) return <RoleErrorPage />;

  // 🔹Check user authorization
  const requiredRoles = rolesConfig[matchedPath];
  const userRoles = session?.user?.roles;
  const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));

  // 🔹 Return authentication result
  if (!isAuthorized) return forbidden();

  return session;
}
