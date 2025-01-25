import { signIn } from "@/app/auth";
import GithubSvg from "@/prisma/svg/github";
import { Button } from "@mantine/core";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        // await signIn("github");
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      {/* <button
        type="submit"
        className="mb-2 me-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
      >
        <GithubSvg />
        sign in
      </button> */}
      <Button leftSection={<GithubSvg />} type="submit" variant="light">
        Sign in
      </Button>
    </form>
  );
}
