import "../styles/style.css";

import sidebarHandler from "./sidebar.js";

const sidebarButton = document.querySelector("#toggleSidebar");

sidebarButton.addEventListener("click", sidebarHandler.toggle);
