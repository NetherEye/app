var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TOKENAPI:'"http://172.16.4.248:8888"',
  LOCALTOKEN:false
})
