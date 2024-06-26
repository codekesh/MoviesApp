import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMovie = () => {
  const navigate=useNavigate()
  const [movie, setMovie] = useState({
    name: "",
    director: "",
    releaseYear: "",
    language: "",
    rating: "",
  });

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://backendmovie-ruza.onrender.com/api/movies/${params.id}`
        );
        setMovie(res.data.movieData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

  }, [params.id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://backendmovie-ruza.onrender.com/api/movies/${params.id}`, movie)
      .then((res) => {
        console.log("Movie updated:", res.data);
        navigate('/')
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Update Movie Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={movie.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            name="director"
            value={movie.director} // Display current director
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="releaseYear">Release Year:</label>
          <input
            type="text"
            name="releaseYear"
            value={movie.releaseYear} // Display current release year
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            name="language"
            value={movie.language} // Display current language
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            name="rating"
            value={movie.rating} // Display current rating
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
