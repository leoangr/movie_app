
const MoviesCardPopular = ({ moviePopular, index }) => {
    return (
        <li>
            <p>{index + 1}</p>
            <img src={moviePopular.img_movie} alt={moviePopular.title_movie} />
        </li>
    );
};

export default MoviesCardPopular;