const mongoose = require('./mongodb')
const user_schema = new mongoose.Schema({
  user_name: { // 用户名
    type: String,
    required: true
  },
  user_email: { // 邮箱
    type: String,
    required: true
  },
  user_password: { // 密码
    type: String,
    required: true
  },
  user_deparment: { // 所属院系
    type: String,
    required: true
  },
  user_position: { // 职称
    type: String,
    required: true
  }
})
const user_model = mongoose.model('user',user_schema)

class User {
  Insert() {

  }

  find() {

  }



}


module.exports =  new User()
