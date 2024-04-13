import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './spinner.scss'

function LoadingSpin() {
  return (
    <div className='spin spin--position'>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 64,
            }}
            spin
          />
        }
      />
    </div>
  )
}

export default LoadingSpin
