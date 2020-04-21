const fs = require('fs')
function read(name) {
  // Promise内部有三种状态pending   fulfilled rejected
  return new Promise(function (resolve, reject) {
    fs.readFile(name, 'utf8', (err, data) => {
      if (data) {
        // 调用了resolve改变了Promise从pending状态变成功fulfilled状态
        resolve(data)
      } else {
        // 调用了resolve改变了Promise从pending状态变失败rejected状态

        reject(err)
      }
    })
  })
}
// 普通形式
// read("a.txt")得要一个承诺 .then在使用这个承诺
read("a.txt").then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.log(err);
})
// 箭头函数形式
read("b.txt").then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
})
