import { Space } from 'antd'
import CardItem from '../card/card'

import './cards.scss'

function CardList() {
  return (
    <Space className='list list--layout' direction='horizontal' size={36} wrap>
      <CardItem />
      <CardItem />
    </Space>
  )
}

export default CardList
