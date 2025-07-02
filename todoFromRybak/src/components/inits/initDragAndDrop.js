import { updateTaskOrder } from "../index.js";

export function initDragAndDrop(todoElement, todo, container) {
  todoElement.draggable = true;
  todoElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", todo.id);
    e.currentTarget.classList.add("dragging");
  });

  todoElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const overElement = e.currentTarget;

    if (overElement !== draggable) {
      const rect = overElement.getBoundingClientRect();
      const offset = e.clientY - rect.top;
      if (offset < rect.height / 2) {
        container.insertBefore(draggable, overElement);
      } else {
        container.insertBefore(draggable, overElement.nextSibling);
      }
    }
  });

  todoElement.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
    updateTaskOrder(container);
  });
}
