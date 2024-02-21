
function TodoButton({ todo, onToggleComplete }) {
    return (
      <div className="flex justify-between items-center bg-gray-700 text-white p-4 rounded">
        <span>{todo.description} - Due by {todo.date}</span>
        <button 
          onClick={() => onToggleComplete(todo.id, !todo.is_complete)}
          className={`py-2 px-4 rounded ${todo.is_complete ? 'bg-green-500' : 'bg-gray-500'}`}
        >
          {todo.is_complete ? 'Completed' : 'Mark as Complete'}
        </button>
      </div>
    );
  }

  export default TodoButton;
  