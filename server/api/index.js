const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const User = require('../../server/moule/user')


router.post('/cookieLogin',(req,res)=>{
  let obj = {
    user_email: req.body.token
  }
  console.log('-------------------------------');
  console.log(obj);
  User.find({ user_email: req.body.token },(err,docs)=>{
    if (err) console.log(err);
    else if(docs.length<= 0) {
      res.send('fail');
    }
    else if(docs.length==1){
      console.log('cookie登录成功')
      res.send(docs)
    }
  })
})
// 用户登录
router.post('/login', (req, res) => {
  // let obj = {
  //   user_email: req.body.email,
  //   user_password: cryPwd(req.body.password)
  // }
  User.find({user_email: req.body.email, user_password :req.body.password},
    (err, docs)=>{
      if (err) console.log(err);
      else if(docs.length<= 0) {
        res.send('fail');
      }
      else if(docs.length==1){
        console.log('查询成功')
        res.send(docs)
      }
      // if (row.length <= 0) {
      //
      // } else {
      //   res.send(row);
      // }
    }
  )
});
/**
 * 用户注册
 */
router.post('/register',(req,res)=>{
  User.find({ user_email:req.body.email },(err,docs)=>{
    if (err) console.log(err)
    else if (docs.length ===1){
      console.log('查询成功，邮箱存在')
      res.send('fail')
    }
    else {
      let newuser = new User({
        user_email :req.body.email,
        user_password :req.body.password
      })
      newuser.save((err,docs)=>{
        if (err) console.log(err)
        else{
          console.log('注册成功')
          res.send(docs)
        }
      })
    }
  })
})
// 密码加密
function cryPwd(password) {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}

module.exports = router
