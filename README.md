## 🚀 Start Your Next.js Project from Scratch  

Head over to the Notion page below to learn how to set up a **Next.js application** from scratch using:  
- **Docker**  
- **Bun**  
- **MySQL**  
- **Prisma**  
- **phpMyAdmin**  

📌 **Note**: This guide is for starting a new project and not for initializing this cloned project.  

[👉 Notion Guide: Docker, MySQL, Prisma, Bun](https://www.notion.so/Docker-MySQL-Prisma-BUN-17d13ca8b20480e48f6dea4469718097)  

---

### 🛠️ Follow These Steps After Cloning the Project  

After cloning the project, run the following commands in your terminal:

1. **Access the container shell**  
```bash
docker exec -it next-app sh
```
Replace next-app with the name of your app.

2. **Install dependencies**
```bash
bun install
```
3. **Build Docker Images**
```bash
docker_build
```
4. **Start the Docker container**
```bash
docker_up
```

Access the application at http://localhost:3000
