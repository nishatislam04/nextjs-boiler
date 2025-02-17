import Logger from "@/lib/logger";
import sessionHelper from "@/lib/sessionHelper";
import { Button, Card, Text } from "@mantine/core";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { auth } from "./auth";

export default async function Home() {
  const session = await auth();
  if (!session) unauthorized();

  return (
    <main className="relative mx-auto max-w-screen-xl">
      <section className="mt-6 flex flex-wrap justify-start gap-4">
        {/* Profile section */}
        <section className="w-full sm:w-1/2 md:w-1/3">
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="flex flex-col"
          >
            <div className="mb-4 flex items-center">
              <Text weight={500} size="lg">
                My Profile
              </Text>
            </div>
            <Text size="sm" color="dimmed">
              View your profile information
            </Text>
            <Link href={`/user/${session.userId}`}>
              <Button variant="light" color="blue" fullWidth mt="md">
                View Profile
              </Button>
            </Link>
          </Card>
        </section>

        {/* user posts section */}
        <section className="w-full sm:w-1/2 md:w-1/3">
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            className="flex flex-col"
          >
            <div className="mb-4 flex items-center">
              <Text weight={500} size="lg">
                My Posts
              </Text>
            </div>
            <Text size="sm" color="dimmed">
              View all your posts here
            </Text>
            <Link href={`/post?id=${session.userId}`}>
              <Button variant="light" color="green" fullWidth mt="md">
                View Posts
              </Button>
            </Link>
          </Card>
        </section>
      </section>
    </main>
  );
}
