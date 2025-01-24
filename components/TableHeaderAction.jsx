import AddSvg from "@/prisma/svg/Add";
import Search from "./search";
import { Anchor, Select } from "@mantine/core";
import Link from "next/link";

export default function TableHeaderAction({
  authorId = "",
  queryValue,
  tableName,
  placeholder,
}) {
  return (
    <div className="mb-6 flex w-full items-center justify-start gap-3 p-2">
      {/* search */}
      <Search query={queryValue} placeholder={placeholder} />
      <div className="ml-auto">
        <Anchor
          variant="filled"
          color="indigo"
          component={Link}
          className=""
          href={`/${tableName.toLowerCase()}/create?authorId=${authorId}`}
        >
          <span className="flex gap-0">
            <AddSvg />
            Add {tableName}
          </span>
        </Anchor>
      </div>
    </div>
  );
}
