import { useState, useEffect } from 'react'
import { Layout, Input } from 'antd'
import { useDebounce } from 'use-debounce'
import CardList from '../cards/cards'
import Context from '../context/context'
import LoadingSpin from '../loadingSpin/LoadingSpin'
import {
  getFoundMovies,
  getGenreMovies,
  getPopularMovies,
} from '../../services/getResource'

import './app.scss'

function App() {
  const [movies, setMovies] = useState([])
  const [searchField, setSearchField] = useState('')
  const [genres, setGenres] = useState([])
  const [debouncedValue] = useDebounce(searchField, 500)

  useEffect(() => {
    if (debouncedValue === '') {
      getPopularMovies().then((data) => {
        setMovies(data, console.log(data))
      })
    } else {
      getFoundMovies(debouncedValue).then((data) =>
        setMovies(data, console.log(data)),
      )
    }
  }, [debouncedValue])

  useEffect(() => {
    getGenreMovies().then((data) => setGenres(data, console.log(data)))
  }, [])

  const handleSearch = (e) => {
    setSearchField(e.target.value)
  }

  return (
    <div className='container'>
      <Layout className='container__layout'>
        <Layout.Content>
          <div style={{ margin: 32 }}>
            <Input
              placeholder='Type to search...'
              allowClear
              value={searchField}
              onChange={handleSearch}
            />
          </div>
          {movies.length > 0 ? (
            <Context.Provider value={genres}>
              <CardList movies={movies} />
            </Context.Provider>
          ) : (
            <LoadingSpin />
          )}
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App
