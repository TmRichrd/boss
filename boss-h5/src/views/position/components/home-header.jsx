import React, { Component } from 'react'
import { Button, Space } from 'antd-mobile'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
export default class HomeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { title } = this.props
    let loginStatus = localStorage.getItem('token') || ''
    // 处理渲染逻辑
    let userLogin
    if (!loginStatus) {
      userLogin = (
        <Button
          size="small"
          style={{
            borderRadius: '15px',
            color: '#1677ff',
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
          <Space size={10}>
            <PlusOutlined style={{ fontSize: '20px' }} />
            <SearchOutlined style={{ fontSize: '20px' }} />
          </Space>
        </div>
      )
    }
    return (
      <div
        className="p-4 flex justify-between items-center"
        style={{ background: '#1677ff', color: '#fff' }}
      >
        <span className="text-base">{title}</span>
        {userLogin}
      </div>
    )
  }
}
