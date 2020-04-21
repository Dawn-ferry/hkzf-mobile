import React from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile';
import axios from 'axios'
import { getcurrent_city, getcurrent_city2 } from 'utils'

// 导入样式
import 'react-virtualized/styles.css'
// 导入可视区域渲染文件
import { List, AutoSizer } from 'react-virtualized';
// 本地样式文件
import NavHeader from 'common/NavHeader'
import styles from './index.module.scss'
/* 
对城市数据处理的思路：
后台返回数据共92条数据
但无法对其进行渲染，数据结构与视图不对，需要特殊处理
视图需要的结构：
1，字母排序的行条   2，字母排序下的城市
[a,b,c,e......]           {  A:["安庆"],B:[北京，宝鸡].....}
解决


*/
// const list = Array.from(new Array(10000)).map(
//   (item, index) => `这是${index}`
// )
// 给出一个热门城市列表
const CITY_HEIGHT = 50
const TITLE_HEIGHT = 36
const Hot = ["北京", '上海', '广州', '深圳']
class City extends React.Component {
  state = {
    // 所有城市首字母
    cityArr: [],
    // 所有城市信息
    cityObj: {},
    // 当前城市下标
    currentIndex: 0
  }
  // 创建ref操作当前标签元素
  ListRef = React.createRef()

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
      // 通过promise死等数据 current_city 通过定位或者换成获取
      const current_city = await getcurrent_city2()

      // const current_city = JSON.parse(localStorage.getItem("current_city"))
      obj["#"] = [current_city]
      // console.log(obj, citykeys);
      this.setState({
        cityArr: citykeys,
        cityObj: obj
      }, () => {
        // 等dom更新完之后测量所有的行高
        this.ListRef.current.measureAllRows()

      })


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

  parseShort(short) {
    if (short === "#") {
      return '当前定位'
    } else if (short === "hot") {
      return '热门城市'
    } else {
      return short.toUpperCase()
    }

  }
  // 处理高度{一个标题是36px，一个城市是50px }
  // 声明这个函数，并且能获取到下标
  caclHeight({ index }) {
    // 获取标题
    const title = this.state.cityArr[index]
    const city = this.state.cityObj[title]
    return TITLE_HEIGHT + city.length * CITY_HEIGHT

  }
  selectedCity(item) {
    // console.log(item);
    // 判断是否为热门城市，只有热门城市有数据
    if (Hot.includes(item.label)) {
      localStorage.setItem('current_city', JSON.stringify(item))
      this.props.history.go(-1)
    } else {
      Toast.info('该城市没有房源', 1)
    }


  }

  // 可视区域需要渲染内容
  rowRenderer({ key, index, style }) {

    const short = this.state.cityArr[index]
    const citys = this.state.cityObj[short]
    return (
      <div key={key} style={style} className="city-item" >
        {/* 封装方法处理标题 */}
        <div className="title">{this.parseShort(short)}</div>
        {
          // 循环时都需要一个key
          citys.map((item) => (<div className="name" key={item.value}
            onClick={this.selectedCity.bind(this, item)}
          >{item.label}</div>))
        }

      </div >
    )
  }
  // 获取当前城市的下标
  onRowsRendered({ startIndex }) {
    /* 
    overscanStartIndex：不看见的起始下标是 ，但是可视区存在
    overscanStopIndex   不看见的结束下标是 ，但是可视区存在
    startIndex :开始的下标
    stopIndex：结束的下标
    */
    // console.log("ds", obj);
    this.setState({
      currentIndex: startIndex
    })
  }

  fn(index) {
    // console.log(index);
    // console.log(this.ListRef.current);

    this.ListRef.current.scrollToRow(index)
  }


  render() {
    return (<div className={styles.cityList}>
      {/* <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >热门城市</NavBar> */}
      <NavHeader>热门城市</NavHeader>

      <AutoSizer>
        {

          ({ height, width }) => (
            <List
              width={width}
              height={height}
              // 获取所有数据的数量
              rowCount={this.state.cityArr.length}
              // 渲染的内容
              rowRenderer={this.rowRenderer.bind(this)}
              // 动态计算高度
              rowHeight={this.caclHeight.bind(this)}
              // 获取当前城市的下标
              onRowsRendered={this.onRowsRendered.bind(this)}
              // 配置字母与选择下标对齐
              scrollToAlignment="start"
              ref={this.ListRef}
            />
          )}
      </AutoSizer>

      <ul className="city-index">

        {
          this.state.cityArr.map((item, index) => (
            <li className="city-index-item" key={item}>
              <span
                onClick={this.fn.bind(this, index)}
                className={index === (this.state.currentIndex) ? 'index-active' : ''}
              >{item === "hot" ? '热' : item.toUpperCase()}</span>
            </li>

          ))
        }
      </ul>


    </div>)
  }
}
export default City

