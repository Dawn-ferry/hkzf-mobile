import React from 'react'
import NavHeader from 'common/NavHeader'
import styles from './index.module.scss'
import { getcurrent_city2 } from 'utils'
const BMap = window.BMap
class Map extends React.Component {
  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        {/* 设置地图的容器 */}
        <div id="container" ></div>
      </div>
    )
  }
  async  componentDidMount() {
    const city = await getcurrent_city2()
    // console.log(city);
    // 创建百度地图
    var map = new BMap.Map("container");
    // 创建地址解析器实例     
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野 
    /* 
    参数一：详细地址
    参数二:根据地址设置所在的点
    参数三：解析地址所在的城市
    */
    myGeo.getPoint(city.label, function (point) {
      if (point) {
        map.centerAndZoom(point, 11)
      }
    },
      city.label);

    // 创建百度地图
    // 如果想要访问全局变量，需要使用window.xxx
    // var map = new window.BMap.Map("container");
    // // 创建地图的中心点
    // var point = new window.BMap.Point(121.596, 31.041)
    // // 设置中心点和缩放级别
    // map.centerAndZoom(point, 11)
  }
}
export default Map