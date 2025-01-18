# Variables
DOCKER_COMPOSE = docker compose -f docker-compose.yml
CONTAINER_NAME = next-app
DB_CONTAINER = mysql
DB_USER ?= root
DB_PASS ?= 1234
DEV_USER = nishat
DEV_PRIVILEGES_CMD = "GRANT ALL PRIVILEGES ON *.* TO '$(DEV_USER)'@'%'; FLUSH PRIVILEGES;"
TIMESTAMP = $(shell date +%Y.%m.%d.%H.%M.%S)

# Targets
.PHONY: grant-all migrate push reset production grant-permissions super

# [[General]] Set permissions for Prisma files
super:
	sudo chmod -R 777 . && sudo chmod -R 777 ./prisma

# [[MySQL]] Grant full access to the development user
grant-all:
	$(DOCKER_COMPOSE) run --rm -e MYSQL_PWD=$(DB_PASS) $(DB_CONTAINER) \
	mysql -h mysql -u $(DB_USER) -e $(DEV_PRIVILEGES_CMD)

# [[Prisma]] Migrate with timestamp
migrate:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma migrate dev --name $(TIMESTAMP) --skip-seed --skip-generate

# [[Prisma]] Push schema to database
push:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma db push --accept-data-loss --skip-generate

# [[Prisma]] Local Generate Prisma client
local_generate:
	bunx prisma generate 

# [[Prisma]] Generate Prisma client
generate:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma generate 

# [[Prisma]] Reset database
reset:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma migrate reset --force --skip-seed

# [[Prisma]] Run Prisma seed
seed:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma db seed

# [[Prisma]] Migrate for production
production:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma migrate deploy

# [[Docker]] Start Application
build:
	$(DOCKER_COMPOSE) up

# [[Docker]] Build and start services
build:
	$(DOCKER_COMPOSE) up build

# [[Docker]] Start services in detached mode
detach:
	$(DOCKER_COMPOSE) up -d

# [[Docker]] Stop services
down:
	$(DOCKER_COMPOSE) down

# [[Docker]] Rebuild services
rebuild:
	$(DOCKER_COMPOSE) up --build

# [[Docker]] Install dependencies in the container
install:
	$(DOCKER_COMPOSE) exec $(CONTAINER_NAME) bun install

# [[Docker]] View container logs
logs:
	$(DOCKER_COMPOSE) logs -f $(CONTAINER_NAME)

# [[Docker]] Restart services
restart:
	$(DOCKER_COMPOSE) restart

# [[Docker]] Execute a shell in the container
exec:
	$(DOCKER_COMPOSE) exec $(CONTAINER_NAME) sh

# [[Docker]] Remove orphaned containers
remove-orphans:
	$(DOCKER_COMPOSE) down --remove-orphans

# [[Docker]] Remove all resources for current app
flush:
	@echo "Cleaning up the next-app container and its resources..."
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
	@docker system prune -f --volumes
	@echo "Cleanup completed for next-app."

# [[Docker]] Check container status
status:
	@docker ps | grep $(CONTAINER_NAME) || echo "Container $(CONTAINER_NAME) is not running."

# [[Docker]] Show container size
size:
	@docker ps --size | grep $(CONTAINER_NAME) || echo "Container is not running."

# [[Bun]] Build and deploy locally
deploy:
	bun run build && bun run start

# [[Prisma]] Generic command
prisma:
	$(DOCKER_COMPOSE) run --rm $(CONTAINER_NAME) bunx prisma $(CMD)
#use it like this
#make prisma CMD="migrate dev --name init"
