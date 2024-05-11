import { ConfigProvider, Rate } from 'antd'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context/context'
import { setRatingMovies } from '../../services/getResource'

function RateItem({ movieId }) {
  const [currentValue, setCurrentValue] = useState(null)
  const { guestSession } = useContext(Context)
  const { guestSessionId } = guestSession
  // const [rating, setRating] = useState([])

  const handleRate = async (value) => {
    setCurrentValue(value)
    setRatingMovies(guestSessionId, movieId, value)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Rate: {
            marginXS: 1,
          },
        },
      }}
    >
      <Rate
        count={10}
        allowHalf
        onChange={(value) => handleRate(value)}
        value={currentValue}
        style={{ position: 'absolute', top: 245, padding: 5 }}
        allowClear={false}
      />
    </ConfigProvider>
  )
}

RateItem.propTypes = {
  movieId: PropTypes.number.isRequired,
}

export default RateItem
