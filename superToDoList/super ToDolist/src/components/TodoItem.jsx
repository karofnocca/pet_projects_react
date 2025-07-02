import { useState } from "react";

export const TodoItem = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="group flex items-center justify-start p-4 gap-3 bg-white dark:bg-page-dark rounded-lg h-12 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`p-1 rounded-full border-2 ${
            isCompleted
              ? "border-green-500 bg-green-500"
              : "border-gray-300 hover:border-gray-400"
          } transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${isCompleted ? "text-white" : "text-transparent"} cursor-pointer`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <span className={`text-base ${isCompleted ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer ml-auto"
      >
        Удалить задачу
      </button>
    </div>
  );
};

export default TodoItem;
