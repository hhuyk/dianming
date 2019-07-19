<template>
  <div>
<!-- method="POST"  -->
    <form  id="form"   @submit.prevent="send_login">
      <div class="title">
        登录
        <router-link to="register" id="login">注册<i class="fa fa-angle-right" aria-hidden="true"></i></router-link>
      </div>
      <div class="form-group">
        <div class="group-title">
          <label for="email">登录邮箱</label>
        </div>
        <input type="text" id="email" required v-model.trim=" user.email ">
      </div>
      <div class="form-group">
        <div class="group-title">
          <label for="password">密码</label>
        </div>
<!--v-model.trim 自动过滤首尾空格-->
        <input type="password" id="password" required v-model.trim=" user.password ">
      </div>
      <button >登录</button>
    </form>
    <msgBox :config="config" @closeBox=" closeBox "></msgBox>
  </div>
</template>
<script>
  //mixins定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改
  import mixin_msgBox from '../mixin/msgBox';
   import sendLogin from '../api/login'
  import {setCookie} from "../api/user";

  export default {
    name:'login',
    data(){
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    mixins:[mixin_msgBox],
    methods :{
      send_login(){
        console.log(this.user)
        sendLogin(this.user).then((res)=>{
          if(res.data== 'fail'){
            //这里使用 混入的方法，可以直接调用
            this.changeCfg('检查邮箱密码是否错误','登录失败')
          }else{
            console.log(res)
            //设置cookie为 name:token  值是响应的数据的邮箱
            setCookie({ name: 'token', val: res.data[0].user_email });
            //设置 store 将调用 user 的mutation 将res 直接传入，这样就可以 通过 this.$store.state拿到 user 信息了
            this.$store.commit('SET_CURUSER', res.data[0]);
            this.$router.push('/');
          }
        })
          .catch((err)=>{
            throw err

          })
      }

    }
  }
</script>
<style lang="scss" scoped>
  #form {
    padding-bottom: 20px;
    .title {
      font-size: 22px;
      color: #fff;
      padding: 20px;
      background-color: #086ed5;
      a {
        color: #fff;
        float: right;
        i {
          margin-left: 5px;
        }
      }
    }
    .form-group {
      background-color: #fff;
      padding: 0 20px;
      .group-title {
        color: #000;
        padding-top: 10px;
        padding-bottom: 5px;
      }
      input {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
        outline: none;
        width: 100%;
        height: 30px;
        border: none;
        border-bottom: 1px solid #ccc;
      }
      select {
        width: 100%;
        height: 30px;
        border: none;
        border-bottom: 1px solid #ccc;
        appearance: none;
      }
    }
    button {
      margin-top: 10px;
      width: 100%;
      height: 35px;
      line-height: 35px;
      background-color: #086ed5;
      border: none;
      color: #fff;
      font-size: 18px;
    }
  }

</style>
