import prisma from "@/lib/db";
import { toPostDto } from "./dto";

export async function fetchPost(id) {
  let post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: true,
      tags: true,
      author: true,
    },
  });

  // console.log("single post", post);

  post = toPostDto(post);
  return post;
}
