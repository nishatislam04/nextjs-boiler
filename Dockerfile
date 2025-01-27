FROM oven/bun:alpine

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

# RUN bun install
RUN bun install 

COPY . .

RUN bunx prisma generate

# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# for deploying the build version

# RUN bun next build
# and
# CMD bun next start

# CMD bun run dev
# CMD bun --bun run dev
CMD bun run dev
