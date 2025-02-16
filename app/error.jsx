"use client";

export default function Error({ error, reset }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-h-screen bg-gray-50">
      <div className="flex w-[60%] min-w-[80%] max-w-[90%] flex-col items-center justify-center">
        <p className="mt-4 text-5xl font-bold tracking-wider text-gray-600 md:text-6xl lg:text-4xl">
          Something Went Wrong!
        </p>
        <p
          className={`mt-8 max-h-60 w-full overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 bg-red-400 px-4 py-8 leading-6 text-white shadow-md`}
        >
          {error.message || "A global error occurred."}
        </p>
      </div>
      <button
        onClick={reset}
        className="absolute top-0 px-4 py-2 text-white bg-blue-600 rounded right-12 mt-14 hover:bg-blue-700"
      >
        Reload
      </button>
    </div>
  );
}
