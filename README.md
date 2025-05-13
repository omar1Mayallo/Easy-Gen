# Easy Generator – Full Stack Technical Task

This repository contains a **full-stack authentication system** built as part of a technical task for Easy Generator.

## ⚙ Tech Stack

### Frontend

- **React + Vite (TypeScript + SWC)**
- **TailwindCSS** – for utility-first styling
- **React Hook Form + Zod** – for form handling and validation
- **TanStack React Query** – for efficient data fetching and request lifecycle easy handling
- **React Icons** – for iconography

### Backend

- **NestJS**
- **MongoDB + Mongoose**
- **Class Validator** – As validation layer
- **Swagger** – for auto-generated API documentation
- **Winston** – for structured logging

---

## ✨ Features

- **Role-Based Authentication System**

  - Built with NestJS guards (`AuthGuard` and `RestrictTo`)
  - Role-based access to protected endpoints

- **Authentication Module**

  - Register and Login functionalities
  - Name, Email, Password validation rules (length, characters, complexity)

- **Error Handling**

  - Build a custom Global Exception Filter
  - Build a custom Validation Pipe
  - Handle Error With Error Codes (to make the frontend full control of what message need to preview)

- **API Documentation**

  - Swagger integrated at `/api/docs` for easy endpoint testing and exploration

- **Backend Logging**

  - Request and error logs written to file using Winston

- **Frontend Pages**

  - **Home Page** (Public)
  - **Login Page** (Public \_\_ until user logged in)
  - **Register Page** (Public \_\_ until user logged in)
  - **User Profile Page** (Protected)
  - **404 Page**

- **Form Validation and Feedback**

  - Zod schemas ensure strict validation
  - Real-time feedback for validation errors
  - Query lifecycle handling (loading, error, success)

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB instance (local or cloud)

### Installation

Clone the repo:

```bash
git clone https://github.com/omar1Mayallo/Easy-Gen.git
cd Easy-Gen
```

Install dependencies for both frontend and backend:

### Run Backend

```bash
cd backend
npm install
npm run dev
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

To run the application, you'll need to set the required environment variables in a `.env` file. Refer to the `.env.example` files in both the frontend and backend directories for the necessary variables.

### Frontend Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
VITE_SERVER_URL=http://localhost:5000/api
```

### Backend env

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=development
APP_PORT=5000
API_PREFIX=/api
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
DB_CONNECTION_STRING=mongodb://localhost:27017/easy-gen
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_DATE=1d
```

---

## 🎥 Demo

Check out the live demo here: [Easy Generator Task](https://example.com)

---

## 📬 Submission

This project meets all the requirements described in the task, with additional bonus features for logging, security best practices, and API documentation. The repo is ready to be reviewed.

Feel free to explore the code, test the features, and reach out if you have any questions!
