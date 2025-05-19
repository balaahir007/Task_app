## Screenshots

![Preview](./frontend/assets/preview.png)
# Agent Management API

This project provides a RESTful API to manage agents and their assigned tasks in an admin panel. It includes features to create, read, update, and delete agents and tasks. Each agent is created by an admin, and each task is assigned to a specific agent.

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)

## 🔐 Authentication

- Admins must register and log in using JWT-based auth.
- Protected routes require a valid JWT token.

## ✨ Features

### Admin
- Register and login (with JWT)
- Create agents
- List all agents
- Get agent by ID
- Update agent
- Delete agent

### Agent Fields
- `name`: String
- `email`: String (unique)
- `mobile`: String (with country code)
- `password`: String (hashed)
- `createdBy`: ObjectId (reference to admin)

### Task Management
- Create tasks (assigned to agents)
- List all tasks
- Get task by ID
- Update task details
- Delete task

### Task Fields
- `title`: String (required)
- `description`: String
- `dueDate`: Date
- `status`: Pending | In Progress | Completed
- `assignedTo`: ObjectId (reference to Agent)
- `createdBy`: ObjectId (reference to Admin)

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register` — Admin registration
- `POST /api/auth/login` — Admin login
- `GET /api/auth/check-auth` — Check auth status (protected)
- `GET /api/auth/logout` — Logout admin (protected)

### Agents
- `POST /api/agent/create` — Create new agent (admin only)
- `GET /api/agent/getAllAgents` — Get list of agents (admin only)

### Tasks
- `POST /api/tasks/upload-tasks` — Upload tasks using a file (CSV/Excel supported)



