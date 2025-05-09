# To-Do Pro

## 🚀 Introduction

To-Do is an advanced task management application that allows users to create, edit, complete, and delete tasks efficiently. Designed with a clean and modern interface, the application offers an intuitive user experience on both desktop and mobile devices.

## 🛠️ Technologies Used

* **Frontend:** React, Redux, Vite
* **Backend:** Node.js, Express, MongoDB
* **Authentication:** JWT (JSON Web Token)
* **Deployment:** Netlify (frontend), Render (backend)
* **Database:** MongoDB Atlas

## 📝 Key Features

* Create, read, update, and delete tasks (CRUD)
* Mark tasks as completed with a select circle
* Delete completed tasks with a single click
* Edit tasks directly from the list
* Secure authentication system using JWT
* Session persistence using Redux Persist
* Responsive interface with a dark theme for better visualization

## 🗂️ Project Structure

```
To-Do Pro
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middlewares
│   │   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── features
│   │   ├── pages
│   │   └── App.jsx
└── README.md
```

## ⚙️ Installation and Configuration

### Clone the Repository

```
git clone https://github.com/shm04/To__Do.git
cd To__Do
```

### Backend

```
cd backend
npm install
```

* Configure the `.env` file with the following variables:

```
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
PORT=5000
```

* Start the server:

```
npm start
```

### Frontend

```
cd frontend
npm install
```

* Configure the `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

* Start the client:

```
npm run dev
```

## 🌐 Deployment

### Backend (Render)

1. Create an account on Render.
2. Connect the GitHub repository.
3. Set up environment variables on Render.
4. Deploy the service.

### Frontend (Vercel)

1. Create an account on Vercel.
2. Connect the GitHub repository.
3. Set the environment variable `VITE_API_URL`.
4. Deploy the application.

## 🌟 API Endpoints

* **POST /api/users/register:** Register a new user.
* **POST /api/users/login:** User login.
* **GET /api/tasks:** Retrieve all tasks.
* **POST /api/tasks:** Create a new task.
* **PUT /api/tasks/\:id:** Update a task.
* **DELETE /api/tasks/\:id:** Delete a task.
* **DELETE /api/tasks/completed:** Delete completed tasks.

## 🔑 Authentication

* Users must log in to access the dashboard.
* The JWT token is stored in localStorage.
* Redux Persist is used to maintain the session.

## 💻 Useful Commands

* Start the backend server:

```
npm start
```

* Start the frontend client:

```
npm run dev
```

* Test API with Postman:

```
POST http://localhost:5000/api/users/login
```

## 🤝 Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue.

## 📄 License

This project is licensed under the MIT License.
