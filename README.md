# 🗂️ Task Management Web App

A fullstack task management application with **Spring Boot (Backend)** and **React (Frontend)**.  
Manage tasks, assign them automatically, and collaborate efficiently — all in one platform.

---

## ⚙️ Project Overview

This web app allows users to:
- Register and log in securely (JWT-based authentication)
- Create, edit, and delete tasks
- View tasks by status (*To Do*, *In Progress*, *Done*)
- Automatically assign tasks to available users
- Work with a responsive and real-time interface

---

## 🧩 Backend — Spring Boot

### 🔹 Description
Spring Boot backend providing REST APIs, authentication, and database integration using PostgreSQL.

### 🚀 Features
- **User Authentication:** Register and login with JWT tokens  
- **Task Management:** Create, update, delete, and view tasks  
- **Auto Assignment:** Automatically assigns tasks to available users  
- **REST API:** Clean, structured endpoints for frontend integration  
- **Database Integration:** Uses PostgreSQL with JPA and Hibernate  
- **Global Error Handling:** Centralized exception management  
- **Testing:** Controller and authentication unit tests with JUnit  

### 🛠 Technologies Used
- Java 17+  
- Spring Boot  
- Spring Security + JWT  
- Spring Data JPA  
- PostgreSQL  
- Maven  
- JUnit 5  

### ⚙️ Setup and Run

#### Requirements
- Java 17 or higher  
- Maven  
- PostgreSQL installed and running  

#### Database Configuration
Edit your `src/main/resources/application.properties` file:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5434
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update💻


Frontend — React
🔹 Description
A modern React web application featuring a dynamic task board, real-time updates, and full integration with the backend API.
🚀 Features
Login & Register: Secure authentication with JWT
Task Board: Visual Kanban-style layout (To Do / In Progress / Done)
Drag & Drop: Move tasks between columns easily
Task Actions: Create, edit, and delete tasks instantly
Live Sync: Board auto-refreshes with latest updates
Share Link: Generate a public link to share an individual task
Offline Indicator: Alerts when the user loses connection
🛠 Technologies Used
React
Tailwind CSS
Axios
@dnd-kit (for drag & drop)
⚙️ Setup and Run
Requirements
Node.js (version 14 or newer)
npm (or yarn)
The backend server running (Spring Boot backend)
Installation
Go to the frontend folder and install dependencies:
npm install
Run the App
Start the development server:
npm start
This will open the app at 👉 http://localhost:3000
🧱 Folder Structure
project/
├── backend/
│   ├── src/
│   └── pom.xml
├── frontend/
│   ├── src/
│   └── package.json
└── README.md

