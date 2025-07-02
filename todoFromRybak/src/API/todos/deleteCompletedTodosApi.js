import { host } from "../host.js";

export async function deleteCompletedTodos(container) {
  try {
    const completedTodos = [...container.querySelectorAll(".todo")].filter(
      (todoElement) => {
        const checkBox = todoElement.querySelector("input[type='checkbox']");
        return checkBox.checked;
      }
    );

    for (const todoElement of completedTodos) {
      const taskId = todoElement.getAttribute("data-id");

      const deleteResponse = await fetch(`${host}/${taskId}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error(
          `Не удалось удалить списко выполненных задач, статус: ${deleteResponse.status}`
        );
      }
    }
    return true;
  } catch (error) {
    console.error("Ошибка удаления выполненных задач: ", error.message);
    throw error;
  }
}
