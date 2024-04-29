import { useState } from "react";

const EditTodo = ({ text, handleEditText, handleEditCancel }) => {
  const [editText, setEditText] = useState(text);
  const handleChangeEditText = (e) => {
    setEditText(e.target.value);
  }
  return (
    <div className="flex items-center w-screen">
      <input
        type="text"
        value={editText}
        onChange={handleChangeEditText}
        className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full h-full"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={() => handleEditText(editText)}>Save</button>
      <button className="bg-gray-300 text-black px-4 py-2 rounded ml-2" onClick={handleEditCancel}>Cancel</button>
    </div>
  );
}

export default EditTodo;