import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:6274/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setFormData({ name: res.data.name, email: res.data.email, password: "" }))
    .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!formData.password) delete payload.password;

    try {
      await axios.put(`http://localhost:6274/edit_user/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ User updated successfully!");
      navigate("/users_list");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update user.");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className="container bg-white rounded p-4" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Edit <span className="text-primary">User</span></h3>
          <div className="mb-3">
            <input type="text" name="name" className="form-control bg-light" value={formData.name} onChange={handleChange} placeholder="Name" required autoFocus />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control bg-light" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control bg-light" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep password" />
          </div>
          <div className="d-flex justify-content-end">
            <Link to="/users_list" className="btn btn-success btn-sm">Back</Link>
            <button type="submit" className="btn btn-sm btn-primary ms-2">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
