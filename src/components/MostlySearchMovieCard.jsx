
const MoviesCardPopular = ({ moviePopular, index }) => {
    return (
        <li>
            <p>{index + 1}</p>
            <img src={moviePopular.poster_url} alt={moviePopular.searchTerm} />
        </li>
    );
};

export default MoviesCardPopular;