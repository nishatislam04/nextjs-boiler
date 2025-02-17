import { fetchPostListings, fetchTotalCount } from "@/lib/repository/post/dal";
import { CURRENT_PAGE, POSTLISTINGS_PER_PAGE } from "@/lib/settings";
import {
  AspectRatio,
  Card,
  Container,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import Logger from "@/lib/logger";

/**
 * THIS PAGE IS THE PUBLIC POST LISTINGS PAGE
 *
 * @param param0
 * @param param0.searchParams
 */
export default async function PublicPostPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = params?.page || CURRENT_PAGE;
  const posts = await fetchPostListings(currentPage);
  let totalPostCount = await fetchTotalCount();
  const totalPages = Math.ceil(totalPostCount / POSTLISTINGS_PER_PAGE);

  const cards = posts.map((post) => (
    <Card
      key={post.id}
      p="md"
      radius="md"
      component={Link}
      href={`/post/singlePost?postId=${post.id}`}
      className="mb-5 transform rounded-lg border border-gray-200 bg-white transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md"
    >
      {/* Cover Photo */}
      <AspectRatio ratio={1920 / 1080} className="overflow-hidden rounded-lg">
        <Image
          alt="Cover Photo"
          height={300}
          width={400}
          className="h-full w-full object-cover"
          src={
            post.coverPhoto ||
            "https://placehold.co/600x400?text=No+Cover+Photo+Found"
          }
        />
      </AspectRatio>

      {/* Date */}
      <Text className="!mt-4 !text-xs !font-semibold !uppercase !tracking-wider !text-gray-600">
        {post.createdAt}
      </Text>

      {/* Title */}
      <Text className="!mt-2 !text-lg !font-bold !leading-6 !text-gray-900">
        {post.title}
      </Text>

      {/* Short Description */}
      <Text className="!mt-3 !text-sm !leading-6 !text-gray-700">
        {post.shortDescription}
      </Text>
    </Card>
  ));

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col flex-wrap items-center justify-between p-4">
      <div className="text-xl uppercase underline underline-offset-4">
        post listings action
      </div>
      <Container py="xl" fluid>
        <SimpleGrid className="" spacing="xs" cols={{ base: 1, sm: 2, lg: 3 }}>
          {cards}
        </SimpleGrid>
      </Container>

      <div className="py-8">
        <Pagination
          uri="post/publicPost"
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
