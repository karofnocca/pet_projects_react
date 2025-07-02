import { host } from "../host.js";

export async function addTodo(newTodo) {
  try {
    const respons = await fetch(`${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!respons.ok) {
      throw new Error(`Не удалось добавить задачу, статус: ${respons.status}`);
    }
    console.log("Задача добавлена");
    return await respons.json();
  } catch (error) {
    console.error(`Ошибка добавления задачи: ${error.message}`);
    throw error;
  }
}
