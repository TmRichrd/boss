import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tabbars from '../../components/tabbar/tabbar'
export default class My extends Component {
  render() {
    return (
      <div>
        my
        <Link to={'/position-detail/2'}>去detail</Link>
        <Tabbars history={this.props.history}/>
      </div>
    )
  }
}
