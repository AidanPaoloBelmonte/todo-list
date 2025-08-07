const sidebar = document.querySelector("#sidebar");

function init() {
  return 1;
}

function toggle() {
  sidebar.classList.toggle("sidebarOpen");
}

export default {
  init,
  toggle,
};
