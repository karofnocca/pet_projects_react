import { host } from "../host.js";

export async function deleteTodo(id) {
  try {
    const respons = await fetch(`${host}/${id}`, {
      method: "DELETE",
    });

    if (!respons.ok) {
      throw new Error(`Ошибка получения, статус: ${respons.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Ошибка удаления: ${error.message}`);
  }
}
