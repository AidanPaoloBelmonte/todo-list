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

export { clearContent };
