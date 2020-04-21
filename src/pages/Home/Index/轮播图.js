import React from 'react'
import { Carousel } from 'antd-mobile';
import axios from 'axios'
/* 
两个bug问题：
1，是轮播图的自动播放
2.是轮播的高度，没有高度下面的内容会自动顶上去
3.左右滑动轮播图报错问题
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


*/
class Index extends React.Component {
  state = {
    data: [],
    // 不同屏幕的高度的处理 212 375  750 

    imgHeight: (212 / 357) * window.innerWidth,
  }
  componentDidMount() {
    // 该页面要发送很多请求
    this.getSwipers()
  }
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      console.log(body);
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
  render() {
    return (<div>
      <div className="Swiper" style={{ height: this.state.imgHeight }}> {this.renderSwipers()}</div>
      <div>121212</div>
    </div >)
  }
}
export default Index

