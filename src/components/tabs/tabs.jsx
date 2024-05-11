import { useContext, useEffect } from 'react'
import { ConfigProvider, Tabs } from 'antd'
import PropTypes from 'prop-types'
import { getRatedMovies } from '../../services/getResource'
import Context from '../context/context'

function TabItems({ searchContent, ratedContent }) {
  const { guestSession } = useContext(Context)
  const { guestSessionId } = guestSession

  const label = ['Search', 'Rated']
  const content = [
    {
      tab: searchContent || null,
    },
    {
      tab: ratedContent || null,
    },
  ]

  const handleOnTabClick = (key) => {
    if (key === '2') {
      console.log(key)
      getRatedMovies(guestSessionId).then(console.log)
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: '#ff0000',
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey='1'
        centered
        size='large'
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1)
          return {
            label: label[i],
            key: id,
            children: content[i].tab,
          }
        })}
        onTabClick={handleOnTabClick}
      />
    </ConfigProvider>
  )
}

TabItems.propTypes = {
  searchContent: PropTypes.element.isRequired,
  ratedContent: PropTypes.element.isRequired,
}

export default TabItems
