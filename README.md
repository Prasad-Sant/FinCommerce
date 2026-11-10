# FinCommerce – E-Commerce & FinTech Platform

FinCommerce is a full-stack e-commerce application that combines online shopping functionality with financial technology concepts. It provides product browsing, shopping cart management, order processing, JWT-based authentication, and administrative controls.

The application is built using React, Spring Boot, Spring Security, and MySQL, with Docker support for backend containerization.

## Key Features

### Customer Features

- User registration and login.
- Browse products and view product details.
- Add products to the shopping cart and manage quantities.
- Complete the checkout and order placement flow.
- View personal order history.
- Track order status.

### Admin Features

- Access protected administrative routes.
- Create, view, update, and delete products.
- View customer orders.
- Update order statuses.
- Access the administrative dashboard.

### Backend Features

- RESTful APIs using Spring Boot.
- Layered architecture: Controller, Service, and Repository.
- MySQL integration using Spring Data JPA and Hibernate.
- JWT-based authentication.
- Role-based authorization using Spring Security.
- Request validation and exception handling.

## Technology Stack

| Layer            | Technologies                                 |
| ---------------- | -------------------------------------------- |
| Frontend         | React.js, JavaScript, HTML5, CSS3, Bootstrap |
| Backend          | Java, Spring Boot                            |
| Security         | Spring Security, JWT                         |
| Database         | MySQL                                        |
| ORM              | Spring Data JPA, Hibernate                   |
| API Testing      | Postman                                      |
| Build Tool       | Maven                                        |
| Containerization | Docker                                       |
| Version Control  | Git, GitHub                                  |

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

- Java JDK 25
- Node.js and npm
- MySQL Server
- Git
- Docker Desktop (optional, for containerized backend execution)

### 1. Clone the Repository

```bash
git clone https://github.com/Prasad-Sant/FinCommerce.git
cd FinCommerce
```

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE fincommerce;
```

Configure the following environment variables for the backend:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `FINCOMMERCE_JWT_SECRET`

For local backend execution, the database URL should point to your local MySQL server, for example:

```text
jdbc:mysql://localhost:3306/fincommerce
```

Use your own database credentials and a securely generated JWT secret. Never commit credentials or secrets to GitHub.

### 3. Run the Backend

Navigate to the backend directory:

```powershell
cd backend/FinCommerceBackend
```

Run the application using the Maven wrapper:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

```text
http://localhost:8081
```

### 4. Run the Frontend

Open another terminal and navigate to:

```powershell
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

The frontend runs at:

```text
http://localhost:5173
```

### 5. Docker Support

The backend can also be built as a Docker image.

Navigate to the backend directory:

```powershell
cd backend/FinCommerceBackend
```

Build the image:

```powershell
docker build -t fincommerce-backend:latest .
```

For container execution, configure the required environment variables and use a database URL accessible from the container. When MySQL runs on the Windows host, the database URL can use:

```text
jdbc:mysql://host.docker.internal:3306/fincommerce
```

Example container command (after configuring the environment variables in PowerShell):

```powershell
docker run -d `
  --name fincommerce-api `
  -p 8081:8081 `
  -e FINCOMMERCE_JWT_SECRET `
  -e DB_URL `
  -e DB_USERNAME `
  -e DB_PASSWORD `
  fincommerce-backend:latest
```

## API Overview

The backend provides REST endpoints for:

| Resource       | Operations                                                 |
| -------------- | ---------------------------------------------------------- |
| Authentication | User registration and login                                |
| Products       | Retrieve products and perform admin CRUD operations        |
| Orders         | Create orders, retrieve customer orders, and manage orders |
| Order Status   | Update order status with admin authorization               |

Authentication endpoints:

```text
POST /api/auth/register
POST /api/auth/login
```

Product endpoints use:

```text
/api/products
```

Order endpoints include:

```text
/api/orders
/api/orders/my-orders
/api/orders/{id}
```

Protected endpoints require an appropriate JWT bearer token and role permissions.

APIs can be tested using Postman.

## Future Enhancements

- Microservices-based architecture.
- Event-driven communication using Apache Kafka.
- Redis-based caching.
- Integration with a real payment gateway.
- Automated CI/CD pipelines.
- Cloud deployment and application monitoring.

## Author

**Prasad Sant**

GitHub: https://github.com/Prasad-Sant

---

_FinCommerce is a portfolio project demonstrating full-stack application development, REST API design, authentication, authorization, database integration, and containerization using Java, Spring Boot, React, MySQL, and Docker._
