import { TaskList, Priority } from "./tasklist";

const mainArea = document.querySelector("#main");
const quickActionBar = document.querySelector("#quick-action");
const newListDialog = document.querySelector("#new-list-dialog");
const editTextDialog = document.querySelector("#edit-text-dialog");
const newListForm = newListDialog.querySelector("form");
const editTextForm = editTextDialog.querySelector("form");

const contentArea = document.querySelector("#content");
const taskListTemplate = document.querySelector("#task-list-template");
const taskTemplate = document.querySelector("#task-template");

newListDialog.querySelector("button").addEventListener("click", (e) => {
  if (!newListForm.reportValidity()) {
    return;
  }

  const newListData = new FormData(newListForm);

  const newTaskList = new TaskList(
    newListData.get("new-list-title"),
    newListData.get("new-list-duedate"),
    newListData.get("new-list-priority"),
    newListData.get("new-list-category"),
  );

  newListForm.reset();

  newTaskList.save();
  clearContent();
  generateTaskListDisplay(newTaskList);

  e.preventDefault();

  newListDialog.close();
});

editTextDialog
  .querySelector("#edit-text-submit")
  .addEventListener("click", (e) => {
    if (!editTextForm.reportValidity()) {
      return;
    }

    const newTextData = new FormData(editTextForm);
    const listID = document.querySelector("#task-list").dataset.id;
    const taskList = new TaskList(JSON.parse(localStorage[listID]));

    // Edit Description
    if (editTextDialog.dataset.targetGroup === "undefined") {
      document.querySelector("#description > p").textContent =
        newTextData.get("new-text");

      taskList.desc = newTextData.get("new-text");
    } else {
      //  Edit Task Group Title
      let groupDisplay = document.querySelector(
        `.task-group[data-group-index="${editTextDialog.dataset.targetGroup}"]`,
      );

      if (!groupDisplay && !listID) {
        return;
      }

      if (editTextDialog.dataset.targetIndex === "undefined") {
        taskList.editGroup(
          editTextDialog.dataset.targetGroup,
          newTextData.get("new-text"),
          groupDisplay.dataset.groupIndex,
        );

        groupDisplay.querySelector("h2").textContent =
          newTextData.get("new-text");

        console.log(groupDisplay);
      } else {
        //  Edit Task Description
        const taskDisplay = groupDisplay.querySelector(
          `.task[data-index="${editTextDialog.dataset.targetIndex}"]`,
        );

        if (taskDisplay) {
          taskList.editTask(
            editTextDialog.dataset.targetGroup,
            editTextDialog.dataset.targetIndex,
            newTextData.get("new-text"),
          );

          taskDisplay.querySelector("span").textContent =
            newTextData.get("new-text");
        } else return;
      }
    }

    taskList.save();
    console.log(taskList);

    e.preventDefault();

    delete editTextDialog.dataset.targetGroup;
    delete editTextDialog.dataset.targetIndex;
    editTextForm.reset();

    editTextDialog.close();
  });

function generateTaskListDisplay(taskList) {
  if ((!taskList) instanceof TaskList) {
    return -1;
  }

  const newList = taskListTemplate.content.cloneNode(true);

  newList.querySelector("#title > h1").textContent = taskList.title;
  const priorityDisplay = newList.querySelector("#priority");
  priorityDisplay.textContent = taskList.priority;
  priorityDisplay.classList.add(taskList.priority.toLowerCase());

  newList.querySelector("#due-remain > span").textContent =
    taskList.getRemainingTime();

  newList.querySelector("#duedate").textContent = taskList
    .getFormattedDueDate()
    .replace(" at ", "\r\n");

  newList.querySelector("#description > p").textContent = taskList.desc;

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
    if (e.target.classList.contains("task-check")) {
      handleToggleTask(taskList, e);
    } else if (e.target.classList.contains("edit")) {
      handleTextEdit(e);
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

  const groupTitleArea = document.createElement("div");
  groupTitleArea.classList.add("context-container");

  const editButton = document.createElement("button");
  editButton.classList.add("edit");

  newTaskGroup.classList.add("task-group");
  newTaskGroup.dataset.groupIndex = groupIndex;
  taskGroupTitle.textContent = taskGroup.title;
  groupTitleArea.appendChild(taskGroupTitle);
  groupTitleArea.appendChild(editButton);
  newTaskGroup.appendChild(groupTitleArea);

  taskGroup.tasks.map((task, i) => {
    newTaskGroup.appendChild(generateTaskDisplay(task, groupIndex, i));
  });

  return newTaskGroup;
}

function generateTaskDisplay(task, groupIndex, taskIndex) {
  const newTask = taskTemplate.content.cloneNode(true);
  const taskContainer = newTask.querySelector("div");
  taskContainer.dataset.groupIndex = groupIndex;
  taskContainer.dataset.index = taskIndex;

  const checkbox = newTask.querySelector("input");
  checkbox.checked = task.isFinished;

  newTask.querySelector("span").textContent = task.desc;

  return newTask;
}

function handleToggleTask(taskList, e) {
  const taskGroupDisplay = e.target.parentElement.parentElement;
  const taskListDisplay = taskGroupDisplay.parentElement;

  if (!taskListDisplay.dataset.id === taskList.id) {
    return;
  }

  let group = e.target.parentElement.dataset.groupIndex;
  let task = e.target.parentElement.dataset.index;

  taskList.toggleTaskCheck(group, task);

  const isGroupFinished = taskList.isTaskGroupFinished(group);
  const isListFinished = taskList.areTasksFinished(group);

  const groupTitleDisplay = taskGroupDisplay.querySelector("h2");
  const listTitleDisplay = taskListDisplay.querySelector("h1");
  const groupHasLineThrough = groupTitleDisplay.classList.contains("finished");
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
}

function handleTextEdit(e) {
  let taskContainer = e.target.parentElement;

  if (
    !taskContainer.classList.contains("task") &&
    taskContainer.parentElement.classList.contains("task-group")
  ) {
    taskContainer = taskContainer.parentElement;
  }

  editTextDialog.dataset.targetGroup = taskContainer.dataset.groupIndex;
  editTextDialog.dataset.targetIndex = taskContainer.dataset.index;

  editTextDialog.showModal();
}

function clearContent() {
  while (contentArea.lastChild) {
    contentArea.removeChild(contentArea.lastChild);
  }
}

function prepareModal() {
  newListDialog
    .querySelector("input[type=date]")
    .setAttribute("min", new Date().toISOString().split("T")[0]);

  newListDialog.showModal();
}

export { generateTaskListDisplay, clearContent, prepareModal };
