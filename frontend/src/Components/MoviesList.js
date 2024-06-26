import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MoviesList.css";
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDirector, setFilterDirector] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterRelease, setReleaseYear] = useState("");
  const [filterLang, setLang] = useState("");
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    axios
      .get("https://backendmovie-ruza.onrender.com/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `https://backendmovie-ruza.onrender.com/api/movies/${id}`
    );
    const updtedMovies = movies.filter((movie) => movie._id !== id);
    setMovies(updtedMovies);
  };

  const handleFilterChange = (event) => {
    if (event.target.name === "name") {
      setFilterName(event.target.value);
    }
    if (event.target.name === "director") {
      setFilterDirector(event.target.value);
    }
    if (event.target.name === "rating") {
      setFilterRating(event.target.value);
    }
    if (event.target.name === "releaseYear") {
      setReleaseYear(event.target.value);
    }
    if (event.target.name === "language") {
      setLang(event.target.value);
    }
    if (event.target.name === "search") {
      setSearchMovie(event.target.value);
    }
  };

  const parseRange = (rangeString) => {
    const [min, max] = rangeString.split("-").map(Number);
    return { min, max };
  };

  const filteredMovies = movies.filter((movie) => {
    const ratingMatch =
      filterRating === "" ||
      (parseRange(filterRating).min <= movie.rating &&
        parseRange(filterRating).max >= movie.rating);

    const releaseMatch =
      filterRelease === "" ||
      (parseRange(filterRelease).min <= movie.releaseYear &&
        parseRange(filterRelease).max >= movie.releaseYear);
    return (
      movie.name.toLowerCase().includes(filterName.toLowerCase()) &&
      movie.director.toLowerCase().includes(filterDirector.toLowerCase()) &&
      ratingMatch &&
      releaseMatch &&
      movie.language.toLowerCase().includes(filterLang.toLowerCase()) &&
      movie.name.toLowerCase().includes(searchMovie.toLowerCase())
    );
  });

  return (
    <>
      <div class="movie-container">
        <h2>All Movies</h2>
        <div class="search-bar">
          <label htmlFor="name"> Search:</label>
          <input
            type="text"
            name="search"
            class="search-input"
            placeholder="Search..."
            onChange={handleFilterChange}
          />
        </div>
        <div class="filters">
          <div>
            <label htmlFor="name">Filter by Name:</label>
            <input type="text" name="name" onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="director">Filter by Director:</label>
            <input type="text" name="director" onChange={handleFilterChange} />
          </div>
          <div>
            <label htmlFor="release">Filter by Release Year:</label>
            <select name="releaseYear" onChange={handleFilterChange}>
              <option value="">Select Release Year</option>
              <option>Before 1950</option>
              <option>1950-1970</option>
              <option>1970-1990</option>
              <option>1990-2010</option>
              <option>2010-2020</option>
              <option>After 2020</option>
            </select>
          </div>
          <div>
            <label htmlFor="rating">Filter by Rating:</label>
            <select name="rating" onChange={handleFilterChange}>
              <option value="">Select Rating</option>
              <option>0-2</option>
              <option>2-4</option>
              <option>4-6</option>
              <option>6-8</option>
              <option>8-10</option>
            </select>
          </div>
          <div>
            <label htmlFor="language">Filter by Language:</label>
            <input type="text" name="language" onChange={handleFilterChange} />
          </div>
        </div>

        <ul class="movie-list">
          {filteredMovies.map((movie) => (
            <li key={movie._id}>
              <span>
                <strong>{movie.name}</strong>
              </span>
              <span>Imdb: {movie.rating}</span>
              <span>{movie.director}</span>
              <span>({movie.releaseYear})</span>
              <span>{movie.language}</span>
              <Link to={`/update/${movie._id}`}>Update</Link>
              <button onClick={() => handleDelete(movie._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default MoviesList;
