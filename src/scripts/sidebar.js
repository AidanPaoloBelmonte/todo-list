import { TaskList } from "./tasklist";
import {
  generateTaskListDisplay,
  clearContent,
  prepareNewListDialog,
} from "./display";

const sidebar = document.querySelector("#sidebar");

sidebar.querySelector("#new-list").addEventListener("click", (e) => {
  toggle();

  prepareNewListDialog();
});

function init() {
  const lists = Object.keys(localStorage).map(
    (list) => new TaskList(JSON.parse(localStorage.getItem(list))),
  );

  const categoryEntries = lists.reduce((entries, list) => {
    if (!entries[list.category]) {
      entries[list.category] = [list];
    } else {
      entries[list.category].push(list);
    }

    return entries;
  }, {});

  const categoriesDisplay = document.querySelector("#category-lists");
  Object.keys(categoryEntries).forEach((category) => {
    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("list-entry");

    let categoryHeader = document.createElement("button");
    categoryHeader.classList.add("category-header");

    if (!category) {
      categoryHeader.textContent = "No Category";
    } else {
      categoryHeader.textContent = category;
    }

    categoryHeader.addEventListener("click", () => {
      categoryHeader.nextElementSibling.classList.toggle("content-close");
    });

    let categoryContent = document.createElement("div");
    categoryContent.classList.add("category-content");

    categoryEntries[category].forEach((entry) => {
      let categoryEntry = document.createElement("button");
      categoryEntry.classList.add("category-entry");

      categoryEntry.textContent = entry.title;
      categoryEntry.dataset.id = entry.id;

      categoryContent.appendChild(categoryEntry);
    });

    categoryContent.addEventListener("click", (e) => {
      if (!e.target.classList.contains("category-entry")) {
        return;
      } else if ((!e.target.dataset.id) in localStorage) {
        return;
      }

      clearContent();
      generateTaskListDisplay(
        new TaskList(JSON.parse(localStorage[e.target.dataset.id])),
      );
    });

    categoryContainer.appendChild(categoryHeader);
    categoryContainer.appendChild(categoryContent);
    categoriesDisplay.appendChild(categoryContainer);
  });
}

function toggle() {
  sidebar.classList.toggle("sidebarOpen");
}

export { init, toggle };
