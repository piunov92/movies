import { useEffect, useState } from 'react'
import { Layout } from 'antd'
import TabItems from '../tabs/tabs'
import SearchTab from '../tabs/searchTab'

import './app.scss'
import { createGuestSession } from '../../services/getResource'

function App() {
  const [guestSession, setGuestSession] = useState({})

  useEffect(() => {
    // createGuestSession().then(data => setGuestSession(data, console.log(data)))
    createGuestSession().then((data) => setGuestSession(data))
  }, [])

  return (
    <div className='container'>
      <Layout className='container__layout'>
        <TabItems searchContent={<SearchTab />} ratedContent='rated content' />
      </Layout>
    </div>
  )
}

export default App
