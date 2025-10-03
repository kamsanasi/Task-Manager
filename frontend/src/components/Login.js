import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:6274/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name);
        navigate("/task_list");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
      <div className="container bg-white rounded p-4 shadow" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="name" className="form-label">name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/create_user" className="btn btn-outline-success btn-sm ms-2">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
