# 📌 Task Manager

A simple **Task Manager application** built with **React.js**, **Node.js (Express)**, and **MySQL**.  
This app allows users to register/login and then perform **CRUD operations on tasks** with fields:
- **Title**
- **Description**
- **Status**
- **Due Date**

---

## 🚀 Features
- **Authentication** – Login / Sign up  
- **User CRUD** – Create, Read, Update, Delete users  
- **Task CRUD** – Manage tasks with Title, Description, Status, Due Date  
- **Secure API** – JWT authentication  

---

## 🛠️ Tech Stack
- **Frontend:** React.js  
- **Backend:** Node.js (Express.js)  
- **Database:** MySQL  
- **Authentication:** JWT & bcrypt

## 🔐 Login Credentials

- **Admin: username=Admin, password=admin**
- **User: username=kkk, password=kkk**

## 🌟 Future Enhancements

- 🔍 **Task search** – Easily find tasks by title, status
- 📑 **Pagination** – Handle large task lists efficiently  

## 🧩 Components-Based Guide

This project is divided into **Frontend (React.js)** and **Backend (Node.js + Express + MySQL)**.  
Below is the breakdown of major components and their roles.

---

### 🎨 Frontend (React.js)

**Folder:** `frontend/src/components/`

- **Auth Components**
  - `Login.js` → Handles user login
  - `Create.js` → Allows new users to register  

- **User Components**
  - `UserList.js` → Displays list of all users  
  - `EditUser.js` → Edit existing user  
  - `Profile.js` → Show user details  

- **Task Components**
  - `TaskList.js` → Display all tasks (CRUD options)  
  - `CreateTask.js` → Form to add new task (Title, Description, Status, Due Date)  
  - `EditTask.js` → Edit existing task details  

- **App.js**
  - Main entry point for frontend routes using **React Router**  

---

### ⚙️ Backend (Node.js + Express)

**Folder:** `backend/`

- **server.js**  
  - Entry point, sets up Express server and middleware  

---

### 🗄️ Database (MySQL)

- **users table**  
  - `id`, `name`, `email`, `password`  

- **tasks table**  
  - `id`, `title`, `description`, `status`, `due_date`  

---

### 🔗 Flow of Components

1. **Login/Signup** → Auth components → Backend `authRoutes` → `users` table  
2. **Task Management** → Task components → Backend `taskRoutes` → `tasks` table  

---

## 📌 Example Workflow

- A new user registers in **Signup.js** → request sent to **Server.js** → user saved in `users` table.  
- User creates a task in **CreateTask.js** → request sent to **Server.js** with JWT → task saved in `tasks` table.  
- Tasks are listed in **TaskList.js** by fetching from backend.  
