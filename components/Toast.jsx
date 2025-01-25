"use client";

import { flashMessage } from "@thewebartisan7/next-flash-message";
import { useEffect, useRef, useState } from "react";

import CloseSvg from "@/prisma/svg/Close";
import SuccessSvg from "@/prisma/svg/success";
import { notifications } from "@mantine/notifications";

/**
 * Toast Component
 * A reusable toast notification component that shows messages and automatically disappears after a set duration.
 *
 * @returns {JSX.Element} The Toast UI Component
 */

export default function Toast() {
  // State to manage the message displayed in the toast
  // const [message, setMessage] = useState(null);

  // State to manage the visibility of the toast
  // const [isVisible, setIsVisible] = useState(false);

  // Reference to the container for future enhancements (if needed)
  // const toastContainer = useRef(null);

  useEffect(() => {
    const showFlashMessage = async () => {
      const flash = await flashMessage();

      if (flash && flash.level === "success") {
        notifications.show({
          title: "success",
          message: flash.message,
          position: "top-right",
          color: "indigo",
          radius: "md",
        });
      } else if (flash && flash.level === "error") {
        notifications.show({
          title: "Error",
          message: flash.message,
          position: "top-right",
          color: "red",
          radius: "md",
        });
      }
      // setMessage(flash.message);
      // setIsVisible(true); // Show the toast

      // Automatically hide the toast after 3 seconds
      // setTimeout(() => {
      //   setMessage(null);
      //   setIsVisible(false); // Hide the toast
      // }, 3000);
    };

    showFlashMessage();

    // const interval = setInterval(showFlashMessage, 8000); // Poll for new messages every second

    // return () => clearInterval(interval);
  }, []);
  return (
    <div className=""></div>
    // <div className="w-full" ref={toastContainer}>
    //   <div
    //     id="toast-message"
    //     className={`${
    //       message ? "absolute -top-[70px] right-0" : "hidden"
    //     } mb-4 flex w-full max-w-xs items-center justify-end rounded-lg bg-white p-4 text-gray-500 shadow-lg dark:bg-gray-800 dark:text-gray-400`}
    //     role="alert"
    //   >
    //     <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
    //       <SuccessSvg />
    //       <span className="sr-only">Check icon</span>
    //     </div>
    //     <div className="ms-3 text-sm font-normal">
    //       <div>{message}</div>
    //     </div>
    //     <button
    //       type="button"
    //       className="-mx-1.5 -my-1.5 ms-auto inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
    //       data-dismiss-target="#toast-message"
    //       aria-label="Close"
    //       onClick={() => {
    //         setMessage(null); // Manually close the toast
    //         toastContainer.current.hidden = true;
    //       }}
    //     >
    //       <span className="sr-only">Close</span>
    //       <CloseSvg />
    //     </button>
    //   </div>
    // </div>
  );
}
