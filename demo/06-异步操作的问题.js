/* 
封装带有异步函数尿性问题
因为异步操作需要时间，在异步函数中返回的值并不是当前函数值
那么如何获取当前函数的返回值呢
通过callback回调函数
在调用函数拿值时，多做一步操作传入回调函数
通过回调函数拿到异步操作函数的返回值

*/


// 封装一个方法，用于读取指定的文件，，并且获取改文件的读取结果。

// 如果封装是一个异步的函数，是不能直接通过返回值返回结果的。因为没有结果。
// 解决方式1: 封装该函数的时候，传入一个回调函数（回头再调用)
const fs = require('fs')
function read(name, callback) {
  fs.readFile(name, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      // 成功了，直接返回成功的数据
      callback(data)
    }
  })
}

// read('a.txt')
// 回调函数会在异步操作结束的时候执行
read('a.txt', function (data) {
  console.log(data)
})

read('b.txt', function (data) {
  console.log(data)
})
