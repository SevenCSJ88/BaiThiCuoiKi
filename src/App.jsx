import React, { useState, useEffect } from "react";
import "./App.css";
import { IoMdTrash } from "react-icons/io";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (value) {
      setTodos([...todos, { text: value, completed: false }]);
      setValue("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <h1>#Todo</h1>
      <div className="buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <input
        type="text"
        placeholder="add details"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="add-btn" onClick={addTodo}>
        Add
      </button>

      <div>
        {todos.map((todo, index) => {
          if (
            filter === "all" ||
            (filter === "active" && !todo.completed) ||
            (filter === "completed" && todo.completed)
          ) {
            return (
              <div className="TodoList" key={index}>
                <div className="list-btn">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                  />
                  <span className={todo.completed ? "completed" : ""}>
                    {todo.text}
                  </span>
                </div>
                <button onClick={() => deleteTodo(index)}>
                  <IoMdTrash />
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div>
        <button className="delete-btn" onClick={deleteAll}>
          <IoMdTrash size={12} color="white" />
          Delete All
        </button>
      </div>
    </div>
  );
};

export default App;
