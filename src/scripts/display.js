import { TaskList } from "./tasklist";

const mainArea = document.querySelector("#main");
const quickActionBar = document.querySelector("#quick-action");

// function switchContentContext(context) {
//   if (context === "project") {
//   } else {

//   }
// }

const contentArea = document.querySelector("#content");
const taskListTemplate = document.querySelector("#task-list-template");
const taskTemplate = document.querySelector("#task-template");

function generateTaskListDisplay(taskList) {
  if ((!taskList) instanceof TaskList) {
    console.log("Not a TaskList!");
    return -1;
  }

  const newList = taskListTemplate.content.cloneNode(true);

  newList.querySelector("#details > h1").textContent = taskList.title;

  newList.querySelector("#due-remain > span").textContent =
    taskList.getRemainingTime();

  newList.querySelector("#duedate").textContent =
    taskList.getFormattedDueDate();

  newList.querySelector("#overview > p").textContent = taskList.desc;

  const listArea = newList.querySelector("#task-list");
  taskList.taskGroups.map((group) => {
    listArea.appendChild(generateTaskGroupDisplay(group));
  });

  contentArea.appendChild(newList);
}

function generateTaskGroupDisplay(taskGroup) {
  const newTaskGroup = document.createElement("div");
  const taskGroupTitle = document.createElement("h2");

  newTaskGroup.classList.add("task-group");
  taskGroupTitle.textContent = taskGroup.title;
  newTaskGroup.appendChild(taskGroupTitle);

  taskGroup.tasks.map((task) => {
    newTaskGroup.appendChild(generateTaskDisplay(task));
  });

  return newTaskGroup;
}

function generateTaskDisplay(task) {
  const newTask = taskTemplate.content.cloneNode(true);

  newTask.querySelector("input").checked = task.isFinished;

  newTask.querySelector("span").textContent = task.desc;

  return newTask;
}

function clearContent() {
  while (contentArea.lastChild) {
    contentArea.removeChild(content.ArealastChild);
  }
}

export { generateTaskListDisplay, clearContent };
