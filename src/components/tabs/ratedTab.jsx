/* eslint-disable no-nested-ternary */
import { useContext } from 'react'
import { Pagination } from 'antd'
import CardList from '../cards/cards'
import Context from '../context/context'
import LoadingSpin from '../loadingSpin/LoadingSpin'

import './tabs.scss'

function RatedTab() {
  const {
    errGetRatingMoviesState,
    currentPageState,
    moviesRatedState,
    pageSizeState,
    networkErrorState,
  } = useContext(Context)

  const [moviesRated] = moviesRatedState
  const [pageSize] = pageSizeState
  const [errMessage] = errGetRatingMoviesState
  const [networkError] = networkErrorState

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
      ) : errMessage || networkError ? (
        <div className='error error--layout'>{errMessage || networkError}</div>
      ) : (
        <LoadingSpin />
      )}
    </div>
  )
}

export default RatedTab
