import React from 'react'
import { HashRouter as Router, Route, NavLink as Links } from 'react-router-dom'
class Error extends React.Component {
  render() {
    console.log(this.props);

    return (<div>
      404页面没找到可能正在开发，请转回<Links to="/home">首页</Links>
    </div>)
  }
}
export default Error