# SIM/eSIM Lifecycle Manager

A full-stack web application for managing SIM and eSIM cards and their assignment to customers. 

## About

SIM/eSIM Lifecycle Manager is designed to demonstrate core full-stack development concepts, including authentication, authorization, RESTful API communication, and CRUD operations. The application allows authenticated users to manage SIM cards and customers through a clean and user-friendly interface.

## Features

- **Authentication & Authorization** - Secure login with JWT (JSON Web Tokens)
- **CRUD Operations** - Full Create, Read, Update, Delete functionality for SIM cards and customers
- **Route Protection** - Angular route guards to restrict access to authenticated users only
- **HTTP Interceptors** - Automatic JWT token attachment and centralized error handling
- **Form Validation** - Input validation using Angular Reactive Forms
- **Parent-Child Communication** - Demonstrates `@Input()` and `@Output()` between components
- **User-Friendly Error Handling** - API errors are displayed directly in the UI, not in the console
- **RESTful API** - Well-structured backend built with Spring Boot
- **Database Migrations** - Schema versioning with Flyway
- **Containerized Database** - PostgreSQL setup via Docker Compose

## Tech Stack

### Frontend
- [Angular 18](https://angular.io/) - Standalone components
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

### Backend
- [Spring Boot 3](https://spring.io/projects/spring-boot)
- [Java 21](https://openjdk.org/projects/jdk/21/)
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [JWT (JJWT)](https://github.com/jwtk/jjwt)
- [Hibernate Validator](https://hibernate.org/validator/)

### Database & Tools
- [PostgreSQL 16](https://www.postgresql.org/)
- [Flyway](https://flywaydb.org/)
- [Docker](https://www.docker.com/)
- [Maven](https://maven.apache.org/)

## Project Structure

```text
sim-esim-lifecycle-manager/
├── backend/        # Spring Boot REST API
├── frontend/       # Angular 18 SPA
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [Angular CLI](https://angular.io/cli) >= 18.x
- [JDK 21](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sim-esim-lifecycle-manager.git
   cd sim-esim-lifecycle-manager
   ```

2. **Start PostgreSQL**
   ```bash
   docker compose up -d
   ```

3. **Start the Backend**
   - Open the `backend/` folder in IntelliJ IDEA and run `SimEsimApplication.java`
   - Or use Maven: `cd backend && mvn spring-boot:run`
   - Backend runs on `http://localhost:8080`

4. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npx ng serve
   ```
   - Frontend runs on `http://localhost:4200`

### Default Login Credentials

| Username | Password |
|----------|----------|
| admin    | admin123 |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/auth/login` | Authenticate user and return JWT token | No |
| GET    | `/api/sims` | Get all SIM cards | Yes |
| POST   | `/api/sims` | Create a new SIM card | Yes |
| PUT    | `/api/sims/{id}` | Update a SIM card | Yes |
| DELETE | `/api/sims/{id}` | Delete a SIM card | Yes |
| GET    | `/api/customers` | Get all customers | Yes |
| POST   | `/api/customers` | Create a new customer | Yes |
| PUT    | `/api/customers/{id}` | Update a customer | Yes |
| DELETE | `/api/customers/{id}` | Delete a customer | Yes |

## License

This project was created for educational purposes as part of a school assignment.
