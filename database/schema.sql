CREATE DATABASE IF NOT EXISTS student_manager;

USE student_manager;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    description TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

CREATE TABLE status (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE tasks (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    status_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20) NOT NULL,

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id),

    FOREIGN KEY (status_id)
        REFERENCES status(status_id)
);