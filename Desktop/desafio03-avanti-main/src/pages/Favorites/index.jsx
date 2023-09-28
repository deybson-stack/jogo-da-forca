import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { FavoritesContext } from "../../context/FavoritesContext";

import { Movie } from "../../components/Movie";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
    const { favoritesMovies, addFavoriteMovie, removeFavoriteMovie } = useContext(FavoritesContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = () => {
            setMovies(favoritesMovies)
        }
        fetchFavoriteMovies();
    }, [favoritesMovies]);

    const navigate = useNavigate();

    const handleMovieDetailsPage = (id) => {
        navigate(`/detalhes/${id}`);
    }

    const groupedMovies = [];
    for (let i = 0; i < movies.length; i += 5) {
        groupedMovies.push(movies.slice(i, i + 5));
    }

    return (
        <>
            <div className="PageWrapper">
                <div className="wrapper">
                    <Header />
                    <div className="movies">
                        {favoritesMovies.length === 0 ? (
                            <p>Nenhum filme favorito foi registrado</p>
                        ) : (
                            <Carousel indicators={false}>
                                {groupedMovies.map((group, index) => (
                                    <Carousel.Item key={index}>
                                        <div className="d-flex justify-content-between">
                                            {group.map(movie => (
                                                <Movie
                                                    key={movie.id}
                                                    title={movie.title}
                                                    poster={`https://image.tmdb.org/t/p/original/${movie.poster}`}
                                                    year={movie.release_date}
                                                    vote={movie.vote_average}
                                                    id={movie.id}
                                                    handleDetails={handleMovieDetailsPage}
                                                />
                                            ))}
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
