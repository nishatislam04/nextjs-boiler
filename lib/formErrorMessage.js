/**
 * Maps Prisma error to specific form fields.
 * If the error is unknown, returns a general error message.
 *
 */
class FormErrorMessage {
	static errorCodes = [
		"P2002",
		"P2003",
		"P2011",
		"P2014",
		"P2016",
		"P2025",
		"P2000",
		"P2015",
		"P2020",
		"P2024",
		"P3006",
		"P4000",
	];

	static errorCodeExist(code) {
		return this.errorCodes.includes(code);
	}

	static generateMessage(error) {
		if (!error || !this.errorCodeExist(error.code)) {
			return { general: "Something went wrong. Please try again." };
		}

		switch (error.code) {
			case "P2002": {
				// Unique constraint violation (duplicate values)
				const duplicateFields = error.meta?.target || [];
				const fieldErrors = {};

				duplicateFields.forEach((field) => {
					fieldErrors[field] =
						`${field} is already taken. Please use a different one.`;
				});

				return fieldErrors;
			}

			case "P2003": {
				// Foreign key constraint violation
				const relatedField = error.meta?.field_name || "related field";
				return {
					[relatedField]: `Invalid reference. Please check the ${relatedField} field.`,
				};
			}

			case "P2011": {
				// Null constraint violation (required field missing)
				const missingField = error.meta?.target || "field";
				return {
					[missingField]: `${missingField} cannot be empty.`,
				};
			}

			case "P2014":
				return {
					general:
						"Referential constraint violation. Cannot delete or update due to dependencies.",
				};

			case "P2016":
				return {
					general: "Invalid data provided. Please check your input.",
				};

			case "P2025":
				return { general: "The requested record was not found." };

			case "P2000": {
				// Value too long for the field
				const field = error.meta?.target || "field";
				return {
					[field]: `The value for ${field} is too long. Please shorten it.`,
				};
			}

			case "P2015": {
				// Invalid relation reference
				const field = error.meta?.target || "field";
				return {
					[field]: `Invalid relation reference. ${field} does not exist.`,
				};
			}

			case "P2020": {
				// Value out of range
				const field = error.meta?.target || "field";
				return {
					[field]: `The value for ${field} is out of range. Please enter a valid number.`,
				};
			}

			case "P2024":
				return { general: "Database timeout error. Try again later." };

			case "P3006":
				return {
					general: "Database connection issue. Please try again later.",
				};

			case "P4000":
				return {
					general: "Transaction failed due to a constraint error.",
				};

			default:
				return { general: "An unexpected database error occurred." };
		}
	}
}

export default FormErrorMessage;
