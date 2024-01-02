type GENRE = {
    id: number
    name: string
}

type MOVIE = {
    id: number
    title: string
    year: string
    description: string
    img: string,
    genres: GENRE[],
    vote : number
}

export default MOVIE