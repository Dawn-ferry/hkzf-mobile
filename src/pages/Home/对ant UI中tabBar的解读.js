import React from 'react'
import { HashRouter as Router, Route, NavLink as Links, Switch } from 'react-router-dom'
import Index from './Index/index'
import House from './House'
import News from './News'
import User from './User'
// 导入样式
import './index.scss'
import { TabBar } from 'antd-mobile'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 选择的图标
      selectedTab: 'blueTab',
      // 是否隐藏tabbar
      hidden: true,
      // 是否全屏
      fullScreen: true,
    };
  }
  // 展现内容区域
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }
  render() {
    return (<Router>
      <div className='home'>
        <h1>  这是home组价</h1>
        <Switch>
          <Route exact path="/home" component={Index}></Route>
          <Route path='/home/house' component={House}></Route>
          <Route path='/home/news' component={News}></Route>
          <Route path='/home/user' component={User}></Route>
        </Switch>
        <hr />
        {/* 全屏样式 */}
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
          {/* TabBar组件 */}
          <TabBar
            // 全局tabbar组件未选中的字体的颜色
            unselectedTintColor="red"
            // 全局tabbar组件选中的字体的颜色
            tintColor="green"
            // 全局tabbar组件背景色
            barTintColor="pink"
            // 是否隐藏tabbar的传值
            hidden={this.state.hidden}
          >
            <TabBar.Item
              // 标题
              title="Life"
              key="Life"
              // 未选中图标的样式
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
              }}
              />
              }
              // 选中图标的样式
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
              }}
              />
              }
              // 图标即字体选中的起的名字
              selected={this.state.selectedTab === 'blueTab'}
              // 徽章
              badge={5}

              // 选中的逻辑
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}
              data-seed="logId"
            >
              {/* 将内容渲染到组件 */}
              {this.renderContent('Life1')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="Koubei"
              key="Koubei"
              badge={'new'}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                }}
                />
              }
              title="Friend"
              key="Friend"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
              selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
              title="My"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>


      </div>
    </Router>)
  }
}
export default Home