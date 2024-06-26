import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    director: "",
    releaseYear: "",
    language: "",
    rating: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addMovie = await axios
      .post("https://backendmovie-ruza.onrender.com/api/movies", movie)
      .then(navigate("/"))
      .catch((err) => console.error(err));
    console.log(addMovie);
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form className="addmovie" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseYear"
          placeholder="Release Year"
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          onChange={handleChange}
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
        />
        <button style={{ backgroundColor: "#0056b3" }} type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
