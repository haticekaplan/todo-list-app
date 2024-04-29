const DeleteModal = ({ handleDeleteTodo, handleDeleteCancel }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p>Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end">
          <button className="mr-2 bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteTodo}>Yes</button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleDeleteCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;