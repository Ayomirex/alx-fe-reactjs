import React, { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build Todo App", completed: false },
    { id: 3, text: "Master Testing", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo.trim(), completed: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        placeholder="Add a new todo"
        className="py-0.5 mr-2 focus:outline-hidden"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        onClick={addTodo}
        className="px-8 py-1 text-center bg-green-800 text-white"
      >
        Add
      </button>
      <ul className="flex flex-col gap-3 mt-8">
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className="flex gap-3"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling when deleting
                deleteTodo(todo.id);
              }}
              className="px-2 rounded py-1 bg-gray-950 text-center text-white"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
