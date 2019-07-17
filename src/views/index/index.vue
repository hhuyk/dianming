<template>
<div id="wrap">
  <div class="ui-datepicker-wrapper">
<!--    头部-->
    <div class="ui-datepicker-header">
      <a  class="ui-datepicker-btn ui-datepicker-btn-prev" >&lt;</a>
      <a  class="ui-datepicker-btn ui-datepicker-btn-next">&gt;</a>
      <span class="ui-datepicker-cur-month">年-月</span>
    </div>
<!--日期内容-->
    <div class="ui-datepicker-body">
      <table>
        <thead>
        <tr>
          <th ></th>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td >
            <span></span>
            <span  class="absent-day">有缺勤</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="mask"></div>
</div>
</template>
<script>
  import { getCaledarDay, checkAbsent } from '../../api/calendar';
  import { setCookie, getCookie, cookieLogin } from '../../api/user';
export default {
  name:'datepicker' ,
  data() {
    return {
      position :{
        top: '',
         let:''
      },
       monthData:'',//月份数据
      config:{
         week:['一', '二', '三', '四', '五', '六', '日']
      }
    }
},
  computed: {
    // 日期数组,用于渲染
    monthArr() {
      if (this.monthData.days) {
        let month = this.monthData.days.slice();
        let res = [];
        for (let i = 0; i < 5; i++) {
          let temp = [];
          while (month.length) {
            temp.push(month.shift());
            if (temp.length > 6) break;
          }
          res.push(temp);
          temp = null;
        };
        return res;
      }
    }
  },
  methods :{

  },
  created() {
    let token = getCookie('token');
    console.log(token)
    if (token === 'undefined') {
      this.$router.push('/login');
    }
  }

}
</script>
<style scoped>
  #wrap {
    overflow: hidden;
  }

  .linkUrl {
    display: inline-block;
    width: 100%;
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    display: none;
  }

  .mask-show {
    display: block;
  }

  .ui-datepicker-wrapper {
    font-size: 16px;
    color: #666;
    box-shadow: 2px 2px 8px 2px rgba(128, 128, 128, .3);
    height: 100%;
    width: 100%;
  }

  .ui-datepicker-wrapper .ui-datepicker-header {
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #086ed5;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    color: #fff;
  }

  .ui-datepicker-wrapper .ui-datepicker-header .ui-datepicker-btn {
    font-family: serif;
    font-size: 20px;
    width: 20px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    text-decoration-line: none;
  }

  .ui-datepicker-wrapper .ui-datepicker-header .ui-datepicker-btn:active {
    background-color: #f0f0f0;
  }

  .ui-datepicker-wrapper .ui-datepicker-header .ui-datepicker-btn-prev {
    float: left;
  }

  .ui-datepicker-wrapper .ui-datepicker-header .ui-datepicker-btn-next {
    float: right;
  }

  .ui-datepicker-wrapper .ui-datepicker-body table {
    width: 100%;
    border-collapse: collapse;
  }

  .ui-datepicker-wrapper .ui-datepicker-body table th,
  .ui-datepicker-wrapper .ui-datepicker-body table td {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
  }

  .ui-datepicker-wrapper .ui-datepicker-body table th {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }

  .ui-datepicker-wrapper .ui-datepicker-body table td {
    border: 1px solid #f0f0f0;
    font-size: 10px;
    width: 14%;
    height: 75px;
    line-height: 75px;
    cursor: pointer;
    position: relative;
  }

  .absent-day {
    position: absolute;
    left: 70%;
    top: 25%;
    height: 15px;
    line-height: 15px;
    width: 43px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    color: #f34b4b;
    border: 1px solid #f34b4b;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    font-size: 12px;
  }

  .today {
    position: absolute;
    left: 50%;
    top: 25%;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px solid #086ed5;
    transform: translate(-50%);
  }

  .nowDate {
    font-weight: bold;
    color: #ffffff;
    background-color: #086ed5 !important;
  }

  /* 电脑大屏幕：>= 1200px */
  @media screen and (min-width: 1200px) {
    .ui-datepicker-wrapper .ui-datepicker-body table td {
      font-size: 14px;
      height: 120px;
      line-height: 120px;
    }
  }

  /* 电脑中等屏幕：>= 992px */
  @media screen and (min-width: 992px) {
    .ui-datepicker-wrapper .ui-datepicker-body table td {
      font-size: 14px;
      height: 100px;
      line-height: 100px;
    }
    .absent-day {
      left: 65%;
      top: 25%;
    }
  }

  /* 平板电脑：>= 768px */
  @media screen and (min-width: 768px) {
    .ui-datepicker-wrapper .ui-datepicker-body table td {
      font-size: 14px;
      height: 80px;
      line-height: 80px;
    }
    .absent-day {
      left: 60%;
      top: 25%;
    }
  }


  /* 手机移动端：<= 767px */
  @media screen and (max-width: 767px) {
    .ui-datepicker-wrapper .ui-datepicker-body table td {
      font-size: 12px;
      height: 65px;
      line-height: 65px;
    }
    .absent-day {
      position: absolute;
      left: 50%;
      top: 20%;
      height: 50px;
      width: 50px;
      transform: translate(-50%);
      color: #f34b4b;
      line-height: 80px;
      border: none;
    }
    .today {
      height: 45px;
      color: #086ed5;
      width: 42px;
    }
  }

</style>
