const API_KEY = 'daa887ae5c238ea93af0c204f35b31c9'
const getResource = async (url) => {
  const res = await fetch(`https://api.themoviedb.org/3/${url}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization:
      // 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWE4ODdhZTVjMjM4ZWE5M2FmMGMyMDRmMzViMzFjOSIsInN1YiI6IjY2MGZjMjcyMmQ1MzFhMDE2NDdlMDE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtciZ7i1PsOcUoZgaYyKtciwNKkj0a8ISxFQ7cz8osI',
    },
  })
  if (!res.ok) {
    throw new Error(`Could not Fetch ${url}, received ${res.status}`)
  }
  return res.json()
}

export const getGenreMovies = async () => {
  const data = await getResource(`genre/movie/list?api_key=${API_KEY}`)
  return data.genres
}

const transformData = (data) => ({
  id: data.id,
  title: data.title,
  releaseDate: data.release_date || new Date(),
  genreIds: data.genre_ids,
  overview: data.overview,
  posterPath: data.poster_path,
  voteAverage: data.vote_average,
  voteCount: data.vote_count,
})

export const getFoundMovies = async (search, page = 1) => {
  const data = await getResource(
    `search/movie?api_key=${API_KEY}&query=${search}&page=${page}`,
  )
  return {
    results: data.results.map(transformData),
    pages: data.total_pages,
    totalResults: data.total_results,
  }
}

export const getPopularMovies = async (page = 1) => {
  const data = await getResource(
    `movie/popular?api_key=${API_KEY}&page=${page}`,
  )
  console.log(data)
  return {
    results: data.results.map(transformData),
    pages: data.total_pages,
    totalResults: data.total_results,
  }
}
