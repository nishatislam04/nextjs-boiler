import GoBack from "@/components/ui/GoBack";
import Logger from "@/lib/logger";
import { fetchPost } from "@/lib/repository/post/dal";
import { AspectRatio, Badge, Card, Group, Text } from "@mantine/core";
import Image from "next/image";

/**
 * THIS PAGE IS SINGLE POST PAGE FROM PUBLIC POST UserListingsTable
 *
 * @param param0
 */
export default async function SinglePostPage({ searchParams }) {
  const params = await searchParams;
  const post = await fetchPost(+params.postId);
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl flex-col items-stretch justify-center">
      {/* go back */}
      <section className="sticky top-6 self-end">
        <GoBack />
      </section>

      <section className="mt-12">
        {/* Cover Photo */}
        <AspectRatio ratio={16 / 9} className="mb-6 overflow-hidden rounded-lg">
          <Image
            component={Image}
            height={300}
            width={600}
            className="h-full w-full object-cover"
            alt={`${post.title} cover photo`}
            src={
              post.coverPhoto ||
              "https://placehold.co/600x400?text=No+Cover+Photo+Found"
            }
          />
        </AspectRatio>

        {/* Post Meta */}
        <Group position="apart" className="mb-6">
          <div>
            <Text size="sm" color="dimmed">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </Text>
            <Text size="sm" color="dimmed">
              Author: {post.author.name}
            </Text>
          </div>
        </Group>

        {/* Post Title */}
        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

        {/* Post Description */}
        <Text
          className="whitespace-pre-wrap break-words !leading-relaxed"
          size="sm"
          style={{
            maxWidth: "65ch",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {post.description}
        </Text>

        {/* Tags */}
        <section className="my-6">
          <Text size="sm" className="font-semibold">
            Tags:
          </Text>
          <Group spacing={10} className="mt-2">
            {post.tags.map((tag) => (
              <Badge key={tag.value} variant="outline" color="blue">
                {tag.label}
              </Badge>
            ))}
          </Group>
        </section>

        {/* Categories */}
        <section className="mb-6">
          <Text size="sm" className="font-semibold">
            Categories:
          </Text>
          <Group spacing={10} className="mt-2">
            {post.categories.map((category) => (
              <Badge key={category.value} variant="outline" color="green">
                {category.label}
              </Badge>
            ))}
          </Group>
        </section>

        {/* Related Posts Section */}
        <Card shadow="sm" radius="md" className="mt-12">
          <Text size="lg" weight={500} className="mb-4">
            Related Posts
          </Text>
          {/* Here you can dynamically load related posts */}
          <div>
            {/* Map through related posts */}
            <Text color="dimmed">Related posts will go here.</Text>
          </div>
        </Card>
      </section>
    </main>
  );
}
