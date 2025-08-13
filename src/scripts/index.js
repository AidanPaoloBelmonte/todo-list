if (module.hot) {
  module.hot.accept("./index.js", function () {
    console.log("Module updated!");
  });

  module.hot.accept("./display.js", function () {
    console.log("Module updated!");
  });
}

import "../styles/style.css";

import { TaskList } from "./tasklist.js";
import { generateTaskListDisplay } from "./display.js";
import sidebarHandler from "./sidebar.js";

const sidebarButton = document.querySelector("#toggleSidebar");

sidebarButton.addEventListener("click", sidebarHandler.toggle);

let taskList = new TaskList("Sample", new Date("August 11, 2026"));
taskList.desc = "This is just a sample task!";

taskList.addTask(0, "Feed all of the Gatos!");
taskList.addTask(0, "Pet all of the Gatos!");

taskList.addGroup("task 2: Burning Igloo");
taskList.addTask(1, "Collect some snow");
taskList.addTask(1, "Build an Igloo");
taskList.addTask(1, "Burn the Igloo!");

console.log(taskList);

generateTaskListDisplay(taskList);
