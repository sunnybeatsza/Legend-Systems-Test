const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// connecting Database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Keiththompson1234",
  database: "usercredentials",
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/users", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO logininfo (username,password,email) 
          VALUES (?, ?,?)`,
      [username, password, email]
    );
    res.status(202).json({
      message: "User Created",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const data = await connection.promise().query(`SELECT *  from  logininfo;`);
    res.status(202).json({
      users: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch(`/user/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const update = await connection
      .promise()
      .query(
        `UPDATE logininfo set username = ?, password = ?, email = ? where id = ?`,
        [username, password, email, id]
      );
    res.status(200).json({
      message: "updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await connection
      .promise()
      .query(`DELETE FROM  logininfo where id = ?`, [id]);
    res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const [user] = await connection
      .promise()
      .query(`SELECT * FROM logininfo WHERE username = ? AND password = ?`, [
        username,
        password,
      ]);

    // If user is found, send a success response
    if (user.length > 0) {
      res.status(200).json({
        message: "Login successful",
      });
    } else {
      // If user is not found, send an error response
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { Taskname, Description, Status, Due_date } = req.body;

    // Insert the new task into the Tasks table
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO Tasks (Taskname, Description, Status, Due_date) 
      VALUES (?, ?, ?, ?)`,
      [Taskname, Description, Status, Due_date]
    );

    res.status(201).json({
      message: "Task added successfully",
      taskId: insertId,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/getTasks", async (req, res) => {
  try {
    // Retrieve all tasks from the Tasks table
    const [tasks] = await connection.promise().query("SELECT * FROM Tasks");

    res.status(200).json({
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(8080, () => {
  console.log("Server listening in http://localhost:8080");
});
