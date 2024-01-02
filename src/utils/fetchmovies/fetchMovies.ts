import { environment } from "src/environment/environment"

export const fetchMovies = async () => {
    const apiKey = environment.apiKey
    const apiLink = "https://api.themoviedb.org/3/movie/popular"

    const response = await fetch(`${apiLink}?api_key=${apiKey}`)

    const json = await response.json()

    return json.results.slice(0,9)
}