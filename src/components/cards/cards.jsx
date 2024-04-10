import PropTypes from 'prop-types'
import { Space } from 'antd'
import CardItem from '../card/card'

import './cards.scss'

function CardList({ movies }) {
  return (
    <Space className='list list--layout' direction='horizontal' size={36} wrap>
      {movies.map((item) => (
        <CardItem key={item.id} movies={item} />
      ))}
    </Space>
  )
}

CardList.propTypes = {
  movies: PropTypes.instanceOf(Array).isRequired,
}

export default CardList
