import React, { Component } from 'react'
export default class PositionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    let id = this.props.match.params.id
    console.log(id)
  }
  render() {
    return <div>detail</div>
  }
}
