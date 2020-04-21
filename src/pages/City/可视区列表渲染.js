import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import axios from 'axios'
import { getcurrent_city, getcurrent_city2 } from 'utils'

// 导入样式
import 'react-virtualized/styles.css'
// 导入可视区域渲染文件
import { List, AutoSizer } from 'react-virtualized';
// 本地样式文件
import './index.scss'
/* 
对城市数据处理的思路：
后台返回数据共92条数据
但无法对其进行渲染，数据结构与视图不对，需要特殊处理
视图需要的结构：
1，字母排序的行条   2，字母排序下的城市
[a,b,c,e......]           {  A:["安庆"],B:[北京，宝鸡].....}
解决


*/
const list = Array.from(new Array(10000)).map(
  (item, index) => `${index}-假数据展示`
)

function rowRenderer({
  key,         // 唯一的key值
  index,       // 每一行的索引号
  isScrolling, // 是否在滚动中
  isVisible,   // 是否可见
  style        // 样式对象
}) {
  return (
    <div
      key={key}
      style={style}
    >
      {list[index]}
    </div>
  )
}


class City extends React.Component {


  state = {
    // citys: []
  }
  componentDidMount() {
    // 获取城市列表信息
    this.cityList()
  }


  async cityList() {
    const res = await axios.get("http://localhost:8080/area/city?level=1")
    // console.log(res);
    const { status, body } = res.data
    if (status === 200) {
      // 这样的数据还是存在问题
      // 缺少热门城市和当前定位城市
      const { obj, citykeys } = this.citys(body)
      // 热门城市可以通过请求
      const res2 = await axios.get('http://localhost:8080/area/hot')
      obj.hot = res2.data.body
      citykeys.unshift('hot')

      // 处理定位城市数据
      /* 
      如果清除缓存就出现问题
      解决:数据优先从缓存中读取，读不到在定位获得
      
      */

      citykeys.unshift("#")
      // console.log(getcurrent_city());
      // getcurrent_city((city) => {
      //   console.log(city);
      // })
      // 通过promise死等数据
      const current_city = await getcurrent_city2()

      // const current_city = JSON.parse(localStorage.getItem("current_city"))
      obj["#"] = [current_city]
      console.log(obj);

    }

  }
  // 对城市数据的处理
  citys(body) {
    // console.log(body);
    const obj = {}
    body.forEach((item) => {
      const short = item.short.slice(0, 1)
      // 如何obj存在该字母添加
      if (short in obj) {
        obj[short].push(item)
      } else {
        obj[short] = [item]
      }
    });
    const citykeys = Object.keys(obj).sort()
    // console.log(citykeys);
    return {
      obj,
      citykeys
    }



  }

  render() {
    return (<div className="cityList">
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >热门城市</NavBar>
      {/* 
      width可视区的宽
      height可视区的高
      rowCount总数据的条数
      rowHeight 每条数据的高度
      rowRenderer 需要渲染的内容
      */}
      {/* AutoSizer充满真个屏幕 */}
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={list.length}
            rowHeight={20}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>


    </div>)
  }
}
export default City

