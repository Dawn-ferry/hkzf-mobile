import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './index.scss'
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
/* 
问题 
一:无法获取当前路由的信息 （只有通过Route组件渲染出来的组件才能通过this.props获取到路由信息，即history,match,location三个对象）原因:没有路由包裹

二:样式问题，因为单页的开发的原因会使样式覆盖的问题

解决
withRouter的作用：把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
二：


*/
class NavHeader extends React.Component {
  // 校验插槽的传入的值
  static propTypes = {
    children: PropTypes.string.isRequired
  }
  render() {
    // console.log('dd', this.props);
    return (<div className="NavHeader">
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
        rightContent={[
          <Icon key="1" type="ellipsis" />,
        ]}
      >{this.props.children}</NavBar>
    </div>)
  }
}
export default withRouter(NavHeader)