import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./routes/App";
import Movie from "./routes/Movie";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:movieName" element={<Movie />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);