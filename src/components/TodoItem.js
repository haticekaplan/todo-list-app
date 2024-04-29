import { DONE_STATUS, TODO_STATUS } from "../Constants";

const TodoItem = ({ todoItem, handleDelete, handleEdit, handleChangeStatus }) => {
  return (
    <div className="flex items-center w-screen">
      <span className="flex-1 text-lg font-semibold">{todoItem.text}</span>
      <button
        disabled={todoItem.status === TODO_STATUS}
        className="bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded w-1/8 h-1/8"
        onClick={() => handleChangeStatus(todoItem.id, false)}>{"<<"}</button>
      <button
        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/8 h-1/8"
        onClick={() =>handleEdit(todoItem.id, todoItem.text)}>Edit</button>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/8 h-1/8"
        onClick={() => handleDelete(todoItem.id)}>Delete</button>
      <button
        disabled={todoItem.status === DONE_STATUS}
        className="bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded w-1/8 h-1/8"
        onClick={() => handleChangeStatus(todoItem.id,true)}>{">>"}</button>
    </div>
  );
}

export default TodoItem;