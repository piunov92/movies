// import { useState, useEffect, useContext } from 'react'
// import { Pagination } from 'antd'
// import Context from '../context/context'
// import CardList from '../cards/cards'
// import { getRatedMovies } from '../../services/getResource'

function RatedTab() {
  // const [moviesRated, setMoviesRated] = useState([])
  // const [pageSize, setPageSize] = useState(0)
  // const [currentPage, setCurrentPage] = useState(1)
  // const { guestSession } = useContext(Context)
  // const { guestSessionId } = guestSession

  // const MAX_API_ELEMENTS = 10000

  // useEffect(() => {
  //   getRatedMovies(guestSessionId, currentPage).then((data) => {
  //     setMoviesRated(data.results)
  //     setPageSize(data.pages)
  //     console.log(data.results)
  //   })
  // })

  return (
    <div>
      {/* {moviesRated.length > 0 ? (
        <>
          <CardList movies={moviesRated} />
          <Pagination
            className='pagination pagination--layout'
            onChange={(prev) => setCurrentPage(prev)}
            defaultPageSize={moviesRated.length}
            total={
              pageSize > 500 ? MAX_API_ELEMENTS : pageSize * moviesRated.length
            }
          />
        </>
      ) : (
        <h1>Array is Empty</h1>
      )} */}
    </div>
  )
}

export default RatedTab
