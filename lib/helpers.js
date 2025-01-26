import { format, formatDistanceToNow, parseISO } from "date-fns";
import zlib from "zlib";
import redis from "./redis";

/**
 * Helper function to determine sorting criteria from a list of potential sorting objects.
 *
 * @param {Array<Object>} sortOptions - Array of sorting options, e.g., [ { name: 'asc' }, { email: 'desc' } ].
 * @param {Object} defaultSort - Default sorting criteria, e.g., { name: 'asc' }.
 * @returns {Object} - The first valid sorting criteria found or the default sort.
 */
export function sortData(sortOptions, defaultSort) {
  if (!Array.isArray(sortOptions) || sortOptions.length === 0) {
    throw new Error(
      "First argument must be a non-empty array of sorting options.",
    );
  }

  if (typeof defaultSort !== "object" || !defaultSort) {
    throw new Error(
      "Second argument must be an object specifying default sorting criteria.",
    );
  }

  // Find the first valid (non-null) sorting key from the options
  for (const option of sortOptions) {
    const [key, value] = Object.entries(option)[0]; // Get the key and value from the current sort option
    if (value) {
      return { [key]: value }; // Return the first valid sorting option
    }
  }

  // If no valid sorting option is found, return the default sort
  return defaultSort;
}

/**
 * Format Date (CreatedAt field) as human readable
 * @param {*} dateString
 * @returns
 */
export function formatHumanReadableDate(dateString) {
  // Ensure the date is parsed correctly
  const date = new Date(dateString); // Handles non-ISO formats

  if (isNaN(date)) {
    // Handle invalid date input gracefully
    console.error("Invalid date format:", dateString);
    return "Invalid date";
  }

  const now = new Date();
  const differenceInDays = (now - date) / (1000 * 60 * 60 * 24); // Calculate day difference

  // Display as "x hours/days/weeks ago" or full date if older than a month
  if (differenceInDays < 1) {
    return formatDistanceToNow(date, { addSuffix: true }); // e.g., "X hours ago"
  } else if (differenceInDays < 7) {
    return `${Math.floor(differenceInDays)} days ago`; // e.g., "3 days ago"
  } else if (differenceInDays < 30) {
    const weeks = Math.floor(differenceInDays / 7);
    return weeks === 1 ? "a week ago" : `${weeks} weeks ago`; // e.g., "2 weeks ago"
  } else if (differenceInDays < 60) {
    return "a month ago"; // e.g., "a month ago"
  } else {
    return format(date, "dd/MM/yyyy"); // e.g., "23/01/2025"
  }
}

/**
 * Converts a given date to the format dd/mm/yyyy.
 *
 * @param {Date|string|number} date - The date to format. Can be a Date object, a timestamp, or an ISO string.
 * @returns {string} - The formatted date in dd/mm/yyyy format.
 */
export const formatDate = (date) => {
  try {
    // Convert the date to dd/mm/yyyy format
    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    console.error("Invalid date provided:", error.message);
    return "Invalid date";
  }
};

export const buildCacheKey = (baseKey, params) => {
  const serializedParams = JSON.stringify(params);
  return `${baseKey}:${Buffer.from(serializedParams).toString("base64")}`;
};

/**
 * Compress data before storing in Redis
 * @param {Object} data - The data to compress
 * @returns {Buffer} Compressed data
 */
export function compressData(data) {
  return zlib.gzipSync(JSON.stringify(data));
}

/**
 * Decompress data retrieved from Redis
 * @param {Buffer} data - The compressed data
 * @returns {Object|null} Decompressed data
 */
export function decompress(data) {
  return data ? JSON.parse(zlib.gunzipSync(data)) : null;
}

export async function invalidateUserCache(pattern) {
  const keys = await redis.keys(pattern);

  if (keys.length > 0) {
    await redis.del(...keys);
    console.log("Invalidated cache keys:", keys);
  }
}
