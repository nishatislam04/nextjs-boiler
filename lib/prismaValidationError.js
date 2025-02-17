class PrismaFormError {
	static errorMessages = {
		P2001: "No record found for the given criteria.",
		P2018: "Invalid record reference.",
		P2021: "Table or column not found. Check database schema.",
		P2022: "Invalid column type. Check data format.",
		P2023: "Constraint validation failed. Invalid data input.",
		P2026: "Operation failed due to conflicting constraints.",
		P2027: "Multiple errors occurred. Please check data integrity.",
		P2028: "Transaction rolled back due to a conflict.",
		P2029: "Database query exceeded execution time limit.",
		P2030: "The database is in an invalid state for this operation.",
		P2031: "Foreign key constraint failed on a composite key.",
		P2033: "Too many database connections. Try again later.",
		P2034: "Deadlock detected. Please retry the operation.",
		P3000: "Invalid database engine configuration.",
		P3001: "Migration error. Ensure migrations are applied correctly.",
		P3002: "Migration rollback failed. Data integrity issue.",
		P3003: "Migration table is missing or corrupted.",
		P3004: "Environment variable for database connection is missing.",
		P3005: "Failed to apply database migrations.",
		P3010: "Database file is locked. Please close any open connections.",
		P3011: "Insufficient database permissions.",
		P3012: "Database schema mismatch. Run migrations to fix.",
		P3013: "Database disk is full. Free up space and try again.",
	};

	static errorCodeExist(code) {
		return Object.prototype.hasOwnProperty.call(this.errorMessages, code);
	}

	static generateMessage(error) {
		if (!error || !this.errorCodeExist(error.code)) {
			return { general: "Something went wrong. Please try again." };
		}

		const errorMessage = this.errorMessages[error.code];
		return { general: errorMessage };
	}
}

export default PrismaFormError;
