// Imports
const express = require("express"); //It's used to build your server and handle routing.
const mysql = require("mysql2"); // DB queries
const cors = require("cors"); // It allows your server to handle requests from different origins (i.e., different domains or ports).
require("dotenv").config(); // My sensitive data

const app = express(); // handling routes, middlewares, and other server functionalities.

//Middleware
app.use(cors()); // this allows my server to accept requests from other domains, which is important if the frontend is hosted separately from the backend.

// Database Connections
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
});

//routes
app.get("/", (req, res) => {
  res.send("test");
});

//test route
app.get("/test", (req, res) => {
  console.log("test endpoint hit");
  const query = "SELECT * FROM TEST";
  pool.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//Mine Routes

app.get("/project", (req, res) => {
  //This is a route for /project that handles a GET request and expects a query parameter called identification
  const id = req.query.identification; //gets the identification parameter from the URL query string.
  const query = "SELECT video FROM project WHERE project_id = ?"; //retrieves the video field from the project table where the project_id matches the given id.
  pool.query(query, [id], (err, result) => {
    // runs the query on the database, passing the id value as a parameter (using the ? placeholder in the SQL query).
    console.log(result);

    if (err) {
      res.send(err); // If there's an error, it sends the error to the client. If the query is successful, it sends the result (the video data) back to the client.
    } else {
      res.send(result);
    }
  });
});

app.get("/projectinstructions", (req, res) => {
  //This is a route for /project that handles a GET request and expects a query parameter called identification
  const id = req.query.identification; //gets the identification parameter from the URL query string.
  const query = "SELECT instructions FROM project WHERE project_id = ?"; //retrieves the instructions field from the project table where the project_id matches the given id.
  pool.query(query, [id], (err, result) => {
    // runs the query on the database, passing the id value as a parameter (using the ? placeholder in the SQL query).
    console.log(result);

    if (err) {
      res.send(err); // If there's an error, it sends the error to the client. If the query is successful, it sends the result (the video data) back to the client.
    } else {
      res.send(result);
    }
  });
});

// Tomas routes
// AREA//

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
