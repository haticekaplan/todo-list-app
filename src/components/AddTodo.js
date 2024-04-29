const AddTodo = ({ newTodoText, setNewTodoText, handleAddTodoArray }) => {
  const handleChangeTodoText = (e) => {
    setNewTodoText(e.target.value);
  }
  return (
    <div className="flex w-full">
      <input
        type="text"
        className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-3/4"
        placeholder="Todo Description"
        value={newTodoText}
        onChange={handleChangeTodoText}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4"
        type="submit"
        onClick={handleAddTodoArray}
      >
        Add Todo
      </button>
    </div>
  );
}
export default AddTodo;