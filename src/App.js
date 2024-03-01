import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

const App = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChangeTodoText = (e) => {
    setNewTodoText(e.target.value);
  }
  const handleDeleteTodo = (id) => {
    const todosArray = todos.filter((item) => item.id !== id);
    setTodos(todosArray);
  }
  const handleAddTodoArray = () => {
    let todosArray = [...todos];
    let todoObject = {
      id: uuid(),
      text: newTodoText,
    }
    todosArray.push(todoObject);
    setTodos(todosArray);
    setNewTodoText("");
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-1/3">
        <h2 className="text-3xl font-bold mb-4 text-center">My Todo List</h2>
        {todos.map((item, index) => (
          <div className="flex items-center p-4 border-b">
            <span className="flex-1 text-lg font-semibold">{item.text}</span>
            <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
          </div>
        ))}
        <div className="mt-4 flex">
          <div className="w-3/4">
            <input
              type="text"
              className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full h-full"
              placeholder="Todo Description"
              value={newTodoText}
              onChange={handleChangeTodoText}
            />
          </div>
          <div className="w-1/4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full h-full"
              type="submit"
              onClick={handleAddTodoArray}
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
