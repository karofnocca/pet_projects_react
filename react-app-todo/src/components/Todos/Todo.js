import { FaMagnifyingGlassArrowRight } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

import styles from "./Todo.module.css";

function Todo({ todo, removeTodo, toggleTodo }) {
  return (
    <div
      className={`${styles.todo} ${
        todo.isCompleted ? styles.completedTodo : ""
      }`}
    >
      <FaMagnifyingGlassArrowRight className={styles.todoIcon} />
      <div className={styles.todoText}>{todo.text}</div>
      <MdOutlineDeleteForever
        className={styles.deleteIcon}
        onClick={() => removeTodo(todo.id)}
      />
      <FaCheck
        className={styles.checkIcon}
        onClick={() => toggleTodo(todo.id)}
      />
    </div>
  );
}

export default Todo;
