import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:6274/tasks"); // No token
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching tasks.");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:6274/tasks/${id}`); // No token
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error deleting task.");
    }
  };

  // Filter & Pagination
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase())
  );

  const lastTask = currentPage * perPage;
  const firstTask = lastTask - perPage;
  const currentTasks = filteredTasks.slice(firstTask, lastTask);
  const totalPages = Math.ceil(filteredTasks.length / perPage);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-start bg-primary py-4">
      <div className="container bg-white rounded p-4">
        <div className="d-flex justify-content-between mb-3">
          {/* Search Box */}
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {/* Create Task Button */}
          <Link to="/create_task">
            <button className="btn btn-success fw-bold">
              Create Task <FaPlus size={14} className="ms-1" />
            </button>
          </Link>
        </div>

        {/* Task Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{firstTask + index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      {new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      })}
                    </td>
                    <td>{task.status}</td>
                    <td className="text-center">
                      {/* Edit Button */}
                      <Link to={`/edit_task/${task.id}`}>
                        <button className="btn btn-primary btn-sm me-1">
                          <FaEdit size={14} />
                        </button>
                      </Link>

                      {/* Delete Button */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Total Count */}
          <p className="mt-4">
            <b>Total Tasks: {filteredTasks.length}</b>
          </p>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((n) => (
                  <li
                    key={n + 1}
                    className={`page-item ${currentPage === n + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(n + 1)}
                    >
                      {n + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
