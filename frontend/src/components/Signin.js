import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
         });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:6274/create_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Successfully Created...");
                setFormData({ name: "", email: "", password: ""});
                navigate("/");
            } else {
                // Optionally handle server errors
                const errorData = await res.json();
                alert(errorData);
            }

        } catch (err) {
            console.error(err);
            alert("An error occurred while creating the product.");
        }


    }


    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
            <div className="container bg-white rounded p-4" style={{ maxWidth: "500px" }}>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">

                        Sign<span className="text-primary">in</span>
                    </h3>
                    <div className="mb-3">
                        <label for="">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control bg-light"
                            value={formData.name}
                            placeholder="Enter Name"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <label for="">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control bg-light"
                            value={formData.email}
                            placeholder="Enter Email"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <label for="">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control bg-light"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <label for="">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className="form-control bg-light"
                            value={formData.confirm_password}
                            placeholder="confirm_password"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/" className="btn btn-success btn-sm">
                            Back
                        </Link>
                        <button type="submit" className="btn btn-sm btn-primary ms-2">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin;