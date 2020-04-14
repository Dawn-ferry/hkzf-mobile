import React from 'react'
import { HashRouter as Router, Route, NavLink as Links, Switch } from 'react-router-dom'
import Index from './Index/index'
import House from './House'
import News from './News'
import User from './User'
// 导入样式
import './index.scss'
class Home extends React.Component {
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
        <ul className="tabBar">
          <li>
            <Links exact to="/home">
              <span className="iconfont icon-ind"></span>
              <p>首页</p>
            </Links>
          </li>
          <li>
            <Links to="/home/house">
              <span className="iconfont icon-findHouse"></span>
              <p>找房</p>
            </Links>
          </li>
          <li>
            <Links to="/home/news">
              <span className="iconfont icon-infom"></span>
              <p>资讯</p>
            </Links>
          </li>
          <li>
            <Links to="/home/user">
              <span className="iconfont icon-my"></span>
              <p>个人中心</p>
            </Links>
          </li>
        </ul>


      </div>
    </Router>)
  }
}
export default Home