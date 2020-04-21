
import axios from "axios"
// 基于回调函数解决异步操作拿值问题
export function getcurrent_city(callback) {
  // console.log('获取当前城市'); 
  const current_city = JSON.parse(localStorage.getItem("current_city"))
  if (current_city) {
    callback(current_city)
    // return current_city
  } else {
    console.log("通过定位获取")
    // 获取城市信息
    var myCity = new window.BMap.LocalCity();
    myCity.get(async (result) => {
      const res = await axios.get("http://localhost:8080/area/info", {
        name: result.name
      })
      console.log(res);
      const { status, body } = res.data
      if (status === 200) {
        localStorage.setItem("current_city", JSON.stringify(body))
        // return body
        callback(body)

      }

    })


  }
}
// 基于promise解决异步操作拿值问题
export function getcurrent_city2() {
  return new Promise((resolve, reject) => {

    const current_city = JSON.parse(localStorage.getItem("current_city"))
    if (current_city) {
      resolve(current_city)
      // callback(current_city)
      // return current_city
    } else {
      console.log("通过定位获取")
      // 获取城市信息
      var myCity = new window.BMap.LocalCity();
      myCity.get(async (result) => {
        const res = await axios.get("http://localhost:8080/area/info", {
          name: result.name
          // 因为发送请求有两种可能，所以使用.then 或者catch
        }).then((res) => {
          const { status, body } = res.data
          if (status === 200) {
            localStorage.setItem("current_city", JSON.stringify(body))
            // return body
            // callback(body)
            resolve(body)
          }
        }).catch((err) => {
          reject(err)
        })

      })

    }
  })
}