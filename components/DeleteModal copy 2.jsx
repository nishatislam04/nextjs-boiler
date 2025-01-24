"use client";

import DeleteSvg from "@/prisma/svg/Delete";
import { Modal } from "flowbite-react";
import Button from "./Button";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteModal({
  deleteAction,
  uri,
  data,
  message = "Are you sure you want to delete this item?",
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        type="modal"
        padding="px-2 py-1"
        onClick={() => setOpenModal(true)}
        color="failure"
        textColor="white"
        bgColor="red"
        href={`/${uri}/delete?id=${data.id}`}
      >
        <DeleteSvg />
        Delete
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <form
                action={deleteAction.bind(null, data.id)}
                className="flex items-center"
              >
                <button
                  type="submit"
                  className="mr-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Yes, I&apos;m sure
                </button>
              </form>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
