# Todo Application

A full-stack Todo application built with Spring Boot and React that enables users to manage their tasks efficiently with features like task prioritization, status tracking, and due date management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### User Management

- User registration and authentication
- Secure login system
- User profile management
- Email-based user identification

### Task Management

- Create, read, update, and delete tasks
- Task attributes:
    - Title and Description
    - Priority levels (High, Medium, Low)
    - Status tracking (Open, In Progress, Closed)
    - Due date with formatted date display
- Filter tasks by status
- Sort tasks by various criteria
- User-specific task views
- Close/Complete tasks

### User Interface

- Modern and responsive design with Ant Design
- Interactive modals for task creation and editing
- Task card view for better visualization
- Intuitive task management interface
- React Router for seamless navigation

## 🛠️ Tech Stack

### Backend

- **Java 17**
- **Spring Boot 3.3.0**
    - Spring Boot Starter Web
    - Spring Boot Starter Data JPA
    - Spring Boot Starter Test
- **PostgreSQL** - Relational database
- **Maven** - Dependency management and build tool

### Frontend

- **React 18.3.1**
- **React Router DOM 6.23.1** - Client-side routing
- **Ant Design (antd) 5.17.4** - UI component library
- **Day.js 1.11.11** - Date manipulation
- **React Icons 5.2.1** - Icon library
- **React Scripts 5.0.1** - Build tooling

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **Java Development Kit (JDK) 17 or higher**
- **Apache Maven 3.6+**
- **Node.js 14+ and npm**
- **PostgreSQL 12+**
- **Git** (for cloning the repository)

## 📁 Project Structure

```
Todo-Application/
├── todo/                           # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/inamul/todo/
│   │   │   │       ├── controller/
│   │   │   │       │   ├── TaskController.java
│   │   │   │       │   └── UserController.java
│   │   │   │       ├── model/
│   │   │   │       │   ├── Task.java
│   │   │   │       │   └── User.java
│   │   │   │       ├── repository/
│   │   │   │       │   ├── TaskRepository.java
│   │   │   │       │   └── UserRepository.java
│   │   │   │       ├── service/
│   │   │   │       │   ├── TaskService.java
│   │   │   │       │   └── UserService.java
│   │   │   │       └── TodoBackendAppApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
└── todo-frontend/                  # Frontend (React)
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── components/
    │   │   ├── EditTaskModal.js
    │   │   ├── NewTaskModal.js
    │   │   ├── SelectWithLabel.js
    │   │   ├── TaskCard.js
    │   │   ├── TaskCardModal.js
    │   │   └── TaskView.js
    │   ├── modules/
    │   │   ├── Home.js
    │   │   └── Login.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Todo-Application
```

### 2. Database Configuration

#### Create PostgreSQL Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE todoapp;

-- Create user (if needed)
CREATE USER your_username WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE todoapp TO your_username;
```

#### Configure Database Connection

Edit `todo/src/main/resources/application.properties`:

```properties
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:postgresql://localhost:5432/todoapp
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
```

**Note:** Replace `your_username` and `your_password` with your actual PostgreSQL credentials.

### 3. Backend Setup

```bash
# Navigate to backend directory
cd todo

# Clean and build the project
./mvnw clean install

# Or on Windows
mvnw.cmd clean install
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd todo-frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
# From the todo directory
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Start Frontend Development Server

```bash
# From the todo-frontend directory
npm start
```

The frontend application will open automatically at `http://localhost:3000`

## 📡 API Documentation

### User Endpoints

| Method | Endpoint                     | Description     | Request Body |
| ------ | ---------------------------- | --------------- | ------------ |
| GET    | `/user/get-all-users`        | Get all users   | -            |
| GET    | `/user/{userId}`             | Get user by ID  | -            |
| POST   | `/user/insert-user`          | Create new user | User object  |
| PUT    | `/user/update-user/{userId}` | Update user     | User object  |
| DELETE | `/user/delete-user/{userId}` | Delete user     | -            |
| POST   | `/user/login`                | User login      | Credentials  |

#### User Object Structure

```json
{
	"userId": 1,
	"email": "user@example.com",
	"name": "John Doe",
	"password": "password123"
}
```

### Task Endpoints

| Method | Endpoint                                | Description                      | Request Parameters       |
| ------ | --------------------------------------- | -------------------------------- | ------------------------ |
| GET    | `/task/get-all-tasks`                   | Get all tasks                    | -                        |
| GET    | `/task/get-tasks-with-user-id/{userId}` | Get user tasks filtered & sorted | `sortType`, `filterType` |
| GET    | `/task/get-task/{taskId}`               | Get task by ID                   | -                        |
| POST   | `/task/insert-task`                     | Create new task                  | Task object, `userId`    |
| PUT    | `/task/update-task/{taskId}`            | Update task                      | Task object              |
| PUT    | `/task/close-task/{taskId}`             | Close/Complete task              | -                        |
| DELETE | `/task/delete-task/{taskId}`            | Delete task                      | -                        |

#### Task Object Structure

```json
{
	"taskId": 1,
	"title": "Complete project documentation",
	"description": "Write comprehensive README file",
	"priority": "high",
	"status": "open",
	"dueDate": "25/12/2026",
	"user": {
		"userId": 1
	}
}
```

#### Task Attributes

- **Priority:** `high`, `medium`, `low`
- **Status:** `open`, `in-progress`, `closed`
- **Due Date Format:** `DD/MM/YYYY`

### CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` by default. To modify this, update the `@CrossOrigin` annotation in the controller classes.

## 🧪 Testing

### Backend Tests

```bash
cd todo
./mvnw test
```

### Frontend Tests

```bash
cd todo-frontend
npm test
```

## 🔒 Security Considerations

**Important:** This application is designed for development and learning purposes. Before deploying to production, consider implementing:

- Password encryption (BCrypt, Argon2)
- JWT-based authentication
- Input validation and sanitization
- SQL injection prevention (already handled by JPA)
- HTTPS/TLS encryption
- Rate limiting
- CORS policy refinement
- Environment-based configuration
- Secure session management

## 🎨 Frontend Features

- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Component-Based Architecture:** Reusable React components
- **Modal Interactions:** Create and edit tasks through modal dialogs
- **Visual Feedback:** Loading states and error handling
- **Routing:** Separate pages for login and home/dashboard

## 📝 Development Notes

- The backend uses JPA with Hibernate for ORM
- Database schema is auto-updated based on entity changes
- PostgreSQL is used for persistent storage
- The frontend uses functional React components with hooks
- Ant Design provides a consistent UI/UX
- Date formatting is handled using Day.js library

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mohammad Inamul Hassan**

## 📞 Support

For support, email or open an issue in the repository.

---

**Happy Task Managing! 📝✅**
