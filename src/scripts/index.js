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
import { generateTaskListDisplay, clearContent } from "./display.js";
import sidebarHandler from "./sidebar.js";

const sidebarButton = document.querySelector("#toggleSidebar");

sidebarButton.addEventListener("click", sidebarHandler.toggle);

let taskList = new TaskList("Sample", new Date("August 11, 2026"), 1);
taskList.desc = "This is just a sample task!";

taskList.addTask(0, "Feed all of the Gatos!");
taskList.addTask(0, "Pet all of the Gatos!");

taskList.addGroup("task 2: Burning Igloo");
taskList.addTask(1, "Collect some snow");
taskList.addTask(1, "Build an Igloo");
taskList.addTask(1, "Burn the Igloo!");

let taskList2 = new TaskList("Experiment", new Date("January 11, 2029"));
taskList2.desc = "What an experimental to-do list!";

taskList2.addTask(0, "Experiment what Gatos like to eat!");
taskList2.addTask(0, "Get the happiness level a Gato may feel when being pet!");
taskList2.addTask(0, "Let the Gato sleep in a comfy bed!");

taskList2.addGroup("Part 2: Poiosn Waterloo");
taskList2.addTask(1, "Collect some water");
taskList2.addTask(1, "Concoct a poison");
taskList2.addTask(1, "Treat the poison");
taskList2.addTask(1, "Celebrate!");

taskList2.toggleTaskCheck(0, 0);

generateTaskListDisplay(taskList);
