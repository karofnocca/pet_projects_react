import { host } from "../host.js";

export async function updateTaskOrderOnServer(taskId, order) {
  try {
    const respons = await fetch(`${host}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });

    if (!respons.ok) {
      throw new Error(
        `Не удалось обновить порядок задач, статус: ${respons.status}`
      );
    }
    return true;
  } catch (error) {
    console.error(`Ошибка обновления порядка задач: ${error.message}`);
    throw error;
  }
}
