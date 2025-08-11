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
  taskList.taskGroups.map((group, i) => {
    listArea.appendChild(generateTaskGroupDisplay(group, i));
  });

  contentArea.appendChild(newList);
}

function generateTaskGroupDisplay(taskGroup, groupIndex) {
  const newTaskGroup = document.createElement("div");
  const taskGroupTitle = document.createElement("h2");

  newTaskGroup.classList.add("task-group");
  newTaskGroup.dataset.index = groupIndex;
  taskGroupTitle.textContent = taskGroup.title;
  newTaskGroup.appendChild(taskGroupTitle);

  taskGroup.tasks.map((task, i) => {
    newTaskGroup.appendChild(generateTaskDisplay(task, i, groupIndex));
  });

  return newTaskGroup;
}

function generateTaskDisplay(task, taskIndex, groupIndex) {
  const newTask = taskTemplate.content.cloneNode(true);

  const checkbox = newTask.querySelector("input");
  checkbox.checked = task.isFinished;
  checkbox.dataset.index = taskIndex;
  checkbox.dataset.groupIndex = groupIndex;

  newTask.querySelector("span").textContent = task.desc;

  return newTask;
}

function clearContent() {
  while (contentArea.lastChild) {
    contentArea.removeChild(content.ArealastChild);
  }
}

export { generateTaskListDisplay, clearContent };
