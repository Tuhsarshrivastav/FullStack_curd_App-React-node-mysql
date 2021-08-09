const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "curd",
});
app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM movie_review";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});
app.post("/api/Insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_review (movieName,movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/Delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqldelete = "DELETE FROM movie_review WHERE movieName = ?";
  db.query(sqldelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate =
    "UPDATE movie_review SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
