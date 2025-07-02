import { updateTaskOrderOnServer } from "../../API/index.js";
import { showError, showLoader, hideLoader } from "../../utils/helpers.js";

export async function updateTaskOrder(container) {
  const todos = Array.from(container.querySelectorAll(".todo"));

  const updatedOrder = todos.map((todo, index) => {
    return {
      id: todo.getAttribute("data-id"),
      order: index + 1,
    };
  });
  try {
    showLoader();
    for (const task of updatedOrder) {
      await updateTaskOrderOnServer(task.id, task.order);
    }

    return true;
  } catch (error) {
    console.error(error.message);
    showError("Не удалось переместить задачу");
  } finally {
    hideLoader();
  }
}
