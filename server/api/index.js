const express = require('express')
const router = express.Router()
const crypto = require('crypto');



// 用户登录
router.post('/login', (req, res) => {
  let obj = {
    user_email: req.body.email,
    user_password: cryPwd(req.body.password)
  }
  User.find({
    obj,
    fn(err, row) {
      if (err) console.log(err);
      if (row.length <= 0) {
        res.send('fail');
      } else {
        res.send(row);
      }
    }
  })
});

// 密码加密
function cryPwd(password) {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}

module.exports = router
