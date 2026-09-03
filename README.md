# Student Manager - UNAMED

A full-stack Student Task & Course Management System that helps students organize courses, track assignments, manage priorities and deadlines, and monitor task progress. It uses a JavaScript/Express REST API with MySQL for data management, bcrypt and JWT for authentication, and a frontend dashboard for interacting with the system.

## Features
- Course management — create, view, update, and delete courses.
- Task management — create, view, update, and delete tasks.
- Task filtering — filter tasks by status and priority.
- Task progress tracking — manage not started, in progress, and completed tasks.
- Deadlines and priorities — assign due dates and priority levels to tasks.
- User authentication — register and log in securely.
- Password security — passwords are hashed using bcrypt.
- JWT authentication — secure API requests using JSON Web Tokens.
- User authorization — users can only access their own courses and tasks.
- RESTful API — structured backend API for frontend integration.
- MySQL database — relational data storage with foreign-key relationships.

## 1. Installation
Currently working on backend...
```bash
git clone https://github.com/rinborobin/student-manager.git
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a .env file in the project root and configure:
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=student_manager

JWT_SECRET=YOUR_JWT_SECRET
REFRESH_TOKEN=YOUR_REFRESH_SECRET
```

Do not commit .env.

## 4. Set Up the Database

Make sure MySQL is installed and running.

Run:
```bash
database/schema.sql
```
Then:
```bash
database/seed.sql
```
This creates the student_manager database, tables, and initial test data.

## 5. Start the Backend
```bash
nodemon backend/server.js
```
The API should be available at:
```bash
http://localhost:3000z
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
