/* eslint-disable no-nested-ternary */
import { useContext } from 'react'
import { Pagination } from 'antd'
import CardList from '../cards/cards'
import Context from '../context/context'

import './ratedTab.scss'
import LoadingSpin from '../loadingSpin/LoadingSpin'

function RatedTab() {
  const {
    errGetRatingMoviesState,
    currentPageState,
    moviesRatedState,
    pageSizeState,
  } = useContext(Context)

  const [moviesRated] = moviesRatedState
  const [pageSize] = pageSizeState
  const [errMessage] = errGetRatingMoviesState

  return (
    <div>
      {moviesRated.length > 0 ? (
        <>
          <CardList movies={moviesRated} />
          <Pagination
            className='pagination pagination--layout'
            onChange={(prev) => currentPageState[1](prev)}
            defaultPageSize={moviesRated.length}
            total={pageSize}
          />
        </>
      ) : errMessage ? (
        <div className='error error--layout'>{errMessage}</div>
      ) : (
        <LoadingSpin />
      )}
    </div>
  )
}

export default RatedTab
