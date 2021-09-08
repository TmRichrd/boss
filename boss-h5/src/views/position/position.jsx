import React, { Component } from 'react'
import HomeHeader from './components/home-header'
import './position.modules.css'
export default class Position extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'web前端',
    }
  }
  componentDidMount() {}
  render() {
    return (
      <div className="">
        <HomeHeader title={this.state.title} history={this.props.history} />
      </div>
    )
  }
}
