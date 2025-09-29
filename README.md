# Fullstack React + NestJS App

A full-stack web application with **React + TypeScript** (Vite CLI) on the frontend and **NestJS + TypeScript** (Nest CLI) on the backend. The app includes **authentication**, **user management**, and a protected **profile page**.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  
- [API Documentation](#api-documentation)  
- [Environment Variables](#environment-variables)  
- [License](#license)  

---

## Features

- User **Sign Up** and **Sign In** with JWT authentication  
- Protected routes using JWT (`/profile`)  
- Frontend form validation (email, password strength)  
- Responsive UI with **Tailwind CSS**  
- API documentation generated with **Swagger**  

---

## Tech Stack

**Frontend:** React, TypeScript, Vite CLI, React Router, Axios, Tailwind CSS  
**Backend:** NestJS, TypeScript, MongoDB, Mongoose, JWT, Swagger  

---

## Setup

### Backend (NestJS CLI)

```bash
# Navigate to backend
cd nest-auth-app

# Install dependencies
npm install

# Create a .env file
echo "MONGODB_URI=mongodb://localhost:27017/your-db" >> .env
echo "JWT_SECRET=your_jwt_secret" >> .env
echo "PORT=3000" >> .env
echo "JWT_EXPIRES_IN=3600s" >> .env
echo "LOG_LEVEL=info" >> .env

# Run backend in development
npm run dev

# Swagger docs available at
# http://localhost:3000/api-docs

---

### Frontend

```bash
# Navigate to frontend
cd frontend-react-ts

# Install dependencies
npm install

# Create a .env file
echo "VITE_API_URL=http://localhost:3000" >> .env

# Run frontend
npm run dev

# Open browser at the URL shown in terminal (usually http://localhost:5173)

