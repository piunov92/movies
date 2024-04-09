import { useState } from 'react'
import { Card, Flex, Typography, Image } from 'antd'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import './card.scss'

// eslint-disable-next-line react/prop-types
function CardItem({ movies }) {
  const { Title, Text, Paragraph } = Typography
  const [expand, setExpand] = useState(false)

  const fontStyle = {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '22px',
  }

  const mov = {
    title: movies.title,
    releaseDate: movies.release_date || new Date(),
    overview: movies.overview,
    posterPath: movies.poster_path,
  }

  const { title, overview, releaseDate, posterPath } = mov

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
        <Image
          style={{ width: 183, height: 281 }}
          alt='cover'
          src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
          fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAEsCAYAAACfcRIYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABewSURBVHhe7d13kyRHucXhlgQIj/AySICwgQ9s8NX4635AAoSEBEjCIwlvF290eUpzRnn79uzOzszu7L5zfhEZVZWV5s3Mk29lVXdX33Pt2rWXd6UM5t6jbSljqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp6KvIynIi/jqcjLeCryMp4rL/KXX355C9lft3cb99xzz9FeWaknPyLC/s9//rOJ5d57773rRHO3Ts5bzT3Xrl270j2zLwzC/sc//rH797//vYWI/W4QEBvvu+++3Wte85otlFeoyBfx2v/jH/+4hX/+85/H5+4Gjx5bifx1r3vd7p3vfOfuDW94w/GV6SpTkf9XHPHUf//733cvvfTS7l//+tcWd7d48EO86U1v2r373e/evfa1r93akHZeRSry/w6+JQmP98tf/nL3pz/9aRNDLvt3k0DYmSsQ+9/1rnft3vKWtxyfq8ivIAYeBp/3fuGFFzaRED0vyBuGO10gJqnw61//epuoJij73/ve92623233FxfJlX66kkHPwGf9Ktx///2bN0yQ9qJD6jp07mYDUVuDW48rE4RtP17c9qoJHFda5Bl8EEpEIDgm+ohiPXdRQd2r+BJC6j9tSPpV2GkfEn/V6IdBRwJZBbAK41aSuhFBpu7Enxb54rmR/DdbzkT6YdAeEcnKrRSKsgVeOCRujT9k14q0OOskmUxFfoB9wdxK1GFpZN3v5vfatWu7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'
        />
        <Flex className='card__content' vertical>
          <Title
            className='card__title'
            level={3}
            style={{ fontWeight: 400, fontSize: 20, lineHeight: '27px' }}
          >
            {title}
          </Title>
          <Text className='card__timestamp' type='secondary' style={fontStyle}>
            {format(releaseDate, 'MMMM dd, yyyy')}
          </Text>
          <div className='card__genre'>
            <Text keyboard type='secondary'>
              Action
            </Text>
            <Text keyboard type='secondary'>
              Drama
            </Text>
          </div>
          <Paragraph
            className='card__overview'
            style={fontStyle}
            ellipsis={
              !expand
                ? {
                    expandable: false,
                    rows: 2,
                  }
                : false
            }
            onClick={() => setExpand((show) => !show)}
          >
            {overview}
          </Paragraph>
        </Flex>
      </Flex>
    </Card>
  )
}

CardItem.propTypes = {
  movies: PropTypes.instanceOf(Object).isRequired,
}

export default CardItem
