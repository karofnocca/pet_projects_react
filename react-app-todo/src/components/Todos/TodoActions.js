import { RiDeleteBin2Line, RiRefreshLine } from "react-icons/ri";

import Button from "../UI/Button";

function TodoActions({ deleteTodos, deleteCompleted, completedTodosExist }) {
  return (
    <>
      <Button title="Reset Todos" onClick={deleteTodos}>
        <RiRefreshLine />
      </Button>
      <Button
        title="Clear Completed Todos"
        onClick={deleteCompleted}
        disabled={!completedTodosExist}
      >
        <RiDeleteBin2Line />
      </Button>
    </>
  );
}

export default TodoActions;
