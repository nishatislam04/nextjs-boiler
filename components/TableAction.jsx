"use client";
import ViewSvg from "@/svg/View";
// import Button from "./Button";
import EditSvg from "@/svg/Edit";
import DeleteModal from "./DeleteModal";
import { IconEye } from "@tabler/icons-react";
import { IconEdit } from "@tabler/icons-react";
import { Anchor, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function TableAction({ deleteAction, uri, data }) {
  const router = useRouter();
  const view = <IconEye />;
  const edit = <IconEdit />;

  return (
    <td className="min-w-[20px] space-x-2 px-6 py-4">
      {/* <Button
				href={`/${uri}/show?id=${data.id}`}
				padding="px-2 py-1">
				<ViewSvg />
				View
			</Button> */}
      <Anchor component={Link} href={`/${uri}/show?id=${data.id}`}>
        View
      </Anchor>
      {/* <Button
        id="test"
        onClick={router.push(`/${uri}/edit?id=${data.id}`)}
        href={`/${uri}/edit?id=${data.id}`}
        padding="px-2 py-1"
        textColor="white"
        bgColor="yellow"
      >
        <EditSvg />
        Edit
      </Button> */}
      <Anchor component={Link} href={`/${uri}/edit?id=${data.id}`}>
        Edit
      </Anchor>
      {/* delete modal */}
      <DeleteModal
        deleteAction={deleteAction}
        uri={uri}
        data={data}
        title={`Delete ${uri}`}
        message={`Are you sure you want to delete this ${uri}?`}
      />
    </td>
  );
}
