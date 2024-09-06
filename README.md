# REST API with Node.js and TypeScript

This project is a REST API built with Node.js and TypeScript. It provides user authentication features including signup, login, and user management.

## Features

- User signup and login
- Secure password storage with Argon2
- JWT-based authentication
- User management (CRUD operations)

## Technologies

- Node.js
- TypeScript
- Express.js
- Mongoose (MongoDB ODM)
- Argon2 (Password hashing)
- JWT (JSON Web Token)
- `ts-node` (TypeScript execution)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (You need a running MongoDB instance or use MongoDB Atlas)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sevenhealer/node-typescript-rest-api.git

2. **Navigate to the Project Directory**

    ```bash
   cd node-typescript-rest-api

3. **Install Dependencies**

    ```bash
   npm install

4. **Create a .env File**

    ```bash
    PORT=port_number
    MONGODB_URI=mongodb://localhost:27017/mydatabase
    JWT_SECRET=your_jwt_secret

5. **Start the Development Server**

    ```bash
    npm start

**API Endpoints**

```bash

POST /signup: Register a new user. Requires username, email, and password in the request body.
POST /login: Authenticate a user and get a JWT token. Requires email and password in the request body.
GET /users: Get a list of all users. Requires authentication.
DELETE /users/:id: Delete a user by ID. Requires authentication and the user ID as a URL parameter.
PATCH /users/:id: Update a user by ID. Requires authentication and the user ID as a URL parameter. You can update fields like username.