import chalk from "chalk";
import util from "util";

// Define log levels, colors & emojis
const LOG_LEVELS = {
	info: {
		color: chalk.blue,
		icon: "ℹ️",
		defaultMessage: "Information logged",
	},
	success: {
		color: chalk.green,
		icon: "✅",
		defaultMessage: "Operation successful",
	},
	warn: {
		color: chalk.yellow,
		icon: "⚠️",
		defaultMessage: "Warning issued",
	},
	error: {
		color: chalk.red,
		icon: "❌",
		defaultMessage: "An error occurred",
	},
	debug: {
		color: chalk.cyan,
		icon: "🐛",
		defaultMessage: "Debugging in progress",
	},
	trace: {
		color: chalk.magenta,
		icon: "🔍",
		defaultMessage: "Tracing execution",
	},
	important: {
		color: chalk.bgRed.white.bold,
		icon: "🚀",
		defaultMessage: "Important log",
	},
	critical: {
		color: chalk.bgRed.white.bold,
		icon: "🔥",
		defaultMessage: "Critical failure",
	},
};

/**
 * Custom Logger class with various logging levels.
 * Logs are colorized, timestamped, and formatted.
 */
class Logger {
	/**
	 * Returns current time in `hh:mm:ss` format (24-hour)
	 */
	static getTime() {
		const now = new Date();
		const hh = String(now.getHours()).padStart(2, "0");
		const mm = String(now.getMinutes()).padStart(2, "0");
		const ss = String(now.getSeconds()).padStart(2, "0");
		return chalk.gray(`[${hh}:${mm}:${ss}]`);
	}

	/**
	 * Logs message to the console.
	 * @param {string} level - Log level (info, success, warn, error, etc.)
	 * @param {any} data - Log data (message or object)
	 * @param {string} [message] - Optional custom message
	 */
	static log(level, data, message = null) {
		if (!LOG_LEVELS[level]) throw new Error(`Invalid log level: ${level}`);

		const { color, icon, defaultMessage } = LOG_LEVELS[level];

		// Format the message with bold yellow if provided, else use default
		const logMessage = message
			? chalk.yellow.bold(message)
			: color.bold(defaultMessage);

		// Format output
		console.log("\n" + Logger.getTime(), icon, logMessage);
		console.log(
			color(util.inspect(data, { depth: null, colors: true })) + "\n"
		);
	}

	// Different log levels as methods
	static info(data, message) {
		this.log("info", data, message);
	}
	static success(data, message) {
		this.log("success", data, message);
	}
	static warn(data, message) {
		this.log("warn", data, message);
	}
	static error(data, message) {
		this.log("error", data, message);
	}
	static debug(data, message) {
		this.log("debug", data, message);
	}
	static trace(data, message) {
		this.log("trace", data, message);
	}
	static important(data, message) {
		this.log("important", data, message);
	}
	static critical(data, message) {
		this.log("critical", data, message);
	}
}

export default Logger;
