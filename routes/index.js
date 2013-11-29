var app = null

// 初始化路由器
exports.init = function(_app) {
  app = _app
  importRoute()
}

// 获取路由表
exports.getRoute = function() {
  app = require('../app')
  importRoute()
  console.log(app.routes)
}

// 自动导入路由表
function importRoute() {
  require("fs").readdirSync("./routes").forEach(function(file) {
    if (file != 'index.js') {
      file = file.split('.')[0]
      appendRoute(file)
    }
  })
}

// 导入路由
function appendRoute(file) {
  require('./' + file)(app)
}