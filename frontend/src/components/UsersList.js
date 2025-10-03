import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:6274/users"); 
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:6274/delete_user/${id}`); 
        fetchUsers(); 
      } catch (err) {
        console.error(err);
        alert("Error deleting user");
      }
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-start bg-primary py-4">
      <div className="container bg-white rounded p-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create_user">
            <button className="btn btn-success fw-bold">
              Create User <FaPlus size={14} className="ms-1" />
            </button>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    <Link to={`/edit_user/${user.id}`}>
                      <button className="btn btn-primary btn-sm me-1"><FaEdit size={14} /></button>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="mt-4"><b>Total Users: {users.length}</b></p>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
