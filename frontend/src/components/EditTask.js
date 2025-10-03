import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: ""
  });

  // Fetch task details from backend
  useEffect(() => {
    axios
      .get(`http://localhost:6274/task/${id}`) // No token needed
      .then(res => {
        const dbDate = res.data.due_date;
        console.log(dbDate)
        const formattedDate = dbDate
          ? new Date(dbDate).toISOString().split("T")[0] // YYYY-MM-DD for input[type=date]
          : "";

        setFormData({
          title: res.data.title,
          description: res.data.description,
          due_date: formattedDate,
          status: res.data.status
        });
      })
      .catch(err => {
        console.error(err);
        alert("Error fetching task details.");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:6274/edit_task/${id}`, formData); // No token
      alert("✅ Task updated successfully!");
      navigate("/task_list"); // redirect to task list
    } catch (err) {
      console.error(err);
      alert("⚠️ Error updating task.");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className="container bg-white rounded p-4" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">
            Edit <span className="text-primary">Task</span>
          </h3>

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
            <button type="submit" className="btn btn-primary btn-sm ms-2">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
