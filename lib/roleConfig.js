export const rolesConfig = {
  "/dashboardPage": ["admin", "super"],
  "/dashboard/userPage": ["admin", "super"],
  "/dashboard/user/createBtn": ["super"],
  "/dashboard/user/editBtn": ["super"],
  "/dashboard/user/deleteBtn": ["super"],
  "/dashboard/userPost/editBtn": ["super"],
  "/dashboard/userPost/deleteBtn": ["super"],
  "/dashboard/user/createPage": ["super"],
  "/dashboard/user/showPage": ["super", "admin"],
  "/dashboard/user/editPage": ["super"],
  "/dashboard/post/editPage": ["super"],
  "/post": ["admin", "super", "member"],
  "/post/create": ["super", "admin", "member"], // for now everyone can create post
  "/post/editBtn": ["super", "admin", "member"],
  "/post/deleteBtn": ["super", "admin", "member"],
  "/post/editPage": ["super", "admin", "member"], // later we update it make only modify by the owner & super
  "/post/show": ["super", "admin", "member"], // later we update it make only modify by the owner & super
  "/dashboard/navLink": ["super", "admin"],
  "/dashboard/userPostPageListings/:id": ["super", "admin"],
  "/user/show/:id": ["super", "admin", "member"],
  "/user/personalPostListings/:id": ["super", "admin", "member"], // from homepage
  "/post/:id": ["admin", "super", "member"],
  "/": ["admin", "super", "member"],
};
