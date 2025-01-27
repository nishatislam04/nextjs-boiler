"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@mantine/core";
import {
  IconArrowBarToRight,
  IconArrowBarToLeft,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from "@tabler/icons-react";

export default function MantinePagination({ uri, totalPages, currentPage }) {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`${uri}?page=${page}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        total={totalPages}
        value={+currentPage}
        onChange={handlePageChange}
        color="gray"
        size="sm"
        radius="xl"
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
      />
    </div>
  );
}
