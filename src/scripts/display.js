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
  listArea.dataset.id = taskList.ID;
  taskList.taskGroups.map((group, i) => {
    let taskGroupDisplay = generateTaskGroupDisplay(
      group,
      i,
      taskList.isTaskGroupFinished(i),
    );

    listArea.appendChild(taskGroupDisplay);
  });

  listArea.addEventListener("click", (e) => {
    if (!e.target.classList.contains("task-check")) {
      return;
    }

    const taskGroupDisplay = e.target.parentElement.parentElement;
    const taskListDisplay = taskGroupDisplay.parentElement;

    if (!taskListDisplay.dataset.id === taskList.id) {
      return;
    }

    let group = e.target.dataset.groupIndex;
    let task = e.target.dataset.index;

    taskList.toggleTaskCheck(group, task);

    const isGroupFinished = taskList.isTaskGroupFinished(group);
    const isListFinished = taskList.areTasksFinished(group);

    const groupTitleDisplay = taskGroupDisplay.querySelector("h2");
    const listTitleDisplay = taskListDisplay.querySelector("h1");
    const groupHasLineThrough =
      groupTitleDisplay.classList.contains("finished");
    const listHasLineThrough = listTitleDisplay.classList.contains("finished");

    if (isGroupFinished) {
      if (!groupHasLineThrough) {
        groupTitleDisplay.classList.add("finished");
      }

      if (!listHasLineThrough && isListFinished) {
        listTitleDisplay.classList.add("finished");
      }
    } else {
      if (groupHasLineThrough) {
        groupTitleDisplay.classList.remove("finished");
      }

      if (listHasLineThrough && !isListFinished) {
        listTitleDisplay.classList.remove("finished");
      }
    }
  });

  if (taskList.areTasksFinished()) {
    listArea.querySelector("h1").classList.add("finished");
  }

  contentArea.appendChild(newList);
}

function generateTaskGroupDisplay(
  taskGroup,
  groupIndex,
  isGroupFinished = false,
) {
  const newTaskGroup = document.createElement("div");
  const taskGroupTitle = document.createElement("h2");
  if (isGroupFinished) {
    taskGroupTitle.classList.add("finished");
  }

  newTaskGroup.classList.add("task-group");
  newTaskGroup.dataset.index = groupIndex;
  taskGroupTitle.textContent = taskGroup.title;
  newTaskGroup.appendChild(taskGroupTitle);

  taskGroup.tasks.map((task, i) => {
    newTaskGroup.appendChild(generateTaskDisplay(task, groupIndex, i));
  });

  return newTaskGroup;
}

function generateTaskDisplay(task, groupIndex, taskIndex) {
  const newTask = taskTemplate.content.cloneNode(true);

  const checkbox = newTask.querySelector("input");
  checkbox.checked = task.isFinished;
  checkbox.dataset.groupIndex = groupIndex;
  checkbox.dataset.index = taskIndex;

  newTask.querySelector("span").textContent = task.desc;

  return newTask;
}

function clearContent() {
  while (contentArea.lastChild) {
    contentArea.removeChild(contentArea.lastChild);
  }
}

export { generateTaskListDisplay, clearContent };
