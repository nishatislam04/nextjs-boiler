## 🚀 Start Next.js Project from Scratch  

Head over to the Notion page below to learn how to set up a **Next.js application** from scratch using:  
- **Docker**  
- **Bun**  
- **MySQL**  
- **Prisma**  
- **phpMyAdmin**  

[👉 Notion Guide: Create a nextjs 15 project from scratch in Docker, MySQL, Prisma, Bun.](https://www.notion.so/Docker-MySQL-Prisma-BUN-17d13ca8b20480e48f6dea4469718097)  

---

### 🛠️ Follow These Steps After Cloning the Project  

After cloning the project, run the following commands in your terminal:

1. **Access the container shell (VSCODE)**  
```bash
docker exec -it next-app sh
```
*Replace 'next-app' with the name of your app.*

2. **Install dependencies (VSCODE)**
```bash
bun install
```

3. **Grant Right Permissions for Prisma/ (VSCODE)**
```bash
  make super
  make grant-all
```

4. **Run Prisma Migration (VSCODE)**
```bash
  make migrate
```

5. **Build Docker Images (Konsole)**
```bash
docker_build
```

6. **Start the Docker container (Konsole)**
```bash
docker_up
```

*To make Konsole terminal command working, make sure, All bash aliases are setup already*

### Run Prisma seed
I am still not sure, how to seed it properly. but follow it now.
10 users with 10 profiles & each user 5 posts.

1. seed prisma with dummy data (vscode)
```bash 
  make seed
```

If error shown in terminal, run prisma migrate in local
```bash
  bunx prisma generate
  or
  make local_generate
```

Access the application at http://localhost:3000
