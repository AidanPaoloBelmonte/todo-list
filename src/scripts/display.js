import { TaskList } from "./tasklist";

const contentArea = document.querySelector("#main");
const quickActionBar = document.querySelector("#quick-action");

function clearContent() {
  while (content.lastChild) {
    content.removeChild(content.lastChild);
  }
}

// function switchContentContext(context) {
//   if (context === "project") {
//   } else {

//   }
// }

function displayTaskList(taskList) {
  if (typeof taskList != TaskList) {
    return -1;
  }
}

export { clearContent };
