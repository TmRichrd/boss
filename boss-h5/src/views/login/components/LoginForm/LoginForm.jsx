import React from 'react'

import { Form, Input, Button,Toast } from 'antd-mobile'
import { getEmailCode, login } from '../../../../api/commit'

export default () => {
  const [form] = Form.useForm()
  const onSubmit = async () => {
    const values = form.getFieldsValue()
    console.log(values)
    if (values.email && values.code) {
      const res = await login(values)
      if (res.data.code == 200) {
        Toast.show(res.data.message)
      }else{
        Toast.show(res.data.message)
      }
    }
  }
  const sendEmail = async () => {
    const values = form.getFieldsValue()
    if (!values.email) return false
    const res = await getEmailCode(values.email)
    console.log('🚀 ~ file: LoginForm.jsx ~ line 15 ~ sendEmail ~ res', res)
  }
  const validatoreEmail = (rule, value, callcack) => {
    const emailExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (!value || !emailExp.test(value)) {
      callcack(new Error('请输入正确的邮箱地址'))
    } else {
      callcack()
    }
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
          rules={[{ required: true, validator: validatoreEmail }]}
        >
          <Input autoComplete="off" placeholder="请输入邮箱" />
        </Form.Item>
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
            获取验证码
          </div>
        </div>
      </Form>
    </div>
  )
}
