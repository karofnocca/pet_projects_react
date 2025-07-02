import { loadData } from "../../app.js";
import { showError } from "../../utils/helpers.js";
import { addTodo } from "../../API/index.js";

export async function addNewTodo(taskInput) {
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
