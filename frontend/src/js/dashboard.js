import { getTasks } from "./tasks.js";

function getProgress() {
  const completedTasks = [];

  getTasks().forEach((task) => {
    if (task.completed === true) {
      completedTasks.push(task);
    }
  });

  return completedTasks.length;
}

export function getStats() {
  const activeTasks = getTasks().length;

  return {
    activeTasks,
    averageProgress: (getProgress() / activeTasks) * 100,
    enrolledCourses: 4,
  };
}
