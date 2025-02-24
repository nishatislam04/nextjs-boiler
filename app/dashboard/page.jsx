import { Button, Card, Text, Title } from "@mantine/core";
import Image from "next/image";
import { checkAuthAndRoles } from "@/lib/authHelper";
import Logger from "@/lib/logger";
import React from "react";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";

export default async function DashboardPage() {
  const authResult = await checkAuthAndRoles("/dashboardPage");
  if (React.isValidElement(authResult)) return authResult;

  const authUser = authResult.user;

  return (
    <div className="relative mx-auto mt-12 flex min-h-[100vh-75px] max-w-screen-xl flex-col justify-center gap-2 p-4">
      <div className="flex">
        <div className="mr-auto w-1/2">
          <Title className="w-full" order={1}>
            logged in user information:
          </Title>
          <div className="mt-4 flex flex-col gap-2">
            <Text
              className="mt-44"
              size="xl"
              fw={600}
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 0 }}
            >
              Name: {authUser.name}
            </Text>
            <Text
              className="mt-44"
              size="xl"
              fw={600}
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 0 }}
            >
              Email: {authUser.email}
            </Text>
            <Text
              className="mt-44"
              size="xl"
              fw={600}
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 0 }}
            >
              Username: {authUser.username}
            </Text>
            <Text
              className="mt-44"
              size="xl"
              fw={600}
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 0 }}
            >
              Role: {authUser?.roles.join(", ")}
            </Text>
          </div>
        </div>
        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          <Image
            src={
              authUser.image || "https://placehold.co/600x400?text=Placeholder"
            }
            alt={authUser.name || "User"}
            width={160}
            height={160}
            className="object-cover"
          />
        </div>
      </div>
      <Card
        component={Link}
        href="/dashboard/user"
        className="mt-28 w-44 cursor-pointer rounded-md bg-gray-300 text-black transition-all"
        shadow="sm"
        withBorder
      >
        <Button
          leftSection={<IconUser size={18} />}
          variant="subtle"
          className="w-full px-2 py-1 text-black"
        >
          Users
        </Button>
      </Card>
    </div>
  );
}
