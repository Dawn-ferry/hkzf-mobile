import React from 'react'
import { HashRouter as Router, Route, Link as Links, Switch } from 'react-router-dom'
import { Carousel, Flex, Grid } from 'antd-mobile';
import axios from 'axios'
// 导入图片
import nav1 from 'assets/images/nav-1.png'
import nav2 from 'assets/images/nav-2.png'
import nav3 from 'assets/images/nav-3.png'
import nav4 from 'assets/images/nav-4.png'
import './index.scss'
/* 
两个bug问题：
1，是轮播图的自动播放
2.是轮播的高度，没有高度下面的内容会自动顶上去
3.左右滑动轮播图报错问题
4.导航路径的优化
解决:
1，
高度问题,在轮播图外面包一层盒子给这个盒子定死高
2，
自动播放，存放数据的数组必须有数据，在没有发送请求之前是没有数据的
解决在渲染中判断数组中是否有数据，没有数据return null ,有数据才渲染
3.
* {
    touch-action: pan-y;
}
4.
配置jsconfig.json文件，设置基础路径为绝对路径
配置好重启  


*/
class Index extends React.Component {
  state = {
    data: [],
    // 不同屏幕的高度的处理 212 375  750 
    imgHeight: (212 / 357) * window.innerWidth,
    list: [
      { title: '整租', path: '/home/house', img: nav1 },
      { title: '合租', path: '/home/house', img: nav2 },
      { title: '地图找房', path: '/map', img: nav3 },
      { title: '去出租', path: '/rent', img: nav4 },
    ],
    groupList: [],
    // 当前城市的信息
    city: {
      label: '北京',
      value: '',
    },

  }
  componentDidMount() {
    // 该页面要发送很多请求
    this.getSwipers()
    this.getGroups()

  }
  // 获取轮播图信息
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      // console.log(body);
      this.setState({
        data: body
      })
    }
    // 设置定时器视为了高度的效果
    // setTimeout(async () => {
    //   const res = await axios.get('http://localhost:8080/home/swiper')
    //   const { status, body } = res.data
    //   if (status === 200) {
    //     console.log(body);
    //     this.setState({
    //       data: body
    //     })
    //   }
    // }, 1000)
  }
  // 获取房组信息
  async getGroups() {
    const res = await axios.get("http://localhost:8080/home/groups")
    console.log(res);

  }

  renderSwipers() {
    return (
      <Carousel
        autoplay={true}
        infinite
      >
        {this.state.data.map((val) => (

          < a
            key={val.id}
            href="http://www.baidu.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`http://localhost:8080` + val.imgSrc}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  renderNav() {
    return (
      <Flex>
        {
          this.state.list.map((item) => (
            <Flex.Item key={item.title}>
              <Links to={item.path}>
                <img src={item.img} alt="" />
                <p>{item.title}</p>
              </Links>
            </Flex.Item>
          ))
        }

      </Flex>
    )
  }
  renderGroups() {
    return (
      <div className="group">
        <h3 className="group-title">租房小组
        <span className="more">更多</span>
        </h3>
        {/* 九宫格组件 */}
        <Grid data={data} columnNum={3} />
      </div>
    )
  }
  render() {
    return (<div className='index'>
      {/* 轮播部分 */}
      <div className="Swiper" style={{ height: this.state.imgHeight }}> {this.renderSwipers()}</div>
      {/* 导航部分 */}
      <div className="nav">
        {this.renderNav()}
      </div>
      {/* 房租信息 */}
      <div className="Groups">
        {this.renderGroups()}
      </div>

    </div >)
  }
}
export default Index

