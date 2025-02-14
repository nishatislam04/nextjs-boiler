export default function NotAuthenticated() {
	return (
		<div className="relative mx-auto min-h-[calc(100vh-75px)] max-w-screen-xl p-4 flex justify-center items-center">
			<p className="text-center text-2xl text-gray-400 font-light">
				❌ SignIn Error: You Are Not SignedIn to View This Page
			</p>
		</div>
	);
}
