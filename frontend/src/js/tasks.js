// tasks.js

export const tasks = [
  {
    id: 1,
    title: "Database Normalization HW",
    course: "CS-301",
    dueDate: "2026-09-02",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Web Development Project",
    course: "CS-302",
    dueDate: "2026-09-05",
    priority: "Medium",
    completed: false,
  },
];

export function addTask(task) {
  tasks.push(task);
}

export function removeTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

export function getTasks() {
  return tasks;
}
