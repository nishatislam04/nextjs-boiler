"use client";

import { rolesConfig } from "@/lib/roleConfig";
import { useContext } from "react";
import { UserContext } from "@/context/AuthUserContext";
import Logger from "@/lib/logger";

export default function AuthorizedView({
  showForOwner = false,
  authorId = null,
  pathname,
  children,
}) {
  const { userData } = useContext(UserContext);

  // show the btn for only the owner. not SUPER USER
  if (showForOwner && userData?.id !== authorId) return null;

  // Check if rolesConfig has the current pathname and get the required roles
  const targetViewRoles = rolesConfig[pathname];

  if (!targetViewRoles) {
    return (
      <p className="text-xs font-light uppercase text-gray-300">
        auth fail: No roles defined for this path
      </p>
    );
  }

  // Check if at least one role of the authenticated user is in the target roles
  const isEligible = userData?.roles?.some((role) =>
    targetViewRoles.includes(role),
  );

  if (!isEligible) return null;

  return <>{children}</>;
}
