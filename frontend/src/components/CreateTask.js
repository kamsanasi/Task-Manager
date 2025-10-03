import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: ""
  });

  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:6274/tasks", formData);
      setMessage("✅ Task created successfully!");
      setFormData({ title: "", description: "", due_date: "", status: "" });
      setTimeout(() => navigate("/task_list"), 1500); 
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error creating task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className="container bg-white rounded p-4" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">
            Create <span className="text-primary">New Task</span>
          </h3>

          {message && <div className="alert alert-info">{message}</div>}

          <div className="mb-3">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control bg-light"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control bg-light"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="due_date">Due Date:</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              className="form-control bg-light"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              className="form-select bg-light"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" selected>-- Select Status --</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/task_list" className="btn btn-success btn-sm">Back</Link>
            <button type="submit" className="btn btn-primary btn-sm ms-2" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;