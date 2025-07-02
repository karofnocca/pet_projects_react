import { addNewTodo } from "../index.js";

export function initAddTodo() {
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-button");

  addButton.addEventListener("click", () => addNewTodo(taskInput));
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addNewTodo(taskInput);
    }
  });
}
