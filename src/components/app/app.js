import { useEffect, useMemo, useState } from 'react'
import { Layout } from 'antd'
import Context from '../context/context'
import TabItems from '../tabs/tabs'
import SearchTab from '../tabs/searchTab'
import { createGuestSession, getGenreMovies } from '../../services/getResource'

import './app.scss'
import RatedTab from '../tabs/ratedTab'

function App() {
  const [genres, setGenres] = useState([])
  const [guestSession, setGuestSession] = useState({})

  useEffect(() => {
    getGenreMovies().then((data) => setGenres(data))
    createGuestSession().then((data) =>
      setGuestSession(data, console.log(data)),
    )
  }, [])

  const context = useMemo(
    () => ({ genres, guestSession }),
    [genres, guestSession],
  )

  return (
    <Context.Provider value={context}>
      <div className='container'>
        <Layout className='container__layout'>
          <TabItems searchContent={<SearchTab />} ratedContent={<RatedTab />} />
        </Layout>
      </div>
    </Context.Provider>
  )
}

export default App
