import React, { Component } from 'react'
import style from './login.module.css'
import LoginForm from './components/LoginForm/LoginForm.jsx'
class Login extends Component {
  handleClick = () => {
    this.inputRef.focus()
  }
  render() {
    return (
      <div className="container" style={{ background: '#f1f1f1' }}>
        <h3 className={style.logintitle}>网站标题</h3>
        <LoginForm />
      </div>
    )
  }
}

export default Login
