import {
  initDragAndDrop,
  initDeleteCompleted,
  initAddTodo,
  updateTask,
  initDownload,
  downloadButton,
  changeStatus,
} from "./components/index.js";

import { getTodos, deleteTodo } from "./API/index.js";

import { showError, showLoader, hideLoader } from "./utils/helpers.js";

export const container = document.getElementById("posts-container");

export const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);

export async function loadData() {
  try {
    showLoader();

    const todos = await getTodos();
    renderData(todos);
  } catch (error) {
    if (error.message === "Задач нет") {
      showError("Задач нет");
    } else {
      showError("Не удалось получить данные");
    }
    console.error(`Ошибка: ${error.message}`);
  } finally {
    hideLoader();
  }
}

function renderData(todos) {
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  deleteCompletedButton.style.display = hasCompletedTodos ? "block" : "none";
  container.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.setAttribute("data-id", todo.id);

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;

    changeStatus(todo, checkBox);

    const textElement = document.createElement("p");
    textElement.style.textDecoration = todo.completed ? "line-through" : "none";

    textElement.textContent = todo.text;

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

    deleteButton.addEventListener("click", async () => {
      try {
        await deleteTodo(todo.id);
        await loadData();
      } catch (error) {
        console.error(error.message);
        showError("Не удалось удалить задачу");
      }
    });

    const updateButton = document.createElement("button");
    updateButton.classList.add("button-function");
    const updateIcon = document.createElement("img");
    updateIcon.src = "./assets/icons/icon-update.png";
    updateIcon.alt = "Изменить";

    updateButton.title = "Изменить";
    updateButton.append(updateIcon);

    updateButton.addEventListener("click", () => updateTask(todo));
    // const newText = prompt("Введите новый текст задачи", todo.text);
    // if (newText) {
    //   try {
    //     await updateTodo(todo.id, newText);
    //     await loadData();
    //   } catch (error) {
    //     console.error(error.message);
    //     showError("Не удалось изменить текст задачи");
    //   }
    // }

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

initAddTodo();
initDeleteCompleted();
initDownload();
