# FinCommerce – E-Commerce & FinTech Platform

FinCommerce is a full-stack web application that combines e-commerce functionality with financial technology concepts. It provides product browsing, shopping cart management, order processing, user authentication, and administrative controls through a React-based frontend and a Spring Boot backend.

## Key Features

### Customer Features
- Browse and view product details.
- Add products to the shopping cart and manage quantities.
- Place orders and view order history.
- User registration and login.
- Track order status.

### Admin Features
- Manage products through CRUD operations.
- View and manage customer orders.
- Update order statuses.
- Access an administrative dashboard.

### Backend Features
- RESTful APIs using Spring Boot.
- Layered architecture: Controller, Service, and Repository.
- MySQL database integration using Spring Data JPA and Hibernate.
- JWT-based authentication and Spring Security.
- Request validation and exception handling.
- Order and product management APIs.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3, Bootstrap |
| Backend | Java, Spring Boot, Spring Security |
| Database | MySQL |
| ORM | Spring Data JPA, Hibernate |
| Authentication | JWT |
| API Testing | Postman |
| Build Tool | Maven |
| Version Control | Git, GitHub |
| Containerization | Docker |

## Project Structure

```text
FinCommerce/
│
├── backend/
│   └── FinCommerceBackend/
│       ├── src/
│       ├── pom.xml
│       └── Dockerfile
│
├── frontend/
│   └── frontend/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── index.html
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Java Development Kit (JDK)
- Maven
- Node.js and npm
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Prasad-Sant/FinCommerce.git
cd FinCommerce
```

### 2. Configure the Database

Create a MySQL database named:

```sql
CREATE DATABASE fincommerce;
```

Configure your database connection and required application environment variables in the backend configuration. Do not commit passwords, JWT secrets, or other credentials.

### 3. Run the Backend

Navigate to the backend project:

```bash
cd backend/FinCommerceBackend
```

Run the Spring Boot application using your IDE or Maven wrapper:

```bash
mvn spring-boot:run
```

The backend runs on:

`http://localhost:8081`

### 4. Run the Frontend

Open another terminal and navigate to:

```bash
cd frontend/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

`http://localhost:5173`

## API Overview

The backend exposes REST APIs for core application operations, including:

- Product management
- User registration and authentication
- Order creation and management

APIs can be tested using Postman.

## Future Enhancements

- Microservices-based architecture.
- Event-driven communication using Apache Kafka.
- Redis-based caching.
- Enhanced payment gateway integration.
- Docker-based deployment and container orchestration.

## Author

**Prasad Sant**

GitHub: [Prasad-Sant](https://github.com/Prasad-Sant)

---

*FinCommerce is a portfolio project developed to demonstrate full-stack application development using Java, Spring Boot, React, and MySQL.*