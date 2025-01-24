import AddSvg from "@/prisma/svg/Add";
import Button from "./Button";
import Search from "./search";

export default function TableHeaderAction({
  authorId = "",
  queryValue,
  tableName,
  placeholder,
}) {
  return (
    <div className="mb-6 flex w-full items-center justify-start gap-3 p-2">
      {/* drop down button */}
      <button
        id="dropdownRadioButton"
        data-dropdown-toggle="dropdownRadio"
        className="inline-flex w-40 items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        type="button"
      >
        <svg
          className="me-3 h-3 w-3 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
        </svg>
        Last 30 days
        <svg
          className="ms-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* dropdown menu */}
      <div
        id="dropdownRadio"
        className="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="top"
        style={{
          position: "absolute",
          inset: "auto auto 0px 0px",
          margin: "0px",
          transform: "translate3d(522.5px, 3847.5px, 0px)",
        }}
      >
        <ul
          className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownRadioButton"
        >
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-1"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-1"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last day
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-2"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-2"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last 7 days
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-3"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-3"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last 30 days
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-4"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-4"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last month
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="filter-radio-example-5"
                type="radio"
                value=""
                name="filter-radio"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="filter-radio-example-5"
                className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last year
              </label>
            </div>
          </li>
        </ul>
      </div>

      {/* search */}
      <Search query={queryValue} placeholder={placeholder} />

      <Button
        type="button"
        href={`/${tableName.toLowerCase()}/create?authorId=${authorId}`}
        padding="px-3 py-1"
        btnClasses="ml-auto text-sm font-medium"
      >
        <AddSvg />
        Add {tableName}
      </Button>
    </div>
  );
}
