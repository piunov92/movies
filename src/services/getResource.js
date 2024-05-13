import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWE4ODdhZTVjMjM4ZWE5M2FmMGMyMDRmMzViMzFjOSIsInN1YiI6IjY2MGZjMjcyMmQ1MzFhMDE2NDdlMDE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtciZ7i1PsOcUoZgaYyKtciwNKkj0a8ISxFQ7cz8osI'

const transformData = (data) => ({
  id: data.id,
  title: data.title,
  releaseDate: data.release_date || new Date(),
  genreIds: data.genre_ids,
  overview: data.overview,
  posterPath: data.poster_path,
  voteAverage: data.vote_average,
  voteCount: data.vote_count,
  rating: data.rating || null,
})

export const createGuestSession = async () => {
  const options = {
    method: 'GET',
    url: '/authentication/guest_session/new',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }

  const response = await axios.request(options)
  return {
    success: response.data.success,
    guestSessionId: response.data.guest_session_id,
  }
}

export const getGenreMovies = async () => {
  const options = {
    method: 'GET',
    url: '/genre/movie/list',
    params: { language: 'ru' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }

  const response = await axios.request(options)
  return response.data.genres
}

export const getFoundMovies = async (search, page = 1) => {
  const options = {
    method: 'GET',
    url: '/search/movie',
    params: { query: `${search}`, language: 'ru-Ru', page: `${page}` },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }

  const response = await axios.request(options)
  return {
    results: response.data.results.map(transformData),
    pages: response.data.total_pages,
    totalResults: response.data.total_results,
  }
}

export const getPopularMovies = async (page = 1) => {
  const options = {
    method: 'GET',
    url: '/movie/popular',
    params: { language: 'ru-Ru', page: `${page}` },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }

  const response = await axios.request(options)
  return {
    results: response.data.results.map(transformData),
    pages: response.data.total_pages,
    totalResults: response.data.total_results,
  }
}

export const getRatedMovies = async (sessionID, page = 1) => {
  const options = {
    method: 'GET',
    url: `/guest_session/${sessionID}/rated/movies`,
    params: { language: 'ru-Ru', page: `${page}`, sort_by: 'created_at.asc' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }

  const response = await axios.request(options)
  return {
    results: response.data.results.map(transformData),
    pages: response.data.total_pages,
    totalResults: response.data.total_results,
  }
}

export const setRatingMovies = async (sessionId, movieId, rate) => {
  const options = {
    method: 'POST',
    url: `/movie/${movieId}/rating`,
    params: { guest_session_id: `${sessionId}` },
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: `{"value": ${rate}}`,
  }

  await axios.request(options)
}
