import React, { useState } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { getEmailCode, login } from '../../../../api/commit'
import { useHistory } from 'react-router-dom'
import userStore from '../../../../store'
import { setuserAction } from '../../../../action'
export default () => {
  const [form] = Form.useForm()
  const [ispwd, setispwd] = useState(false)
  const [issend, setissend] = useState(true)
  const [codeText, setcodeText] = useState('发送验证码')
  const history = useHistory()
  const sendEmail = async () => {
    const values = form.getFieldsValue()
    if (!values.email) {
      return Toast.show('请输入邮箱!')
    } else {
      if (!issend) return false
      const res = await getEmailCode(values.email)
      console.log(res.data.code, 'code')
      if (res.data.code === 200) {
        let time = 60
        let timeIntver = null
        timeIntver = setInterval(() => {
          time -= 1
          if (time <= 1) {
            clearInterval(timeIntver)
            setcodeText('发送验证码')
            setissend(true)
          } else {
            setcodeText(time)
          }
        }, 1000)
        setissend(false)
        Toast.show('发送成功')
      } else {
        Toast.show(res.data.message)
      }
    }
  }

  const onSubmit = async () => {
    const values = form.getFieldsValue()
    if (values.email && values.code) {
      const res = await login(values)
      if (res.data.code === 200) {
        setissend(true)
        setcodeText('发送验证码')
        localStorage.setItem('user', JSON.stringify(res.data.data))
        localStorage.setItem('token', res.data.token)
        Toast.show(res.data.message)
        history.push('/')
        const userAction = setuserAction(res.data.data)
        userStore.dispatch(userAction)
      } else {
        Toast.show(res.data.message)
      }
    }
  }

  const validatorEmail = (rule, value, callcack) => {
    const emailExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (!value || !emailExp.test(value))
      return callcack(new Error('请输入正确的邮箱地址'))
    callcack()
  }

  let changePwd = ``
  let pwdlogin = ``

  if (ispwd) {
    changePwd = (
      <div
        style={{ textAlign: 'center', marginTop: '20px', color: '#1677ff' }}
        onClick={() => setispwd(false)}
      >
        使用邮箱登录
      </div>
    )
  } else {
    changePwd = (
      <div
        style={{ textAlign: 'center', marginTop: '20px', color: '#1677ff' }}
        className="changeText"
        onClick={() => setispwd(true)}
      >
        使用密码登录
      </div>
    )
  }
  if (ispwd) {
    pwdlogin = (
      <Form.Item
        name="password"
        label="密码"
        value="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input autoComplete="off" type="password" placeholder="请输入密码" />
      </Form.Item>
    )
  } else {
    pwdlogin = (
      <div style={{ position: 'relative' }}>
        <Form.Item
          name="code"
          label="验证码"
          value="code"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Input
            autoComplete="off"
            placeholder="请输入验证码"
            style={{ paddingRight: '80px' }}
          />
        </Form.Item>
        <div
          onClick={sendEmail}
          style={{
            color: '#1677ff',
            fontSize: '14px',
            position: 'absolute',
            bottom: '16px',
            right: '10px',
            width: 'auto',
          }}
        >
          <span style={!issend ? { color: '#aaa' } : {}}>{codeText}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Form
        form={form}
        footer={
          <Button block type="submit" onClick={onSubmit} color="primary">
            提交
          </Button>
        }
      >
        <Form.Item
          name="email"
          label="邮箱"
          value="email"
          rules={[{ required: true, validator: validatorEmail }]}
        >
          <Input autoComplete="off" placeholder="请输入邮箱" />
        </Form.Item>
        {pwdlogin}
        {/* <div style={{ position: 'relative' }}>
          <Form.Item
            name="code"
            label="验证码"
            value="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              autoComplete="off"
              placeholder="请输入验证码"
              style={{ paddingRight: '80px' }}
            />
          </Form.Item>
          <div
            onClick={sendEmail}
            style={{
              color: '#1677ff',
              fontSize: '14px',
              position: 'absolute',
              bottom: '16px',
              right: '10px',
              width: 'auto',
            }}
          ></div>
        </div> */}
      </Form>
      {changePwd}
    </div>
  )
}
