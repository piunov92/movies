import { ConfigProvider, Rate } from 'antd'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context/context'
import { addRatingMovies, getRatedMovies } from '../../services/getResource'

function RateItem({ movieId }) {
  const [currentValue, setCurrentValue] = useState(null)
  const { guestSession } = useContext(Context)
  const { guestSessionId } = guestSession

  const handleRate = async () => {
    await addRatingMovies(guestSessionId, movieId, 1).then(console.log)
    getRatedMovies(guestSessionId).then(console.log)
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
        // onChange={(value) => setCurrentValue(value)}
        onChange={handleRate}
        value={currentValue}
        style={{ position: 'absolute', top: 245, padding: 5 }}
      />
    </ConfigProvider>
  )
}

RateItem.propTypes = {
  movieId: PropTypes.number.isRequired,
}

export default RateItem
