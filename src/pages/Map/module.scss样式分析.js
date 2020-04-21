import React from 'react'
import "./index.scss"
import NavHeader from 'common/NavHeader'
// import "./index.css"
// import styles from './index.module.css'
// import styles from "./index.module.scss"
import './index.sass'
class Map extends React.Component {

  render() {
    // 
    // console.log(styles);

    return (
      <div className="map">
        <div className="red">map红色</div>
        {/* <i className="Map_blue__1bUUN">map蓝色</i> <br />
        <i className={styles.blue}>map蓝色</i><br />
        <b className={styles.UserName} >这是驼峰命名的样式</b>
        <p className={styles["font-sizes"]}>方括号语法获取样式</p>
        <div className="iconfont icon-ind"></div> */}
      </div>
    )
  }
  // render() {
  //   return (
  //     <>
  //       <NavHeader>地图找房</NavHeader>
  //       <div className="map" id="map"></div>
  //     </>
  //   )
  // }
  // componentDidMount() {
  //   // 创建百度地图
  //   // 如果想要访问全局变量，需要使用window.xxx
  //   var map = new window.BMap.Map("map");
  //   // 设置地图的中心点
  //   var point = new window.BMap.Point(121.596, 31.041)
  //   map.centerAndZoom(point, 15)
  // }
}
export default Map