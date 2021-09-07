import React, { Component } from 'react'
import Tabbars from '../../components/tabbar/tabbar.jsx'
import Position from '../position/position.jsx'
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Position history={this.props.history}/>
        <Tabbars history={this.props.history} />
      </div>
    )
  }
}
