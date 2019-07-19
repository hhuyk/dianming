require('babel-polyfill')
require('babel-register')
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const api = require('./server/api')
app.use(bodyParser.json())
//这一行代码必须添加，否则接收不到数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')())
app.use('/api',api)

app.listen(port,()=>{
  console.log('running' + port)
} )
