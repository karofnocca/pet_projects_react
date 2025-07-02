import { changeStatus } from "../../inits/changeStatus.js";

export function creatCheckbox(todo) {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = todo.completed;

  changeStatus(todo, checkBox);
  return checkBox;
}
