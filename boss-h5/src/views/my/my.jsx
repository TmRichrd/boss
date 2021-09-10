import React, { Component } from 'react'
import Tabbars from '../../components/tabbar/tabbar'
import userStore from '../../store'
import style from './my.module.css'
import { SettingOutlined, EditOutlined } from '@ant-design/icons'
import { Image, Grid } from 'antd-mobile'
export default class My extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = null
  }
  componentDidMount() {
    this.unsubscribe = userStore.subscribe(() => {
      this.setState({})
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  editResume = () => {
    this.props.history.push('/resume')
  }
  render() {
    return (
      <div>
        <div className={style.header}>
          <div className={style.headeicon}>
            <SettingOutlined style={{ fontSize: '22px' }} />
          </div>
          <div className={style.userInfo}>
            <div className={style.names}>
              <p className={style.name}>{userStore.getState().user.name}</p>
              <p className="flex items-center mt-1" onClick={this.editResume}>
                <EditOutlined
                  style={{ fontSize: '16px', marginRight: '5px' }}
                />
                我的在线简历
              </p>
            </div>
            <div className={style.headimg}>
              <Image
                src={userStore.getState().user.headImg}
                width={80}
                height={80}
                fit="cover"
                style={{ borderRadius: 40 }}
              />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Grid gap={8} columns={4}>
              <Grid.Item>
                <div className={style.griditem}>
                  <p>132</p>
                  <p className={style.gridlabel}>沟通过</p>
                </div>
              </Grid.Item>
              <Grid.Item>
                <div className={style.griditem}>
                  <p>10</p>
                  <p className={style.gridlabel}>面试</p>
                </div>
              </Grid.Item>
              <Grid.Item>
                <div className={style.griditem}>
                  <p>245</p>
                  <p className={style.gridlabel}>已投简历</p>
                </div>
              </Grid.Item>
              <Grid.Item>
                <div className={style.griditem}>
                  <p>193</p>
                  <p className={style.gridlabel}>收藏</p>
                </div>
              </Grid.Item>
            </Grid>
          </div>
        </div>
        <Tabbars history={this.props.history} />
      </div>
    )
  }
}
