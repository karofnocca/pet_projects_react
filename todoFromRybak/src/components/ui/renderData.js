import { creatCheckbox } from "./createElements/creatCheckbox.js";
import { createText } from "./createElements/createText.js";
import { updateTask } from "../index.js";

import {
  changeStatus,
  initDragAndDrop,
  initDelete,
  downloadButton,
} from "../index.js";

export const container = document.getElementById("posts-container");
export const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);
export function renderData(todos) {
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  deleteCompletedButton.style.display = hasCompletedTodos ? "block" : "none";
  container.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id);

    const checkBox = creatCheckbox(todo);
    const textElement = createText(todo);

    const timeElement = document.createElement("p");
    timeElement.textContent = new Date(todo.createdAt).toLocaleString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button-function");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./assets/icons/icon-delete.png";
    deleteIcon.alt = "Удалить";

    deleteButton.title = "Удалить";
    deleteButton.append(deleteIcon);

    initDelete(todo, deleteButton);

    const updateButton = document.createElement("button");
    updateButton.classList.add("button-function");
    const updateIcon = document.createElement("img");
    updateIcon.src = "./assets/icons/icon-update.png";
    updateIcon.alt = "Изменить";

    updateButton.title = "Изменить";
    updateButton.append(updateIcon);

    updateButton.addEventListener("click", () => updateTask(todo));

    todoElement.append(
      checkBox,
      textElement,
      timeElement,
      deleteButton,
      updateButton
    );

    initDragAndDrop(todoElement, todo, container);
    container.append(todoElement);
    downloadButton.hidden = true;
  });
}
