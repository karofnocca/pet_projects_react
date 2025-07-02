import { loadData } from "../ui/loadData.js";
import { showError } from "../../utils/helpers.js";
import { toggleTodoStatus } from "../../API/index.js";

export function changeStatus(todo, checkBox) {
  checkBox.addEventListener("change", async () => {
    try {
      await toggleTodoStatus(todo.id, checkBox.checked);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError("Не удалось изменить статус задачи");
    }
  });
}
