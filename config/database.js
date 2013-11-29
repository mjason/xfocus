var config = require('./config.json')
var environment = process.env.NODE_ENV || 'development'

var databaseConfig = config[environment]

var Sequelize = require('sequelize')
var sequelize = new Sequelize(databaseConfig.database, 
  databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    logging: false
  })

global.models = {
  Sequelize: Sequelize,
  sequelize: sequelize,
}

require("fs").readdirSync("./models").forEach(function(file) {
  if (file != 'associations.js') {
    file = file.split('.')[0]
    models[file] = sequelize.import(__dirname + '/../models/' + file)
  }
})

require('../models/associations')

// if (environment == 'development') {
//   console.log('同步数据库表');
//   sequelize.sync({force: true}).complete(function(err) {
//     if (err) {
//       throw err
//     }
//   })
// }