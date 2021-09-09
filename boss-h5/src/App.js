import Router from "./router"//引入router.js
import './App.css';
import React, { Component } from 'react'
import userStore from "./store";
import { setuserAction } from "./action";
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount () {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    if (user.length != 0)
    {
      const uaction = setuserAction(user)
      userStore.dispatch(uaction)
    }
  }
  render () {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
