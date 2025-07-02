import { host } from "../host.js";

export async function updateTodo(id, newText) {
  try {
    const respons = await fetch(`${host}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });

    if (!respons.ok) {
      throw new Error(`Не удалось обновить задачу, статус: ${respons.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Ошибка обновления текста задачи: ${error.message}`);
    throw error;
  }
}
