import React, { Component } from 'react'
import { Button } from 'antd-mobile'
export default class HomeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { title } = this.props
    let loginStatus = false
    // 处理渲染逻辑
    let userLogin
    if (!loginStatus) {
      userLogin = (
        <Button
          size="small"
          style={{
            borderRadius: '15px',
            color: '#5bd4c7',
            fontSize: '12px',
            height: '25px',
            lineHeight: '25px',
            padding: '0 8px',
          }}
          onClick={() => this.props.history.push('/login')}
        >
          登录/注册
        </Button>
      )
    } else {
      userLogin = (
        <div className="flex">
          {/* <Space> */}
            {/* <Icon type="plus" size="sm" /> */}
            {/* <Icon type="search" size="sm" /> */}
          {/* </Space> */}
        </div>
      )
    }
    return (
      <div
        className="p-4 flex justify-between items-center"
        style={{ background: '#5bd4c7', color: '#fff' }}
      >
        <span className="text-base">{title}</span>
        {userLogin}
      </div>
    )
  }
}
