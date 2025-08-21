import { TaskList } from "./tasklist";

const sidebar = document.querySelector("#sidebar");

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

  console.log(categoryEntries);

  const categoriesDisplay = document.querySelector("#categories");
  Object.keys(categoryEntries).forEach((category) => {
    let categoryHeader = document.createElement("div");
    categoryHeader.classList.add("list-entry");

    if (!category) {
      categoryHeader.textContent = "No Category";
    } else {
      categoryHeader.textContent = category;
    }

    let categoryContent = document.createElement("div");
    categoryContent.classList.add("category-content");

    categoryEntries[category].forEach((entry) => {
      let categoryEntry = document.createElement("div");
      categoryEntry.classList.add("category-entry");

      categoryEntry.textContent = entry.title;
      categoryEntry.dataset.id = entry.id;

      categoryContent.appendChild(categoryEntry);
    });

    categoryHeader.appendChild(categoryContent);
    categoriesDisplay.appendChild(categoryHeader);
  });
}

function toggle() {
  sidebar.classList.toggle("sidebarOpen");
}

export { init, toggle };
