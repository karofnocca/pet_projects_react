import { host } from "../host.js";

export async function toggleTodoStatus(id, completed) {
  try {
    const respons = await fetch(`${host}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (!respons.ok) {
      throw new Error(
        `Не удалось обновить статус задачи, статус: ${respons.status}`
      );
    }
    return true;
  } catch (error) {
    console.error(`Ошибка обновления статуса задачи: ${error.message}`);
    throw error;
  }
}
