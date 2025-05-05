import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./App.css";
import TodoForm from "./components/Todos/TodoForm";
import TodoList from "./components/Todos/TodoList";
import TodoActions from "./components/Todos/TodoActions";

function App() {
  const [todos, setTodos] = useState([]);

  const removeTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo };
      })
    );
  };

  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoForm addTodo={addTodoHandler} />
      {todos.length > 0 && (
        <TodoActions
          completedTodosExist={!!completedCount}
          deleteTodos={deleteAllTodos}
          deleteCompleted={deleteCompletedTodos}
        />
      )}

      <TodoList
        todos={todos}
        removeTodo={removeTodoHandler}
        toggleTodo={toggleTodoHandler}
      />
      {completedCount > 0 && (
        <h2>{`You have completed ${completedCount} todos`}</h2>
      )}
    </div>
  );
}

export default App;
