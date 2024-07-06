import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";

const TaskList = (props) => {
  return (
    <div className="d-flex flex-column w-100">
      {tasks.map((item) => (
        <div
          key={item._id}
          className="m-2 p-2 border bg-light
                w-100 rounded-3 d-flex justify-content-between
                align-items-center"
        >
          <span className={item.isDone ? "text-decoration-line-through" : ""}>
            {item.taskName}
          </span>

          <div className="">
            <button
              onClick={() => handleCheckAndUncheck(item)}
              className="btn btn-success
                            btn-sm me-2"
              type="button"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => setUpdateTask(item)}
              className="btn btn-primary
                            btn-sm me-2"
              type="button"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => handleDeleteTask(item._id)}
              className="btn btn-danger
                            btn-sm me-2"
              type="button"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
