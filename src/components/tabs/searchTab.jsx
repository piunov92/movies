import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { Layout, Input, Pagination } from 'antd'
import CardList from '../cards/cards'
import LoadingSpin from '../loadingSpin/LoadingSpin'
import { getFoundMovies, getPopularMovies } from '../../services/getResource'

function SearchTab() {
  const [movies, setMovies] = useState([])
  const [searchField, setSearchField] = useState('')
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

  const handleSearch = (e) => {
    setSearchField(e.target.value)
  }
  return (
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
          <CardList movies={movies} />
          <Pagination
            className='pagination pagination--layout'
            onChange={(prev) => setCurrentPage(prev)}
            defaultPageSize={movies.length}
            total={pageSize > 500 ? MAX_API_ELEMENTS : pageSize * movies.length}
          />
        </>
      ) : (
        <LoadingSpin />
      )}
    </Layout.Content>
  )
}

export default SearchTab
