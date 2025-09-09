# Simple Nest Service

A small backend service built with **[NestJS](https://nestjs.com/)** and **[Prisma](https://www.prisma.io/)**.  
This project demonstrates a modular NestJS setup with Prisma for database access, validation with `class-validator` and full TypeScript support.
It provides a simple CRUD API for managing users in the database.

---

## Features

- **NestJS 11** – modular architecture for scalable backends  
- **Prisma ORM** – type-safe database access  
- **Validation** – using `class-validator` and `class-transformer`  
- **Throttling** – request rate-limiting with `@nestjs/throttler`   
- **Hot Reload** – via `start:dev` for development  

---

## Tech Stack

- [NestJS](https://nestjs.com/)  
- [Prisma](https://www.prisma.io/)  
- [TypeScript](https://www.typescriptlang.org/)  
---

## Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd nest-example
npm install
```

## Environment setup

Create a `.env` file in the root folder with your database connection string or use provided URLs below for testing purposes:

   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_AHitgP6j9VCp@ep-still-silence-abkv0gkv-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
   DATABASE_URL_UNPOOLED="postgresql://neondb_owner:npg_AHitgP6j9VCp@ep-still-silence-abkv0gkv.eu-west-2.aws.neon.tech/neondb?sslmode=require"
   ```

## Running the app
For development use the following command:
```bash
npm run start:dev
```
For production use the following commands:
```
npm run build
npm run start:prod
```

## API usage
Base URL:
```bash
http://localhost:3000
```

### Endpoints
#### 1. Get all employees.
Retrieve a list of all employees in the system.
#### Endpoint: `GET /employees`
#### URL:
```bash
http://localhost:3000/employees
```
#### Query parameters:
role (optional): Filter employees by role (ADMIN, ENGINEER or INTERN):
```bash
http://localhost:3000/employees?role=INTERN
```
#### Example requests:
```bash
#All employees
curl -X GET http://localhost:3000/employees

#Filter by role
curl -X GET http://localhost:3000/employees?role=INTERN
curl -X GET http://localhost:3000/employees?role=ENGINEER
curl -X GET http://localhost:3000/employees?role=ADMIN
```

#### Example response:
```bash
[
    {
        "id": 1,
        "name": "dave",
        "email": "some@email.com",
        "role": "ADMIN",
        "createdAt": "2025-04-21T13:09:53.194Z",
        "updatedAt": "2025-04-21T13:09:53.194Z"
    },
    {
        "id": 2,
        "name": "john",
        "email": "john@email.com",
        "role": "ENGINEER",
        "createdAt": "2025-09-09T13:22:46.306Z",
        "updatedAt": "2025-09-09T13:22:46.306Z"
    },
    ...
]
```
#### 2. Create employee
Add a new employee to the system.
#### Endpoint: `POST /employees`
#### URL:
```bash
http://localhost:3000/employees
```
#### Headers:
```bash
Content-Type: application/json
```
#### Request body:
```bash
{
  "name": "alice",
  "email": "alice@email.com",
  "role": "INTERN",
}
```

#### Example request:
```bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "alice",
    "email": "alice@email.com",
    "role": "INTERN",
  }'
```
#### Example response:
```bash
{
    "message": "Employee created successfully",
    "data": {
        "id": 2,
        "name": "alice",
        "email": "alice@email.com",
        "role": "INTERN",
        "createdAt": "2025-09-09T14:19:09.124Z",
        "updatedAt": "2025-09-09T14:19:09.124Z"
    },
    "success": true
}
```
#### Example error response
```bash
{
    "message": "Email already exists",
    "data": null,
    "success": false
}
```
#### Example validation error resonse:
```bash
{
  "message": [
    "name should not be empty",
    "email must be an email",
    "Valid role required"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```
#### 3. Get employee by ID
Retrieve a specific employee by their ID.
#### Endpoint: `GET /employees/:id`
#### URL:
```bash
http://localhost:3000/employees/{id}
```
#### Example request:
```bash
curl -X GET http://localhost:3000/employees/1
```
#### Example response:
```bash
{
    "id": 1,
    "name": "dave",
    "email": "some@email.com",
    "role": "ADMIN",
    "createdAt": "2025-04-21T13:09:53.194Z",
    "updatedAt": "2025-04-21T13:09:53.194Z"
}
```
### Example error response:
```bash
{
    "message": "Employee not found",
    "data": null,
    "success": false
}
```
#### 4. Update employee
Update an existing employee's information.
#### Endpoint: `PATCH /employees/:id`
#### URL:
```bash
http://localhost:3000/employees/{id}
```
#### Headers:
```bash
Content-Type: application/json
```
#### Request body: (Only include fields you want to update)
```bash
{
  "name": "kevin",
  "email": "kevin@email.com",
  "role": "ENGINEER",
}
```
#### Example request:
```bash
curl -X PATCH http://localhost:3000/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "kevin",
    email": "kevin@email.com",
    "role": "ENGINEER"
  }'
```
#### Example response:
```bash
{
    "message": "Employee updated successfully",
    "data": {
        "id": 3,
        "name": "kevin",
        "email": "kevin@email.com",
        "role": "ENGINEER",
        "createdAt": "2025-09-09T13:23:37.740Z",
        "updatedAt": "2025-09-09T14:23:21.067Z"
    },
    "success": true
}
```
#### Example error response:
```bash
{
    "message": "Employee not found or update failed",
    "data": null,
    "success": false
}
```

#### Example validation error resonse:
```bash
{
  "message": [
    "name should not be empty",
    "email must be an email",
    "Valid role required"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```
#### 5. Delete employee
Remove an employee from the system.
#### Endpoint: `DELETE /employees/:id`
#### URL:
```bash
http://localhost:3000/employees/{id}
```
#### Example request:
```bash
curl -X DELETE http://localhost:3000/employees/1
```
#### Example response:
```bash
{
    "message": "Employee deleted successfully",
    "success": true
}
```
#### Example error response
```bash
{
    "message": "Employee not found or deletion failed",
    "success": false
}
```
