const getResource = async (url) => {
  const res = await fetch(`https://api.themoviedb.org/3/${url}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWE4ODdhZTVjMjM4ZWE5M2FmMGMyMDRmMzViMzFjOSIsInN1YiI6IjY2MGZjMjcyMmQ1MzFhMDE2NDdlMDE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtciZ7i1PsOcUoZgaYyKtciwNKkj0a8ISxFQ7cz8osI',
    },
  })
  if (!res.ok) {
    throw new Error(`Could not Fetch ${url}, received ${res.status}`)
  }
  return res.json()
}

const transformData = (data) => ({
  id: data.id,
  genreIds: data.genre_ids,
  title: data.title,
  releaseDate: data.release_date || new Date(),
  overview: data.overview,
  posterPath: data.poster_path,
})

export const getFoundMovies = async (search, page = 1) => {
  const data = await getResource(`search/movie?query=${search}&page=${page}`)
  console.log(data.results)
  return data.results.map(transformData)
}

export const getPopularMovies = async () => {
  const data = await getResource(`movie/popular`)
  return data.results.map(transformData)
}