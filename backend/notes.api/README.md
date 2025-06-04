# 🗒️ Notes API

A simple .NET Web API for managing notes. This project uses PostgreSQL and Docker for development and deployment.

---

## 🚀 Features

- Retrieve all notes
- Retrieve a single note by ID
- Create a new note
- Update an existing note
- Delete a note

---

## 🔧 How to Run the API

1. **Install Docker**

   Make sure Docker is installed and running:  
   👉 [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. **Clone the Repository**

   ```bash
   git clone https://github.com/gravelino/notes-app.git
   cd notes-app/backend

3. **Run the API via Docker Compose**

    ```bash
   docker-compose up --build

4. **Access the API**

   Open your browser or Postman and navigate to: http://localhost:8080

---

## 📦 API Endpoints

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/notes`      | Get all notes        |
| GET    | `/notes/{id}` | Get note by ID       |
| POST   | `/notes`      | Create a new note    |
| PUT    | `/notes/{id}` | Update existing note |
| DELETE | `/notes/{id}` | Delete note by ID    |

---

## ⚙️ Technologies Used

- .NET 9 Web API
- Entity Framework Core
- PostgreSQL
- Docker & Docker Compose

---