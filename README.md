# RESTful API Blog Platform

A full-stack blog platform built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication. Users can register, log in, create posts, edit their own posts, delete their own posts, view all posts, search posts, and add comments.

## Features

- User registration and login
- JWT-based protected routes
- Create, read, update, and delete blog posts
- Search posts by title
- Add and view comments on posts
- Dashboard for managing the logged-in user's posts
- React frontend with Vite and Tailwind CSS
- Express REST API with MongoDB and Mongoose

## Tech Stack

**Frontend**

- React
- Vite
- React Router
- Axios
- Tailwind CSS

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
Blog_API/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
    package.json
  frontend/
    src/
      api/
      components/
      context/
      pages/
      App.jsx
      main.jsx
    index.html
    vite.config.js
    package.json
  README.md
```

## Prerequisites

Make sure you have these installed:

- Node.js
- npm
- MongoDB

MongoDB should be running locally before starting the backend.

## Backend Setup

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://localhost:27017/blog_db
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

Open another terminal in the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Endpoints

### Auth

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in a user | No |
| GET | `/api/auth/profile` | Get logged-in user profile | Yes |

### Posts

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts?search=query` | Search posts by title | No |
| GET | `/api/posts/:id` | Get one post | No |
| POST | `/api/posts` | Create a post | Yes |
| PUT | `/api/posts/:id` | Update own post | Yes |
| DELETE | `/api/posts/:id` | Delete own post | Yes |

### Comments

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/api/comments/:postId` | Get comments for a post | No |
| POST | `/api/comments/:postId` | Add a comment | Yes |
| DELETE | `/api/comments/delete/:id` | Delete own comment | Yes |

## Authentication

Protected API requests require a Bearer token:

```http
Authorization: Bearer your_token_here
```

After login, the frontend stores the token in `localStorage` and sends it automatically with Axios.

## Useful Commands

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run lint
```

## Common Issues

If `http://localhost:5173` shows a 404, make sure the frontend has `frontend/index.html` and that the Vite dev server is running from the `frontend` folder.

If backend requests fail, check that:

- MongoDB is running
- `backend/.env` exists
- `MONGO_URI` is correct
- Backend is running on port `5000`
- Frontend API base URL points to `http://localhost:5000/api`

## License

This project is for learning and internship practice.
