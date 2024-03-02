import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

const App = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

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
  const handleDelete = (id) => {
    setDeleteId(id);
  }

  const handleDeleteTodo = () => {
    const todosArray = todos.filter((item) => item.id !== deleteId);
    setTodos(todosArray);
    setDeleteId(null);
  }
  const handleDeleteCancel = () => {
    setDeleteId(null);
  }
  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  }
  const handleEditText = () => {
    const updatedTodos = todos.map(item => {
      if (item.id == editId) {
        return { ...item, text: editText }
      }
      return item;
    });
    setTodos(updatedTodos);
    setEditId(null);
    setEditText("");
  }
  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
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
        {todos.map((item) => (
          <div key={item.id} className="flex items-center p-4 border-b">
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full h-full"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={handleEditText}>Save</button>
                <button className="bg-gray-300 text-black px-4 py-2 rounded ml-2" onClick={handleEditCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span className="flex-1 text-lg font-semibold">{item.text}</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/8 h-1/8" onClick={() => handleEdit(item.id, item.text)}>Edit</button>
                <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/8 h-1/8"
                  onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
        {deleteId && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Are you sure you want to delete this item?</p>
              <div className="mt-4 flex justify-end">
                <button className="mr-2 bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteTodo}>Yes</button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleDeleteCancel}>No</button>
              </div>
            </div>
          </div>
        )}
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
