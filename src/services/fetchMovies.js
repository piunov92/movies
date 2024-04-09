const fetchMovies = async (type, search = '', page = 1) => {
  const searchUrl = `movie?query=${search}&page=${page}`
  const url = `https://api.themoviedb.org/3/${type}/${type === 'movie' ? 'popular' : searchUrl}`
  const res = await fetch(url, {
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
  const data = await res.json()
  console.log(data.results)
  return data.results
}

export default fetchMovies
