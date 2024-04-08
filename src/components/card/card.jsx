import { useState, useEffect } from 'react'
import { Card, Flex, Typography } from 'antd'
import { format } from 'date-fns'
import fetchMovies from '../../services/fetchMovies'

import './card.scss'

function CardItem() {
  const { Title, Text } = Typography
  const fontStyle = {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '22px',
  }

  const [movies, setMovies] = useState({
    id: null,
    title: null,
    releaseDate: null,
    overview: null,
  })

  useEffect(() => {
    fetchMovies('return').then((data) =>
      setMovies({
        id: data[0].id,
        title: data[0].title,
        releaseDate: data[0].release_date,
        overview: data[0].overview,
      }),
    )
  }, [])

  const { title, releaseDate, overview } = movies

  return (
    <Card
      className='card'
      hoverable
      styles={{
        body: {
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <Flex className='card__cover' justify='flex-left'>
        <img
          alt='cover'
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
        <Flex className='card__content' vertical>
          <Title
            className='card__title'
            level={3}
            style={{ fontWeight: 400, fontSize: 20, lineHeight: '27px' }}
          >
            {/* The way back */}
            {title}
          </Title>
          <Text className='card__timestamp' type='secondary' style={fontStyle}>
            {/* March 5, 2020 */}
            {format(releaseDate, 'MM/dd/yyyy')}
          </Text>
          <div className='card__genre'>
            <Text keyboard type='secondary'>
              Action
            </Text>
            <Text keyboard type='secondary'>
              Drama
            </Text>
          </div>
          <Text className='card__overview' style={fontStyle}>
            {/* Back from a tour of duty, Kelli struggles to find her place in her
            family and the rust-belt town she no longer recognizes. */}
            {overview}
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}

export default CardItem
