import { showError } from "../../utils/helpers.js";
import { deleteCompletedTodos } from "../../API/index.js";
import { deleteCompletedButton } from "../../app.js";
import { loadData, container } from "../../app.js";

export function initDeleteCompleted() {
  deleteCompletedButton.addEventListener("click", async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Вы уверены?",
      text: "Вы не сможете вернуть их обратно",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Да, удалить",
      cancelButtonText: "Отменить",
    });

    if (!isConfirmed) return;

    try {
      await deleteCompletedTodos(container);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError("Не удалось удалить список задач");
    }
  });
}
