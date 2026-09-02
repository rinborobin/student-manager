# Student Manager API Documentation

Frontend team reference for the Student Task & Course Management System.

## Base URL

```text
http://localhost:3000
```

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get one course |
| POST | `/api/courses` | Create a course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Response Format

### Success

```json
{
  "success": true,
  "data": {}
}
```

For multiple records, `data` is an array. For a single record, `data` is an object.

### Error

```json
{
  "success": false,
  "error": "Resource not found."
}
```

## HTTP Status Codes

| Code | Meaning |
|---:|---|
| `200` | Successful request |
| `201` | Resource created |
| `404` | Resource not found |
| `500` | Internal server error |

---

# Courses API

## GET `/api/courses`

Returns all courses.

Example:

```js
const response = await fetch("http://localhost:3000/api/courses");
const result = await response.json();
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "course_id": 1,
      "user_id": 1,
      "title": "Database Systems",
      "code": "CS-301",
      "description": "Database design and SQL"
    }
  ]
}
```

## GET `/api/courses/:id`

Returns one course.

Example:

```http
GET /api/courses/1
```

Response:

```json
{
  "success": true,
  "data": {
    "course_id": 1,
    "user_id": 1,
    "title": "Database Systems",
    "code": "CS-301",
    "description": "Database design and SQL"
  }
}
```

If the course does not exist:

```text
404 Not Found
```

```json
{
  "success": false,
  "error": "Course not found."
}
```

## POST `/api/courses`

Creates a course.

Request:

```json
{
  "userId": 1,
  "title": "Operating Systems",
  "code": "CS-304",
  "description": "Introduction to operating systems"
}
```

Success:

```text
201 Created
```

```json
{
  "success": true,
  "data": {
    "courseId": 5,
    "message": "Course created successfully."
  }
}
```

`courseId` is generated automatically by MySQL.

## PUT `/api/courses/:id`

Updates an existing course.

Example:

```http
PUT /api/courses/5
Content-Type: application/json
```

Request body:

```json
{
  "title": "Operating Systems",
  "code": "CS-304",
  "description": "Advanced operating systems"
}
```

Success:

```json
{
  "success": true,
  "data": {
    "message": "Course updated successfully."
  }
}
```

If the course does not exist, the API returns `404`.

## DELETE `/api/courses/:id`

Deletes a course.

Example:

```http
DELETE /api/courses/5
```

Success:

```json
{
  "success": true,
  "data": {
    "message": "Course deleted successfully."
  }
}
```

If the course does not exist, the API returns `404`.

A course that still has tasks may not be deletable because `tasks.course_id` references `courses.course_id`.

---

# Tasks API

## GET `/api/tasks`

Returns all tasks, including related course and status information.

Example response:

```json
{
  "success": true,
  "data": [
    {
      "task_id": 1,
      "course_id": 1,
      "status_id": 1,
      "title": "Database Normalization HW",
      "description": "Complete normalization exercises",
      "due_date": "2026-09-02",
      "priority": "high",
      "course_title": "Database Systems",
      "status": "not_started"
    }
  ]
}
```

## GET `/api/tasks/:id`

Returns one task.

Example:

```http
GET /api/tasks/1
```

Response:

```json
{
  "success": true,
  "data": {
    "task_id": 1,
    "course_id": 1,
    "status_id": 1,
    "title": "Database Normalization HW",
    "description": "Complete normalization exercises",
    "due_date": "2026-09-02",
    "priority": "high"
  }
}
```

If the task does not exist, the API returns `404`.

## POST `/api/tasks`

Creates a task.

Request:

```json
{
  "courseId": 1,
  "statusId": 1,
  "title": "SQL Practice",
  "description": "Complete JOIN exercises",
  "dueDate": "2026-09-10",
  "priority": "low"
}
```

Fields:

| Field | Type | Required |
|---|---|---|
| `courseId` | Integer | Yes |
| `statusId` | Integer | Yes |
| `title` | String | Yes |
| `description` | String | No |
| `dueDate` | `YYYY-MM-DD` | No |
| `priority` | String | Yes |

Priority values:

```text
low
medium
high
```

Status IDs:

```text
1 = not_started
2 = in_progress
3 = completed
```

`taskId` is generated automatically by MySQL.

## PUT `/api/tasks/:id`

Updates an existing task.

Example:

```http
PUT /api/tasks/1
Content-Type: application/json
```

Request body:

```json
{
  "title": "SQL Practice",
  "description": "Complete all JOIN exercises",
  "dueDate": "2026-09-11",
  "priority": "high",
  "statusId": 2
}
```

Success:

```json
{
  "success": true,
  "data": {
    "message": "Task updated successfully."
  }
}
```

## DELETE `/api/tasks/:id`

Deletes a task.

Example:

```http
DELETE /api/tasks/1
```

Success:

```json
{
  "success": true,
  "data": {
    "message": "Task deleted successfully."
  }
}
```

---

# Task Filtering

The task list supports query parameters.

## Filter by status

```http
GET /api/tasks?status=completed
```

Available values:

```text
not_started
in_progress
completed
```

## Filter by priority

```http
GET /api/tasks?priority=high
```

Available values:

```text
low
medium
high
```

## Multiple filters

```http
GET /api/tasks?status=completed&priority=high
```

This applies both conditions:

```text
status = completed
AND
priority = high
```

---

# Data Relationships

Tasks reference courses using `courseId`.

Tasks reference statuses using `statusId`.

```text
USERS
  │
  │ 1:M
  ↓
COURSES
  │
  │ 1:M
  ↓
TASKS
  │
  │ M:1
  ↓
STATUS
```

When creating a task, use IDs:

```json
{
  "courseId": 1,
  "statusId": 2
}
```

Do not use course names as foreign-key relationships:

```json
{
  "course": "Database Systems"
}
```

---

# Frontend Integration

The frontend communicates with the backend using `fetch()`.

Example GET:

```js
const response = await fetch(
  "http://localhost:3000/api/courses"
);

const result = await response.json();

if (!response.ok) {
  throw new Error(result.error);
}

const courses = result.data;
```

Example POST:

```js
const response = await fetch(
  "http://localhost:3000/api/courses",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(courseData)
  }
);

const result = await response.json();

if (!response.ok) {
  throw new Error(result.error);
}
```

The frontend should not access MySQL directly.

Communication flow:

```text
Frontend
   ↓
fetch()
   ↓
Express REST API
   ↓
MySQL
   ↓
Express REST API
   ↓
JSON response
   ↓
Frontend
```

The frontend should handle:

- Loading states
- Empty states
- Successful responses
- API errors
- Network errors
- Form validation
- Updating the UI after successful CRUD operations

---

# Current API Scope

Implemented:

```text
Courses
├── GET all
├── GET by ID
├── POST
├── PUT
└── DELETE

Tasks
├── GET all
├── GET by ID
├── POST
├── PUT
├── DELETE
└── Filtering by status and priority
```

Planned:

```text
Authentication
Authorization
User API
Notifications API
Dashboard-specific API
Progress-specific API
Calendar-specific API
```

These planned features are not currently available and should not be called by the frontend until implemented.
