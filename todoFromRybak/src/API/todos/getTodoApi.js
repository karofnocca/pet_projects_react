import { host } from "../host.js";

export async function getTodos() {
  try {
    const respons = await fetch(host);

    if (!respons.ok) {
      throw new Error(`Данные не получены, статус: ${respons.status}`);
    }
    const data = await respons.json();

    if (data.length === 0) {
      throw new Error("Задач нет");
    }
    data.sort((a, b) => a.order - b.order);
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Ошибка получения данных: `, error.message);
    throw error;
  }
}
