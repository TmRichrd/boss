import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { NoticeBar, Image } from 'antd-mobile'
import userStore from '../../store'
import { EditOutlined } from '@ant-design/icons'

class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.unsubscribe = null
  }
  componentDidMount() {
    this.unsubscribe = userStore.subscribe(() => {
      this.setState({})
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <Navbar history={this.props.history} title={'我的在线简历'} />
        <NoticeBar
          content="Boss能预览到您的在线简历，建议认真填写"
          color="alert"
          closeable
        />
        <div className="p-4">
          <div
            className="flex justify-between items-center pb-6"
            style={{ borderBottom: '1px solid #f1f1f1' }}
          >
            <div style={{width:"100%"}}>
              <h1
                className="text-xl font-bold mb-2 flex items-center"
                style={{ flex: 1, maxWidth: '275px' }}
              >
                <span
                  className="mr-1"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    wordBreak:"normal"
                  }}
                >
                  {userStore.getState().user.name}
                </span>
                <EditOutlined />
              </h1>
              <h1 className="text-sm hidden" style={{ color: '#696969' }}>
                <span className="mr-2">1年</span>
                <span className="mr-2">23岁</span>
                <span className="mr-2">大专</span>
              </h1>
            </div>
            <div>
              <Image
                src={userStore.getState().user.headImg}
                width={60}
                height={60}
                fit="cover"
                style={{ borderRadius: 40 }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Resume
