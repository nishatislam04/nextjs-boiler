import { signOut } from "@/app/auth";
import SignoutSvg from "@/prisma/svg/Signout";
import { Button } from "@mantine/core";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ callbackUrl: "/dashboard" });
      }}
    >
      {/* <button
				type="submit"
				className="flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
				sign out
				<SignoutSvg />
			</button> */}
      <Button
        rightSection={<SignoutSvg />}
        type="submit"
        variant="light"
        color="red"
      >
        Sign out
      </Button>
    </form>
  );
}
