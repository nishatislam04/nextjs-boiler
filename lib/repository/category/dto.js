/**
 * accept a single category from `toUsesDto()`
 * @param {*} category
 * @returns
 */
export function toCategoryDto(category) {
	return {
		id: category.id,
		name: category.name,
		email: category.email,
	};
}

/**
 * accept multiple caegories
 * @param {*} categories
 * @returns
 */
// export function toCategoriesDto(categories) {
// return categories.map((category) => toUserDto(category));
// }
