import React, { Component } from 'react'
import { LeftOutlined } from '@ant-design/icons'
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  navback = () => {
    this.props.history.goBack()
  }
  render() {
    const { title } = this.props || '标题'
    return (
      <div
        className="h-10 px-2 relative text-center leading-10"
        style={{ width: '100%', background: '#1677ff', color: '#fff' }}
      >
        <div className="absolute left-2" onClick={this.navback}>
          <LeftOutlined style={{ fontSize: '17px' }} />
        </div>
        <div className="text-center text-base leading-10">{title}</div>
      </div>
    )
  }
}

export default Navbar
