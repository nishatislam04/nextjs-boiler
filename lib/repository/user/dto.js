import helpers from "@/lib/helpers";

/**
 * accept a single user from `toUsesDto()`
 * @param {*} user
 * @returns
 */
export function toUserDto(user) {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
	};
}

/**
 * accpt multple users
 * @param {*} users
 * @returns
 */
export function toUsersDto(users) {
	return users.map((user) => toUserDto(user));
}

/**
 * user post listings dto
 * @param {*} user
 * @returns
 */
export function toPostDto(post) {
	return {
		authorId: post.id,
		posts: {
			id: post.id,
			title: post.title,
			shortDescription: post.shortDescription,
			published: post.published ? "published" : "not published",
			createdAt: helpers.formatHumanReadableDate(post.createdAt),
		},
	};
}

/**
 *
 * @param {*} user
 * @returns
 */
export function userPostDto(user) {
	const id = user.id;
	let posts = user.posts;
	posts = posts.map((post) => {
		return {
			id: post.id,
			title: post.title,
			shortDescription: post.shortDescription,
			published: post.published ? "published" : "not published",
			createdAt: helpers.formatHumanReadableDate(post.createdAt),
		};
	});

	return {
		id,
		posts,
	};
}

export function toSingleUserDto(user) {
	return {
		name: user.name,
		email: user.email,
		image: user.image,
		username: user.username,
		profile: {
			bio: user.profile?.bio,
			website: user.profile?.website,
			location: user.profile?.location,
		},
	};
}
