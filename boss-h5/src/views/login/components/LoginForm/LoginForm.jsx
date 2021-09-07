import React, { Component, useState } from 'react'

import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
} from 'antd-mobile'
class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pickerVisible: false,
    }
  }

  render() {
    return (
      <div>
        <Form
          footer={
            <Button block type="submit" color="primary">
              提交
            </Button>
          }
        >
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '邮箱不能为空' }]}
          >
            <Input autoComplete="off" placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default LoginForm
