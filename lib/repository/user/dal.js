import {
  toSingleUserDto,
  toSingleUserProfileDto,
  toUsersDto,
  userPostDto,
} from "@/lib/repository/user/dto";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { CACHE_TTL_SHORT, PER_PAGE } from "@/lib/settings";
import helpers from "@/lib/helpers";
import { notFound } from "next/navigation";
import redisCacheKey from "@/lib/redisCacheKey";

/**
 * fetch all users with their posts
 * @param {*} currentPage  current requested page number EX: 1|2|3
 * @param {*} itemPerPage item per page to show (fetch from settings)
 * @param {*} query search query parameter
 * @param {*} orderBy order field | accept: name, email
 * @returns
 */
export async function fetchUserListings(
  currentPage,
  query = "",
  queryBy = "",
  orderBy,
) {
  const cacheKey = redisCacheKey.buildCacheKey(redisCacheKey.userListings, {
    currentPage,
    query,
    orderBy,
    queryBy,
  });
  let users = await redis.get(cacheKey);

  if (users) {
    users = helpers.decompress(Buffer.from(users, "base64"));
    return users;
  }

  const whereCondition =
    queryBy && query
      ? {
          [queryBy]: {
            contains: query,
            // mode: "insensitive",
          },
        }
      : {};

  users = await prisma.user.findMany({
    where: whereCondition,
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy,
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
  });
  users = toUsersDto(users);

  await redis.set(
    cacheKey,
    Buffer.from(helpers.compressData(users)).toString("base64"),
    "EX",
    CACHE_TTL_SHORT,
  );
  return users;
}

/**
 * fetch total user count
 * @returns
 */
export async function fetchTotalCount() {
  return await prisma.user.count();
}

/**
 * Get post listings for a individual user
 * @param {*} currentPage
 * @param {*} id
 * @param {*} orderBy
 * @param {*} query
 * @returns
 */
export async function fetchUserPosts(currentPage, id, orderBy, query, queryBy) {
  const whereCondition =
    queryBy && query
      ? {
          [queryBy]: {
            contains: query,
            // mode: "insensitive",
          },
        }
      : {};

  const cacheKey = redisCacheKey.buildCacheKey(redisCacheKey.userPostListings, {
    currentPage,
    id,
    orderBy,
    query,
    queryBy,
  });
  let user = await redis.get(cacheKey);

  if (user) {
    user = helpers.decompress(Buffer.from(user, "base64"));
    return user;
  }

  user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: {
        where: whereCondition,
        orderBy,
        skip: (currentPage - 1) * PER_PAGE,
        take: PER_PAGE,
      },
    },
  });
  user = userPostDto(user);

  await redis.set(
    cacheKey,
    Buffer.from(helpers.compressData(user)).toString("base64"),
    "EX",
    CACHE_TTL_SHORT,
  );
  return user;
}

/**
 * count posts for individual user
 * @param {*} id
 * @returns
 */
export async function fetchTotalPostsUserCount(id) {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  // return {
  //   totalPages: result?._count.posts || 0,
  // };
  return result?._count.posts;
}

export async function fetchUser(id) {
  let user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  user = toSingleUserDto(user);
  return user;
}

export async function fetchUserProfile(id) {
  const cacheKey = redisCacheKey.buildCacheKey(redisCacheKey.userProfilePage, {
    id,
  });

  let user = await redis.get(cacheKey);

  if (user) {
    user = helpers.decompress(Buffer.from(user, "base64"));
    return user;
  }
  user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      roles: true,
      _count: {
        select: { posts: true },
      },
    },
  });

  if (!user) notFound();

  user = toSingleUserProfileDto(user);

  await redis.set(
    cacheKey,
    Buffer.from(helpers.compressData(user)).toString("base64"),
    "EX",
    CACHE_TTL_SHORT,
  );
  return user;
}
