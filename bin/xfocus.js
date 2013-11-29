#! /usr/bin/env node

var argv = process.argv
var spawn = require('child_process').spawn


function orm() {
  var orm = spawn(process.cwd() + "/node_modules/.bin/sequelize", argv.slice(3))  
  orm.stdout.on('data', function(data) {
    console.log(String(data));
  })
  orm.stderr.on('data', function (data) {
    console.log('stderr: ' + String(data));
  })
}

function getRoute() {
  var routes = require('../routes')
  routes.getRoute()
}

function shell() {
  var repl = require("repl")
  var app = require('../app')
  repl.start({
    prompt: "xfocus> ",
    input: process.stdin,
    output: process.stdout
  }).context.app = app
}

function createTable() {
  console.log('初始化中...');
  require('../app')
  if (process.argv[3] == '-e') {
    console.log('强制模式, 数据会被清空');
    models.sequelize.sync({force: true}).complete(function(err) {
      if (err) throw err;
    })
  } else{
    models.sequelize.sync().complete(function(err) {
      if (err) throw err;
    })
  } 
}

// 同步model
function sync() {
  require('../app')
  if(argv[3] == '-e') {
    var tables = argv.slice(4)
    for (var i in tables) {
      var table = tables[i]
      models[table].sync({force: true}).complete(function(err) {
        if (err) throw err;
      })
    }
  } else {
    var tables = argv.slice(3)
    for (var i in tables) {
      var table = tables[i]
      models[table].sync().complete(function(err) {
        if (err) throw err;
      })
    }
  }
}

if (process.argv[2] == "orm") orm(); // 运行orm相关的命令
if (process.argv[2] == "r") getRoute(); // 获取路由表
if (process.argv[2] == 'c') shell(); // 进入交互模式
if (process.argv[2] == 'mig') createTable(); // 初始化表, 加上-e参数数据会别清空
if (argv[2] == 'sync') sync();