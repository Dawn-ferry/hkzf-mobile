import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import axios from 'axios'
/* 
Carousel轮播【走马灯】组件
属性{
  autoplay：是否自动轮播
  infinite：是否循环播放
  autoplayInterval: 轮播图的切换间隔
  beforeChange 切换面板前的回调函数
  afterChange 切换面板后的回调函数
  
} 



WingBlank:两翼留白 ,属性size=>两翼留白的间距，可选sm,md,lg
*/
class Index extends React.Component {
  state = {
    // 组件的坑点，为组件能够自定轮播，手动设置数值

    data: ['1', '2', '3'],
    // 定高，轮播图没有数据之前是没有高的
    imgHeight: 176,
  }
  componentDidMount() {
    // 发送请求处
    setTimeout(() => {

      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                // 当图片加载完成,动态的设置轮播图的高度
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    )
  }

}
export default Index



