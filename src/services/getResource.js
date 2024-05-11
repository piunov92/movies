import axios, { HttpStatusCode } from 'axios'
import { se } from 'date-fns/locale'

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const API_KEY = 'daa887ae5c238ea93af0c204f35b31c9'

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
  const { data } = await axios.get('/authentication/guest_session/new', {
    params: {
      api_key: `${API_KEY}`,
    },
  })
  return {
    success: data.success,
    guestSessionId: data.guest_session_id,
  }
}

export const getGenreMovies = async () => {
  const { data } = await axios.get('/genre/movie/list', {
    params: {
      api_key: `${API_KEY}`,
      language: 'ru',
    },
  })
  return data.genres
}

export const getFoundMovies = async (search, page = 1) => {
  const { data } = await axios.get('/search/movie', {
    params: {
      api_key: `${API_KEY}`,
      query: search,
      language: 'ru-Ru',
      page,
    },
  })
  return {
    results: data.results.map(transformData),
    pages: data.total_pages,
    totalResults: data.total_results,
  }
}

export const getPopularMovies = async (page = 1) => {
  const { data } = await axios.get('/movie/popular', {
    params: {
      api_key: `${API_KEY}`,
      page,
      language: 'ru-Ru',
    },
  })
  return {
    results: data.results.map(transformData),
    pages: data.total_pages,
    totalResults: data.total_results,
  }
}

// export const addRatingMovies = async (sessionId, movieId, rate) => {
//   const options = {
//     method: 'POST',
//     url: `/movie/${movieId}/rating`,
//     params: { guest_session_id: `${sessionId}`, api_key: `${API_KEY}` },
//     headers: {
//       accept: 'application/json',
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     data: `{"value": ${rate}}`,
//   }

//   axios.request(options).then(console.log)
// }

export const getRatedMovies = async (sessionID, page = 1) => {
  const { data } = await axios.get(`/guest_session/${sessionID}/rated/movies`, {
    params: {
      api_key: `${API_KEY}`,
      language: 'ru-Ru',
      page,
      sort_by: 'created_at.asc',
    },
  })
  return {
    results: data.results.map(transformData),
    pages: data.total_pages,
    totalResults: data.total_results,
  }
}

export const setRatingMovies = async (sessionId, movieId, rate) => {
  const options = {
    method: 'POST',
    url: `/movie/${movieId}/rating`,
    params: { guest_session_id: `${sessionId}`, api_key: `${API_KEY}` },
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    data: `{"value": ${rate}}`,
  }

  await axios
    .request(options)
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
