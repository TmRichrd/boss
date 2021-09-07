import React, { Component } from 'react'
import style from './login.module.css'
import LoginForm from './components/LoginForm/LoginForm.jsx'
class Login extends Component {
  handleClick = () => {
    this.inputRef.focus()
  }
  render() {
    return (
      <div className="container">
        <h3 className={style.logintitle}>456</h3>
        <LoginForm />
      </div>
    )
  }
}

export default Login