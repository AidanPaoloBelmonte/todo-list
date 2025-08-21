import { TaskList } from "./tasklist";
import {
  generateTaskListDisplay,
  clearContent,
  prepareNewListDialog,
} from "./display";

const sidebar = document.querySelector("#sidebar");
const categoriesDisplay = sidebar.querySelector("#category-lists");

categoriesDisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-header")) {
    e.target.nextElementSibling.classList.toggle("content-close");
  } else if (e.target.classList.contains("category-entry")) {
    if ((!e.target.dataset.id) in localStorage) return;

    clearContent();
    generateTaskListDisplay(
      new TaskList(JSON.parse(localStorage[e.target.dataset.id])),
    );
  }
});

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

  Object.keys(categoryEntries).forEach((category) => {
    let categoryContainer = createCategoryContainer(category);
    let categoryContent = categoryContainer.querySelector(".category-content");

    categoryEntries[category].forEach((entry) => {
      let categoryEntry = document.createElement("button");
      categoryEntry.classList.add("category-entry");

      categoryEntry.textContent = entry.title;
      categoryEntry.dataset.id = entry.id;

      categoryContent.appendChild(categoryEntry);
    });

    categoriesDisplay.appendChild(categoryContainer);
  });
}

function createCategoryContainer(categoryName) {
  let categoryContainer = document.createElement("div");
  categoryContainer.classList.add("list-entry");

  let categoryHeader = document.createElement("button");
  categoryHeader.classList.add("category-header");

  if (!categoryName) {
    categoryHeader.textContent = "No Category";
  } else {
    categoryHeader.textContent = categoryName;
  }

  let categoryContent = document.createElement("div");
  categoryContent.classList.add("category-content");

  categoryContainer.appendChild(categoryHeader);
  categoryContainer.appendChild(categoryContent);

  return categoryContainer;
}

function insertNewCategoryEntry(categoryName, listTitle, listID) {
  let categoryEntry = document.createElement("button");
  categoryEntry.classList.add("category-entry");

  categoryEntry.textContent = listTitle;
  categoryEntry.dataset.id = listID;

  const categoryTarget = !categoryName ? "No Category" : categoryName;

  const categoryDisplays = document.querySelectorAll(".category-header");
  for (let l = 0; l < categoryDisplays.length; l++) {
    if (categoryDisplays[l].textContent == categoryTarget) {
      categoryDisplays[l].nextElementSibling.appendChild(categoryEntry);

      return;
    }
  }

  const newCategoryContainer = createCategoryContainer(categoryName);
  newCategoryContainer
    .querySelector(".category-content")
    .appendChild(categoryEntry);

  categoriesDisplay.appendChild(newCategoryContainer);
}

function toggle() {
  sidebar.classList.toggle("sidebarOpen");
}

export { init, toggle, insertNewCategoryEntry };
