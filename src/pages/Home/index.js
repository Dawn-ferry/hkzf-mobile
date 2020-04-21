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
      tabs: [
        { name: '首页', path: '/home', icon: 'icon-ind' },
        { name: '找房', path: '/home/house', icon: 'icon-findHouse' },
        { name: '资讯', path: '/home/news', icon: ' icon-infom' },
        { name: '个人中心', path: '/home/user', icon: 'icon-my' },
      ]
    };
  }
  render() {
    return (<Router>
      <div className='home'>
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
            {
              this.state.tabs.map((item) => (
                <TabBar.Item
                  // 标题
                  title={item.name}
                  key={item.name}
                  // 未选中图标的样式
                  icon={<span className={`iconfont ${item.icon}`}></span>}
                  // 选中图标的样式
                  selectedIcon={<span className={`iconfont ${item.icon}`}></span>}
                  // 图标即字体选中的起的名字
                  selected={this.state.selectedTab === item.path}
                  // 选中的逻辑
                  onPress={() => {
                    this.setState({
                      selectedTab: item.path,
                    });
                    // 使用编程式导航跳转路由
                    this.props.history.push(item.path)
                  }}
                >
                </TabBar.Item>
              ))
            }

          </TabBar>
        </div>
      </div>
    </Router >)
  }
}
export default Home