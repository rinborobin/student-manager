import { getCourses } from "./courses.js";
import { getStats } from "./dashboard.js";
import { addTask, getTasks } from "./tasks.js";
import { renderCourses, renderStats, renderTasks } from "./ui.js";

console.log(getTasks());
renderTasks(getTasks());

renderStats(getStats());
renderCourses(getCourses());
