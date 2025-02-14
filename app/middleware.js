import { NextResponse } from "next/server";
export { auth } from "next-auth/middleware";

export function middleware(req) {
	let cookie = req.cookies.get("nextjs");
	console.log(cookie, "cooooo");

	//
	// const requestHeaders = new Headers(req.headers);
	// requestHeaders.set("x-hello-from-middleware1", "hello");

	//
	const { pathname } = req.nextUrl; // Get the current pathname from the request
	console.log("Middleware Pathname:", pathname); // Optional logging
	// Create a new response with a custom header to store the pathname
	const response = NextResponse.next();
	response.headers.append("X-Pathname", pathname); // Add the pathname to a custom header

	//
	response.headers.append("x-hello-from-middleware2", "hello");

	return response;
}

export const config = {
	matcher: ["/dashbaord/:path*", "/:path*"],
};
