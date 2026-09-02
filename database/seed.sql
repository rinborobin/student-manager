USE student_manager;

INSERT INTO users (name, email, password_hash)
VALUES
    ('Robin', 'robin@example.com', 'temporary_password'),
    ('Alice', 'alice@example.com', 'temporary_password');

INSERT INTO status (name)
VALUES
    ('not_started'),
    ('in_progress'),
    ('completed');

INSERT INTO courses (user_id, title, code, description)
VALUES
    (1, 'Database Systems', 'CS-301', 'Database design and SQL'),
    (1, 'Web Development', 'CS-302', 'Frontend and backend development'),
    (1, 'Data Structures', 'CS-303', 'Algorithms and data structures'),
    (2, 'Database Systems', 'CS-301', 'Database design and SQL');

INSERT INTO tasks
    (course_id, status_id, title, description, due_date, priority)
VALUES
    (1, 1,
     'Database Normalization HW',
     'Complete normalization exercises',
     '2026-09-02',
     'high'),

    (2, 2,
     'Build Calculator',
     'Finish the JavaScript calculator',
     '2026-09-05',
     'medium'),

    (3, 3,
     'Hash Table Assignment',
     'Implement a hash table',
     '2026-09-07',
     'high'),

    (1, 1,
     'SQL Practice',
     'Complete JOIN exercises',
     '2026-09-10',
     'low');