import { Layout } from 'antd'
import CardList from '../cards/cards'

import './app.scss'

function App() {
  // getMovies('return').then(console.log)
  return (
    <div className='container'>
      <Layout className='container__layout'>
        <Layout.Content>
          <CardList />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App
