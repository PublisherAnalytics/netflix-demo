import React, { useState } from "react";
import "./MovieRow.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);
  const navigate = useNavigate();

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  const handleMovieClick = (movie) => {
    let movieName = encodeURIComponent(movie.original_title ? movie.original_title : movie.original_name);
    navigate(`/movie/${movieName}`, { state: { movie } });
  }

  const getUrl = (movie) => {
    let movieName = encodeURIComponent(movie.original_title ? movie.original_title : movie.original_name);
    return `https://netflix-pa.vercel.app/movie/${movieName}`;
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <FaAngleLeft style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right">
        <FaAngleRight style={{ fontSize: 50 }} onClick={handleRightArrow} />
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div data-npaw-article onClick={()=>{handleMovieClick(item)}} key={key} className="movieRow--item">
                <h1 data-npaw-article-title style={{display: "none"}}>{item.original_title ? item.original_title : item.original_name}</h1>
                <a data-npaw-article-url href={getUrl(item)} style={{display: "none"}}></a>
                <img
                  data-npaw-article-image
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title ? item.original_title : item.original_name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
