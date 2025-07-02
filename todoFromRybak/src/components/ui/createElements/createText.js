export function createText(todo) {
  const textElement = document.createElement("p");
  textElement.style.textDecoration = todo.completed ? "line-through" : "none";
  textElement.textContent = todo.text;
  return textElement;
}
