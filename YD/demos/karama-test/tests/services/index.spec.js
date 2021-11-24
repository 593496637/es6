const superagent = require('superagent')
// const app = require('./app')


// function request() {
//   return superagent(app.listen())
// }

describe('Node服务自动化测试脚本', function () {
  it('获取首页数据', function (done) {
    superagent
      .get('http://localhost:3000/api')
      .end(function (err, res) {
        if (res.body.data === 'Hello World') {
          done()
        } else { 
          done(new Error('❌首页接口数据返回异常'))
        }
      })
  })
})