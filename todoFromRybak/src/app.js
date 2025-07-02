import { initDragAndDrop } from "./components/index.js";

import {
  getTodos,
  toggleTodoStatus,
  deleteTodo,
  updateTodo,
  addTodo,
  deleteCompletedTodos,
} from "./API/index.js";

import { showError, showLoader, hideLoader } from "./utils/helpers.js";

export const container = document.getElementById("posts-container");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const downloadButton = document.querySelector(".button-download");
const deleteCompletedButton = document.getElementById(
  "delete-completed-button"
);

async function loadData() {
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

    checkBox.addEventListener("change", async () => {
      try {
        await toggleTodoStatus(todo.id, checkBox.checked);
        await loadData();
      } catch (error) {
        console.error(error.message);
        showError("Не удалось изменить статус задачи");
      }
    });
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

    updateButton.addEventListener("click", async () => {
      const { value: newText } = await Swal.fire({
        title: "Редактирование задачи",
        input: "text",
        inputLabel: "Введите текст новой задачи",
        inputValue: todo.text,
        showCancelButton: true,
        confirmButtonText: "Сохранить",
        cancelButtonText: "Отмена",
        inputValidator: (value) => {
          if (!value) {
            return "Поле не может быть пустым";
          }
        },
      });

      if (newText) {
        try {
          await updateTodo(todo.id, newText);
          await loadData();
        } catch (error) {
          showError("Не удалось обновить задачу");
        }
      }
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
    });

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

async function addNewTodo() {
  const newTodoText = taskInput.value.trim();
  if (!newTodoText) {
    alert("Введите текст задачи");
    return;
  }
  const newTodo = {
    text: newTodoText,
    createdAt: Date.now(),
    completed: false,
  };

  try {
    await addTodo(newTodo);
    taskInput.value = "";
    await loadData();
  } catch (error) {
    console.error(`Ошибка добавления задачи: ${error.message}`);
    showError("Не удалось добавить задачу");
  }
}

deleteCompletedButton.addEventListener("click", async () => {
  const { isConfirmed } = await Swal.fire({
    title: "Вы уверены?",
    text: "Вы не сможете вернуть их обратно",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Да, удалить",
    cancelButtonText: "Отменить",
  });

  if (!isConfirmed) return;

  try {
    await deleteCompletedTodos(container);
    await loadData();
  } catch (error) {
    console.error(error.message);
    showError("Не удалось удалить список задач");
  }
});

addButton.addEventListener("click", addNewTodo);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
});
downloadButton.addEventListener("click", loadData);
