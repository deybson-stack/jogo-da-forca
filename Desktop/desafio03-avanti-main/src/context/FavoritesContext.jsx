import React, { createContext, useContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const localStorageKey = 'favorites';
    const [favoritesMovies, setFavoritesMovies] = useState(() => {
        const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey));
        return storedFavorites || [];
    });


    useEffect(() => {
        try {
            const storedFavorites = JSON.parse(localStorage.getItem(localStorageKey));
            if (storedFavorites) {
                setFavoritesMovies(storedFavorites);
            }
        } catch (error) {
            console.error("Erro ao fazer o parsing do JSON:", error);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(favoritesMovies));
    }, [favoritesMovies]);

    const addFavoriteMovie = (movie) => {
        setFavoritesMovies((prevFavorites) => {
            if (!prevFavorites.some((favMovie) => favMovie.id === movie.id)) {
                return [...prevFavorites, movie];
            } else {
                return prevFavorites.filter((favMovie) => favMovie.id !== movie.id);
            }
        });
    };

    const removeFavoriteMovie = (movieId) => {
        setFavoritesMovies((prevFavorites) => {
            return prevFavorites.filter((favMovie) => favMovie.id !== movieId);
        });
    };

    const getFavoriteMovieById = (movieId) => {
        const movie = favoritesMovies.filter((movie => movie.id === movieId));
        if (movie.length > 0) {
            return true;
        }
        return false;
    }

    return (
        <FavoritesContext.Provider
            value={{
                favoritesMovies,
                addFavoriteMovie,
                removeFavoriteMovie,
                getFavoriteMovieById
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
