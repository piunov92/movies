import { useState, useEffect } from 'react'
import { Layout, Input, Pagination } from 'antd'
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
  const [pageSize, setPageSize] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedValue] = useDebounce(searchField, 500)

  const MAX_API_ELEMENTS = 10000

  useEffect(() => {
    if (debouncedValue === '') {
      getPopularMovies(currentPage).then((data) => {
        setMovies(data.results, console.log(data.results))
        setPageSize(data.pages)
      })
    } else {
      getFoundMovies(debouncedValue, currentPage).then((data) => {
        setMovies(data.results)
        setPageSize(data.pages)
      })
    }
  }, [debouncedValue, currentPage])

  useEffect(() => {
    getGenreMovies().then((data) => setGenres(data))
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
            <>
              <Context.Provider value={genres}>
                <CardList movies={movies} />
              </Context.Provider>
              <Pagination
                className='pagination pagination--layout'
                onChange={(prev) => setCurrentPage(prev)}
                // onShowSizeChange={500}
                defaultPageSize={movies.length}
                total={
                  pageSize > 500 ? MAX_API_ELEMENTS : pageSize * movies.length
                }
              />
            </>
          ) : (
            <LoadingSpin />
          )}
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App
