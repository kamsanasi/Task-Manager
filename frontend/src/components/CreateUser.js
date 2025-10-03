import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:6274/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User created successfully!");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() => navigate("/"), 1000); 
      } else {
        setMessage(data.message || "❌ Failed to create user.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ An error occurred while creating the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className="container bg-white rounded p-4" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">
            Create <span className="text-primary">New User</span>
          </h3>

          {message && <div className="alert alert-info">{message}</div>}

          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control bg-light"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control bg-light"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control bg-light"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/" className="btn btn-success btn-sm">Back</Link>
            <button type="submit" className="btn btn-primary btn-sm ms-2" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
