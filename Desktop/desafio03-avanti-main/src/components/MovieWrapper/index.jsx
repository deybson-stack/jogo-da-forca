import { useEffect, useState } from "react"
import { Movie } from "../Movie";
import "./style.css"

import { api } from '../../services/api';
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export const MovieWrapper = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState({
        status: true,
        text: "Falha na autenticação da API"
    });

    const navigate = useNavigate();

    const handleMovieDetailsPage = (id) => {
        navigate(`/detalhes/${id}`);
    }


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('discover/movie/?language=pt');

                if (response.status === 200) {
                    setError({
                        status: false,
                        text: null
                    });
                    setMovies(response.data.results);
                } else if (response.status === 401) {
                    setError({
                        status: true,
                        text: "Falha na autenticação da API"
                    })
                } else {
                    setError({
                        status: true,
                        text: response.statusText
                    });
                }
            } catch (error) {
                setError({
                    status: true,
                    text: error.message
                });
            }
        }
        fetchMovies();
    }, []);

    const groupedMovies = [];
    for (let i = 0; i < movies.length; i += 5) {
        groupedMovies.push(movies.slice(i, i + 5));
    }

    return (
        <>
            <section className="movies">
                {error.status === true ? (
                    <>
                        <h3>Ocorreu um erro!</h3>
                        <p>{error.text}</p>
                    </>
                ) : (
                    <Carousel indicators={false}>
                        {groupedMovies.map((group, index) => (
                            <Carousel.Item key={index}>
                                <div className="d-flex justify-content-between">
                                    {group.map(movie => (
                                        <Movie
                                            key={movie.id}
                                            title={movie.title}
                                            poster={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
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

            </section>
        </>
    )
}
