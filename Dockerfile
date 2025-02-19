# Use the official Bun base image
FROM oven/bun:alpine

# Set the working directory inside the container
WORKDIR /app

# Set environment variables for production
ENV BUN_AUTO_UPDATE 0
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Install dependencies
COPY package.json ./
COPY bun.lockb ./

RUN bun install

# Copy the rest of your project files into the container
COPY . .

# Generate Prisma client (make sure prisma is set up correctly)
RUN bunx prisma generate

# Build the Next.js app for production
RUN bun run next build

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Command to run the app in production mode
CMD ["bun", "next", "start"]
