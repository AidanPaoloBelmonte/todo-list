import "../styles/style.css";

import { TaskList } from "./tasklist.js";
import sidebarHandler from "./sidebar.js";

const sidebarButton = document.querySelector("#toggleSidebar");

sidebarButton.addEventListener("click", sidebarHandler.toggle);
