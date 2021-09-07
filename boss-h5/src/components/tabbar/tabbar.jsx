import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import {
  HomeOutlined,
  MessageOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
export default class Tabbars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: true,
      keys: '/',
    }
  }

  componentDidMount() {
    const tabArr = ['home', 'my', 'message', 'todo']
    let uri = this.props.history.location.pathname.replace(/\//g, '')
    tabArr.includes(uri)
      ? this.setState({ keys: uri })
      : this.setState({ keys: '/' })
  }
  changeTabbar = (activeKey) => {
    this.props.history.push(activeKey)
    this.setState({
      keys: activeKey,
    })
  }
  render() {
    const tabs = [
      {
        key: '/',
        title: '首页',
        icon: <HomeOutlined twoToneColor="#eb2f96"/>,
      },
      {
        key: 'todo',
        title: '我的待办',
        icon: <UnorderedListOutlined />,
      },
      {
        key: 'message',
        title: '我的消息',
        icon: <MessageOutlined />,
      },
      {
        key: 'my',
        title:"我的",
        icon: <UserOutlined />,
      },
    ]

    return (
      <div
        style={
          this.state.fullScreen
            ? { position: 'fixed', height: 'auto', width: '100%', bottom: 0 }
            : { height: 'auto' }
        }
      >
        {/* 5.0.0 antd-mobile tabbar 写法 */}
        <TabBar onChange={this.changeTabbar} activeKey={this.state.keys}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon}/>
          ))}
        </TabBar>

        {/* 2.3.4 antd-mobile tabbar 写法 */}

        {/* <TabBar
          unselectedTintColor="#949494"
          tintColor="#5bd4c7"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="职位"
            key="Life"
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selected={this.state.selectedTab === 'blueTab'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              })
            }}
            data-seed="logId"
          >
            <Position history={this.props.history}/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="有了"
            key="Koubei"
            // badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              })
            }}
            data-seed="logId1"
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="消息"
            key="Friend"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              })
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={{
              uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
            }}
            selectedIcon={{
              uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
            }}
            title="我的"
            key="my"
            dot
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              })
            }}
          >
            <My />
          </TabBar.Item>
        </TabBar> */}
      </div>
    )
  }
}
