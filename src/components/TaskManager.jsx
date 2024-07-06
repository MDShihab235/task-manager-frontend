import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {
  CreateTask,
  DeleteTaskById,
  GetAllTasks,
  UpdateTaskById,
} from "../api/api.js";
import { notify } from "../api/utils.js";
function TaskManager() {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = () => {
    if (updateTask && titleInput && descInput) {
      //upadte api call
      console.log("update api call");
      const obj = {
        title: titleInput,
        description: descInput,
        status: updateTask.status,
        _id: updateTask._id,
      };
      handleUpdateItem(obj);
    } else if (updateTask === null && titleInput && descInput) {
      console.log("create api call");
      //create api call
      handleAddTask();
    }
    setTitleInput("");
    setDescInput("");
  };

  useEffect(() => {
    if (updateTask) {
      setTitleInput(updateTask.title);
      setDescInput(updateTask.description);
    }
  }, [updateTask]);

  const handleAddTask = async () => {
    const obj = {
      title: titleInput,
      description: descInput,
      status: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    const { _id, status, title, description } = item;
    const obj = {
      title,
      status: !status,
      description,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleUpdateItem = async (item) => {
    const { _id, status, title, description } = item;
    const obj = {
      title,
      status: status,
      description,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) =>
      item.title.toLowerCase().includes(term)
    );
    setTasks(results);
  };
  return (
    <div
      className="d-flex flex-column align-items-center
        w-50 m-auto mt-5"
    >
      <h1 className="mb-4">Task Manager App</h1>
      {/* Input and Search box */}
      <div
        className="d-flex flex-column justify-content-between
            align-items-center mb-4 w-100"
      >
        <div className="input-group flex-grow-1 mb-4 search-task">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            className="form-control"
            type="text"
            placeholder="Search tasks"
          />
        </div>
        <div className=" task-form">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className="form-control "
            placeholder="Add title"
          />
          {/* <input
            type="text"
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
            className="form-control me-1"
            placeholder="Add description"
          /> */}
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="text"
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
            placeholder="Add description"
          ></textarea>
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
            <FaPlus className="m-2" />
            Add
          </button>
        </div>
      </div>

      {/* List of items */}
      <div className="d-flex flex-column flex-wrap  w-100">
        {tasks?.map((item) => {
          console.log(item);
          return (
            <div
              key={item._id}
              className="m-2 p-2 border bg-light
                w-100 rounded-3 d-flex flex-column justify-content-between
                align-items-center list-section"
            >
              <div className="list-content">
                <h1
                  className={item.status ? "text-decoration-line-through" : ""}
                >
                  <span className="headline">Title:</span> {item.title}
                </h1>
                <p
                  className={item.status ? "text-decoration-line-through" : ""}
                >
                  <span className="headline">Description:</span>{" "}
                  {item.description}
                </p>
              </div>

              <div className="buttons">
                <button
                  onClick={() => handleCheckAndUncheck(item)}
                  className={
                    item.status
                      ? "btn btn-secondary btn-sm me-2"
                      : "btn btn-success btn-sm me-2"
                  }
                  type="button"
                >
                  {item.status ? "Completed" : "Not Completed"}
                </button>
                <button
                  onClick={() => setUpdateTask(item)}
                  className="btn btn-primary
                            btn-sm me-2"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(item._id)}
                  className="btn btn-danger
                            btn-sm me-2"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
