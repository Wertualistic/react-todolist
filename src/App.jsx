import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [todos, setTodos] = useState(() => {
    const initialTodos = localStorage.getItem("todos");
    return initialTodos ? JSON.parse(initialTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, complete: false }]);
    setNewTodo("");
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    alert('Are you delete this?')
  };
  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="todolist">
      <h1 className="pb-3">ToDo List</h1>
      <div className="d-flex gap-5">
        <p>{date.toLocaleDateString()}</p>
        <p>{date.toLocaleTimeString()}</p>
      </div>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="form-control w-25"
          required
        />
        <button type="submit" className="btn btn-dark">
          +
        </button>
      </form>
      <ol>
        {todos.map((todo, index) => {
          return (
            <div className="d-flex align-items-center justify-content-start gap-5 pt-3 li">
              <li
                key={index}
                style={{
                  textDecoration: todo.complete ? "line-through" : "none",
                  color: todo.complete ? "green" : "#000",
                  fontSize: "30px",
                  width: "52%",
                }}
              >
                {todo.text}
              </li>
              <div className="btns d-flex gap-3">
                <button
                  onClick={() => handleComplete(index)}
                  className="btn btn-success"
                >
                  {todo.complete ? "Incomplete" : "Complete"}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
