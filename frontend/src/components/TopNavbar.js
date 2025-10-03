import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";


function TopNavbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="/task_list">Task Manager</a>
      <div className="ms-auto d-flex align-items-center">
        {username === "Admin" && <Link to="/users_list"><button className="btn btn-outline-light btn-sm" >Click to see our User Details</button></Link>}
      </div>
      <div className="ms-auto d-flex align-items-center">
        {username && <span className="text-white me-3"> <FaUser /> {username}</span>}
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
      </div>

    </nav>
  );
}

export default TopNavbar;
