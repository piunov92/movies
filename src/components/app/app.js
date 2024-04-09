import { useState, useEffect } from 'react'
import { Layout, Input } from 'antd'
import { useDebounce } from 'use-debounce'
import CardList from '../cards/cards'
import fetchMovies from '../../services/fetchMovies'

import './app.scss'

function App() {
  const [movies, setMovies] = useState([])
  const [searchField, setSearchField] = useState('')
  const [debouncedValue] = useDebounce(searchField, 500)

  const getMovieData = (type, search) => {
    fetchMovies(type, search).then((data) => setMovies(data))
  }

  useEffect(() => {
    if (debouncedValue === '') {
      getMovieData('movie')
    } else {
      getMovieData('search', debouncedValue)
    }
  }, [debouncedValue])

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
          <CardList movies={movies} />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App
