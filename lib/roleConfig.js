export const rolesConfig = {
	"/dashboard": ["admin", "super"],
	"/dashboard/user": ["admin", "super"],
	"/dashboard/user/create": ["super"],
	"/dashboard/user/show": ["admin", "super"],
	"/dashboard/user/edit": ["super"],
	"/dashboard/user/delete": ["super"],
	// "/dashboard/post/create": ["super"],
	"/dashboard/post/show": ["admin", "super"],
	"/dashboard/post/edit": ["super"],
	"/dashboard/post/delete": ["super"],
	"/post": ["admin", "super", "member"],
	"/post/create": ["super", "admin", "member"], // for now everyone can create post
	// "/private/post/create": ["super", "admin", "member"], // later we update it make only modify by the owner & super
	"/private/post/edit": ["super", "admin", "member"], // later we update it make only modify by the owner & super
	"/private/post/show": ["super", "admin", "member"], // later we update it make only modify by the owner & super
	"/private/post/delete": ["super", "admin", "member"], // later we update it make only modify by the owner & super
	"/user/posts/:id": ["super", "admin", "member"],
	"/dashboard/navLink": ["super", "admin"],
	"/dashboard/user/:id": ["admin", "super", "member"], // profile page
	"/dashboard/post/:id": ["admin", "super"],
	"/post/:id": ["admin", "super", "member"],
	"/": ["admin", "super", "member"],
};
