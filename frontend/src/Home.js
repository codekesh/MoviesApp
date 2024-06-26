// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div class="header">
      <h1>Welcome to Movie App</h1>
      <ul class="navigation">
        <li>
          <Link to="/" class="nav-link">
            Show all Movies
          </Link>
        </li>
        <li>
          <Link to="/add" class="nav-link">
            Add a New Movie
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
