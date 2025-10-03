const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "mysecretkey"; // JWT secret

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_manager",
});

db.connect((err) => {
  if (err) console.error("DB connection failed:", err.stack);
  else console.log("Connected to database.");
});

//  USERS CRUD 

// Loggin 
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  const query = `SELECT * FROM users WHERE name=?`;
  db.query(query, [name], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Bcrypt error" });

      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: "1m" });
      res.json({ message: "Login successful", token, name:user.name });
    });
  });
});


// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT id, name, email, created_at FROM users", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// Get single user
app.get("/user/:id", (req, res) => {
  db.query("SELECT id, name, email FROM users WHERE id=?", [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(data[0]);
  });
});

// Create user with hashed password
app.post("/create_user", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hash], (err, result) => {
      if (err) return res.status(500).json({ message: "User already exists or DB error" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Edit user
app.put("/edit_user/:id", (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE users SET name=?, email=?, password=? WHERE id=?",
    [name, email, password, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User updated successfully" });
    }
  );
});

// Delete user
app.delete("/delete_user/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted successfully" });
  });
});

// TASKS CRUD

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Get single task
app.get("/task/:id", (req, res) => {
  db.query("SELECT * FROM tasks WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Task not found" });
    res.json(result[0]);
  });
});

// Create task
app.post("/tasks", (req, res) => {
  const { title, description, due_date, status } = req.body;
  db.query(
    "INSERT INTO tasks(title, description, due_date, status) VALUES (?, ?, ?, ?)",
    [title, description, due_date, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Task created", taskId: result.insertId });
    }
  );
});

// Edit task
app.put("/edit_task/:id", (req, res) => {
  const { title, description, due_date, status } = req.body;
  db.query(
    "UPDATE tasks SET title=?, description=?, due_date=?, status=? WHERE id=?",
    [title, description, due_date, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task updated successfully" });
    }
  );
});

// Delete task
app.delete("/task/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task deleted successfully" });
  });
});

//  START SERVER 
app.listen(6274, () => console.log("Server running on http://localhost:6274"));
