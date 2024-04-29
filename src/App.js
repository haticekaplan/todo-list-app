import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import EditTodo from "./components/EditTodo";
import TodoItem from "./components/TodoItem";
import DeleteModal from "./components/DeleteModal";
import AddTodo from "./components/AddTodo";
import { DONE_STATUS, IN_PROGRESS_STATUS, TODO_STATUS } from "./Constants";

const App = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
  }
  const handleEditText = (editText) => {
    const updatedTodos = todos.map(item => {
      if (item.id == editId) {
        return { ...item, text: editText }
      }
      return item;
    });
    setTodos(updatedTodos);
    setEditId(null);
  }
  const handleEditCancel = () => {
    setEditId(null);
  }
  const handleAddTodoArray = () => {
    let todosArray = [...todos];
    let todoObject = {
      id: uuid(),
      text: newTodoText,
      status: TODO_STATUS
    }
    todosArray.push(todoObject);
    setTodos(todosArray);
    setNewTodoText("");
  }
  const handleChangeStatus = (id, nextStep) => {

    let currentTodo = todos.find(item => item.id == id);

    let newStatus = (currentTodo.status + (nextStep ? 1 : -1)) % 3;


    const updatedTodos = todos.map(item => {
      if (item.id == id) {
        return { ...item, status: newStatus }
      }
      return item;
    });
    setTodos(updatedTodos);
    setEditId(null);
  }

  return (
    <div className="flex flex-col h-screen w-screen mt-32 px-16">
      <div className="w-full flex flex-row">
        <div className="w-1/3">
          <h2 className="text-3xl font-bold mb-4 text-center">Todo</h2>
        </div>
        <div className="w-1/3">
          <h2 className="text-3xl font-bold mb-4 text-center">In Progress</h2>
        </div>
        <div className="w-1/3">
          <h2 className="text-3xl font-bold mb-4 text-center">Done</h2>
        </div>
      </div>
      <div className="w-full flex flex-row">
        {[TODO_STATUS, IN_PROGRESS_STATUS, DONE_STATUS].map((stat) =>
          <div className="w-1/3">
            <div className="border rounded-lg">
              {todos.filter(todo => todo.status === stat).map((item, index) => (
                <div key={item.id} className="flex items-center p-4 border-b">
                  {editId === item.id ? (
                    <EditTodo text={item.text} handleEditText={handleEditText} handleEditCancel={handleEditCancel} />
                  ) : (
                    <TodoItem
                      todoItem={item}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handleChangeStatus={handleChangeStatus}
                    />
                  )}
                </div>
              ))}
              {deleteId && (
                <DeleteModal handleDeleteTodo={handleDeleteTodo} handleDeleteCancel={handleDeleteCancel} />
              )}
            </div>
            {stat === TODO_STATUS &&
              <div className="mt-4 flex">
                <AddTodo newTodoText={newTodoText} setNewTodoText={setNewTodoText} handleAddTodoArray={handleAddTodoArray} />
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
