import "./style.css";
import { FaStar, FaCalendar, FaHeart } from 'react-icons/fa';
import moment from "moment/moment";
import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";

export const Movie = ({ title, id, poster, vote, year, handleDetails }) => {

    const { getFavoriteMovieById, addFavoriteMovie } = useContext(FavoritesContext);
    return (
        <>
            <div className="movie">
                <div className="title">
                    <span>{title}</span>
                    <div>
                        <p><FaStar /> {vote}</p>
                    </div>
                </div>
                <div className="poster">
                    <img src={poster} alt={title} />

                </div>
                <div className="icons">
                    <div className="year">
                        <span><FaCalendar /> {moment(year).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="favoriteIcon">
                        <FaHeart
                            cursor={"pointer"}
                            color={getFavoriteMovieById(id) ? 'red' : 'white'}
                            onClick={() => {
                                const movie = {
                                    id,
                                    title,
                                    poster,
                                    vote,
                                    year
                                }
                                addFavoriteMovie(movie)
                            }}
                        />
                    </div>
                </div>
                <button onClick={() => handleDetails(id)}>
                    Detalhes
                </button>
            </div>
        </>
    )
}