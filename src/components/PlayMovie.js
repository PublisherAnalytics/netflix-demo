import React, { useEffect, useState } from 'react';
import './FeaturedMovie.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePlayCircleOutline } from "react-icons/md";

export default ({ item }) => {

    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const genresMock = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Western', 'Fiction'];

    useEffect(() => {
        const selectedGenres = [];
        for(let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * genresMock.length);
            selectedGenres.push(genresMock[randomIndex]);
            genresMock.splice(randomIndex, 1);
        }
        setGenres(selectedGenres);
    }, []);

    let firstDate = new Date(item.first_air_date);

    const handleMovieClick = (movie) => {
        let movieName = encodeURIComponent(movie.original_title ? movie.original_title : movie.original_name);
        navigate(`/movie/${movieName}`, { state: { movie } });
      }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <MdOutlinePlayCircleOutline />
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.original_name ? item.original_name : item.title}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} points</div>
                        <div className="featured--year">{firstDate.getFullYear() ? firstDate.getFullYear() : "2023"}</div>
                        {item.number_of_seasons && <div className="featured--seasons">{item.number_of_seasons} seasson{item.number_of_seasons !== 1 ? 's' : ''}</div>}
                    </div>
                    <div className="movie--description">{item.overview}</div>
                    <div className="featured--buttons">
                    </div>
                    <div className="featured--genres"><strong>Genres:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}