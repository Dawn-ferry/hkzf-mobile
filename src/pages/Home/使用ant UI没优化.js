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
    console.log(this.props.location.pathname);

    this.state = {
      // 选中的图标
      selectedTab: this.props.location.pathname,
    };
  }
  render() {
    return (<Router>
      <div className='home'>
        <h1> 这是home组价</h1>
        <Switch>
          <Route exact path="/home" component={Index}></Route>
          <Route path='/home/house' component={House}></Route>
          <Route path='/home/news' component={News}></Route>
          <Route path='/home/user' component={User}></Route>
        </Switch>
        {/* TabBar组件 */}
        <div className="tabBar">
          <TabBar
            // 全局tabbar组件未选中的字体的颜色
            unselectedTintColor="#43CD80"
            // 全局tabbar组件选中的字体的颜色
            tintColor="#FF6A6A"
            // 全局tabbar组件背景色
            barTintColor="#ddd"
          >
            <TabBar.Item
              // 标题
              title="首页"
              key="首页"
              // 未选中图标的样式
              icon={<span className="iconfont icon-findHouse"></span>}
              // 选中图标的样式
              selectedIcon={<span className="iconfont  icon-findHouse"></span>}
              // 图标即字体选中的起的名字
              selected={this.state.selectedTab === '/home'}
              // 选中的逻辑
              onPress={() => {
                this.setState({
                  selectedTab: '/home',
                });
                // 使用编程式导航跳转路由
                this.props.history.push('/home')
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              // 标题
              title="找房"
              key="找房"
              // 未选中图标的样式
              icon={<span className="iconfont  icon-infom"></span>}
              // 选中图标的样式
              selectedIcon={<span className="iconfont  icon-infom"></span>}
              // 图标即字体选中的起的名字
              selected={this.state.selectedTab === '/home/house'}
              // 选中的逻辑
              onPress={() => {
                this.setState({
                  selectedTab: '/home/house',
                });
                // 使用编程式导航跳转路由
                this.props.history.push('/home/house')
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              // 标题
              title="资讯"
              key="资讯"
              // 未选中图标的样式
              icon={<span className="iconfont icon-ind"></span>}
              // 选中图标的样式
              selectedIcon={<span className="iconfont icon-ind"></span>}
              // 图标即字体选中的起的名字
              selected={this.state.selectedTab === '/home/news'}
              // 选中的逻辑
              onPress={() => {
                this.setState({
                  selectedTab: '/home/news',
                });
                // 使用编程式导航跳转路由
                this.props.history.push('/home/news')
              }}
            >
            </TabBar.Item>
            <TabBar.Item
              // 标题
              title="个人中心"
              key="个人中心"
              // 未选中图标的样式
              icon={<span className="iconfont icon-my"></span>}
              // 选中图标的样式
              selectedIcon={<span className="iconfont icon-my"></span>}
              // 图标即字体选中的起的名字
              selected={this.state.selectedTab === '/home/user'}
              // 选中的逻辑
              onPress={() => {
                this.setState({
                  selectedTab: '/home/user',
                });
                // 使用编程式导航跳转路由
                this.props.history.push('/home/user')
              }}
            >
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    </Router >)
  }
}
export default Home