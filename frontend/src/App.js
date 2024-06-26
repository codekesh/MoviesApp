import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesList from "./Components/MoviesList";
import AddMovie from "./Components/AddMovie";
import UpdateMovie from "./Components/UpdateMovie";
import Home from "./Home";

function App() {
  return (
    <Router>
      <>
        <Home />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/update/:id" element={<UpdateMovie />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
