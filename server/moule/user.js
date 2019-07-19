const mongoose = require('./mongodb')
const user_schema = new mongoose.Schema({
  // user_name: { // 用户名
  //   type: String,
  //   required: true
  // },
  user_email:String,
  // user_email: { // 邮箱
  //   type: String,
  //   // required: true
  // },
  user_password:String
  // user_password: { // 密码
  //   type: String,
  //   // required: true
  // },
  // user_deparment: { // 所属院系
  //   type: String,
  //   required: true
  // },
  // user_position: { // 职称
  //   type: String,
  //   required: true
  // }
},
  //如果是已经存在的表，这里要指定表名称，不然官方会默认加上s
  {
    collection: 'user'
  }
  )
const User =module.exports = mongoose.model('user',user_schema)



// class User {
//   Insert() {
//
//   }
//
//   find(mixin) {
//     user_model.find(mixin.obj,(err,row)=>{
//       if(err) throw err
//       else return row
//       // if(err) return mixin.fn(err);
//       // mixin.fn(null,row);
//     } )
//   }
// }
//
//
// module.exports =  new User()
