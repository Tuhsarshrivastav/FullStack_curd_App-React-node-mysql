import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [NewmovieReview, setNewMovieReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const submitReview = () => {
    axios.post("http://localhost:5000/api/Insert", {
      movieName: movieName,
      movieReview: movieReview,
    });
    setMovieReviewList([...movieReviewList], {
      movieName: movieName,
      movieReview: movieReview,
    });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/get").then((res) => {
      setMovieReviewList(res.data);
    });
  }, []);
  const deleteReview = (movie) => {
    axios.delete(`http://localhost:5000/api/Delete/${movie}`);
  };
  const UpdateReview = (movie) => {
    axios.put("http://localhost:5000/api/update/", {
      movieName: movie,
      movieReview: NewmovieReview,
    });
    setNewMovieReview("");
  };
  return (
    <div className="app">
      <div className="form">
        <h2 style={{marginBottom:"10px"}}>Fullstack-Curd-App</h2>
        <label>MovieName</label>
        <input
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          type="text"
          name="movieName"
          placeholder="Movie Name"
        />
        <label>Review</label>
        <input
          name="movieReview"
          value={movieReview}
          onChange={(e) => setMovieReview(e.target.value)}
          type="text"
          placeholder="Review Name"
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((movie) => (
          <>
            <div className="card" key={movie.id}>
              <h2>{movie?.movieName}</h2>
              <p>{movie?.movieReview}</p>
              <button
                onClick={() => {
                  deleteReview(movie.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="update"
                placeholder="Update Review"
                onChange={(e) => {
                  setNewMovieReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  UpdateReview(movie.movieName);
                }}
              >
                Update
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default App;
