"use client";
import { usePathname, useRouter } from "next/navigation";
// import Button from "./Button";
import BackSvg from "@/prisma/svg/Back";
import { Button } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

export default function GoBack() {
  // todo: make sure, this component only render in 2nd page.
  // even if it was invoke in first page
  const pathname = usePathname();
  const route = pathname.split("/");
  const router = useRouter();

  const baseClasses =
    "text-sm font-medium inline-flex items-center rounded-lg mr-1 text-white px-3 py-1 absolute -top-16 right-2 capitalize";
  const backgroundColor = `bg-gray-500 hover:bg-gray-700`;
  const darkBackground = `dark:bg-gray-500 dark:hover:bg-gray-500`;
  const back = <IconChevronLeft />;

  if (route.length > 1)
    return (
      <div className="absolute -top-16 right-2">
        <Button
          leftSection={back}
          onClick={() => router.back()}
          variant="light"
          color="gray"
          size="xs"
          radius="xs"
        >
          back
        </Button>
      </div>
      // <button
      //   type="button"
      //   className={`${baseClasses} ${backgroundColor} ${darkBackground}`}
      //   onClick={() => router.back()}
      // >
      //   <BackSvg />
      //   back
      // </button>
      // <Button
      // 	isBackButton={true}
      // 	type="button"
      // 	btnClasses="absolute -top-10 right-5 me-2"
      // 	padding="px-3 py-1"
      // 	bgColor="gray">
      // 	<BackSvg />
      // 	go back
      // </Button>
    );
}
