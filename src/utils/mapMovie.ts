import MOVIE from "src/types/MOVIE";

export const mapMovie = (movie : any) : MOVIE => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date,
    description: movie.overview,
    img: movie.poster_path,
    genres: movie.genres,
    vote: movie.vote_average
})