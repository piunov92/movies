import { ConfigProvider, Tabs } from 'antd'
import PropTypes from 'prop-types'

function TabItems({ searchContent, ratedContent }) {
  const label = ['Search', 'Rated']
  const content = [
    {
      tab: searchContent || null,
    },
    {
      tab: ratedContent || null,
    },
  ]
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
      />
    </ConfigProvider>
  )
}

TabItems.propTypes = {
  searchContent: PropTypes.element.isRequired,
  ratedContent: PropTypes.string.isRequired,
}

export default TabItems
