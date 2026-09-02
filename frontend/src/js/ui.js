// import
export function renderTasks(tasks) {
  const taskList = document.querySelector("#task-list");

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "flex w-full gap-2";

    li.innerHTML = `
              <input type="checkbox" />

              <div class="task-des flex flex-1 ${task.completed ? "line-through text-gray-400" : ""} items-center justify-between">
                <div class=" flex flex-col">
                  <span>${task.title}</span>
                  <span>${task.course} - Due ${task.dueDate}</span>
                </div>

                <span >${task.priority}</span>
              </div>
        `;

    const checkbox = li.querySelector("input");
    const title = li.querySelector(".task-des");

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;

      title.classList.toggle("line-through", task.completed);
      title.classList.toggle("text-gray-400", task.completed);
    });

    taskList.appendChild(li);
  });
}

export function renderStats(stats) {
  const statsContainer = document.querySelector("#stats");

  statsContainer.innerHTML = `
            <span>Active Tasks</span>
            <span>${stats.activeTasks}</span>

            <span>Avg Progress</span>
            <span>${stats.averageProgress}%</span>

            <span>Enrolled Courses</span>
            <span>${stats.enrolledCourses}</span>
    `;
}

export function renderCourses(courses) {
  const courseList = document.getElementById("course-list");

  courseList.innerHTML = "";

  courses.forEach((course) => {
    const li = document.createElement("li");

    li.className = "flex justify-between";

    li.innerHTML = `<span>${course.title}</span>
                    <span>${course.taskCount}%</span>`;

    courseList.appendChild(li);
  });
}

export function darkMode() {
  const darkButton = document.querySelector("#dark-light");
}
