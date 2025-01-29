export const PRISMA_ERROR_MESSAGES = {
	P2002: "Duplicate value. Please use a different one.", // Unique constraint failed
	P2025: "The requested record was not found.", // Record not found
	P2003: "Invalid reference. Please check related data.", // Foreign key constraint
	P2014: "Referential constraint violation.", // Nested delete/update issue
	P2016: "Invalid data provided.", // Query validation error
	P2011: "Required field cannot be null.", // Null constraint
	P2015: "Invalid relation reference.", // Record ID doesn't exist
	P2000: "Provided value is too long for the field.", // Data too long
	P2001: "No record found for the given criteria.", // Record not found
	P2018: "Invalid record reference.", // Record does not exist
	P2020: "Value out of range for the column.", // Integer value exceeded
	P2024: "Database timeout error. Try again later.", // Timeout
	P3006: "Database connection issue.", // DB connection error
	P4000: "Transaction failed due to a constraint error.", // Transaction error
};

/**
 * Returns a user-friendly error message based on Prisma error code.
 * Falls back to a generic message if the code is not in PRISMA_ERROR_MESSAGES.
 */
export function getPrismaErrorMessage(error) {
	return (
		PRISMA_ERROR_MESSAGES[error.code] ||
		"An unexpected database error occurred."
	);
}
