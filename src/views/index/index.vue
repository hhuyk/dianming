<template>
<div id="wrap">
  <div class="ui-datepicker-wrapper">
<!--    头部-->
    <div class="ui-datepicker-header">
<!--     @click.stop阻止事件冒泡  -->
      <a class="ui-datepicker-btn ui-datepicker-btn-prev" @click.stop="rende('prev')" >&lt;</a>
      <a class="ui-datepicker-btn ui-datepicker-btn-next" @click.stop="rende('next')">&gt;</a>
      <span class="ui-datepicker-cur-month">{{ monthData.year }}年-{{ monthData.month }}月</span>
    </div>
<!--日期内容-->
    <div class="ui-datepicker-body">
      <table>
        <thead>
        <tr>
          <th v-for=" (week,w_index) in config.week " v-text=" week " :key=" w_index "></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for=" (row,r_index) in monthArr" :key=" r_index ">
          <td v-for=" (item,i_index) in row " :key=" i_index " @click=" changeUrl(`${item.year}-${item.month}-${item.showDate}`) "
              :class="{ nowDate: getToday(item.year,item.month,item.showDate)}">
            <span> {{ item.showDate }}</span>
            <span v-if=" item.flag > 0 " class="absent-day">有缺勤</span>
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
      },
      absentArr: []
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
  created() {
    let token = getCookie('token');
    console.log(token)
    if (token === null) {
      this.$router.push('/login');
    }
    else {
      let email =this.$store.state.user.user.user_email
      console.log(email)
      if(email===''||email ===null||email===undefined){
        console.log('开始设置store')
        this.$store.dispatch('SET_USER',token)
          .then(()=>{
            console.log('使用cookie登录的'+this.$store.state.user.user.user_email)

            this.init();
            this.set_absentDay();
          })
      }
    else{
        this.init();
        this.set_absentDay();
      }

    }
  },
  methods :{
    changeUrl(date){
      if (date.indexOf('null') > 0 || !(date)) {
        return;
      };
      let dataDate = new Date(date)
      let today = new Date();
      //这样使得日期时间一样
      let todaytTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // 点击的日期是今天
      if (dataDate.getTime() === todaytTime.getTime()) {
        this.$router.push('/options');
      } else {
        // 点击的日期不是今天
        this.$router.push('select_cls');
      }
      this.$store.commit('SET_CURDATE', date);


    },
    rende (direction){
      let year, month;
      let _self = this;

      if (this.monthData) {
        year = this.monthData.year;
        month = this.monthData.month;
      }

      if (direction === 'prev') month--;
      if (direction === 'next') month++;

      if (month == 0) {
        year--;
        month = 12;
      };
      this.monthData = this.getMonthDate(year, month);
      this.set_absentDay();
      return


    },
    getMonthDate(year, month){
      if (!year || !month) {
        var today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      };

      let ret = []; // 存储当前月份的日期

      let firstDay = new Date(year, month - 1, 1); // 当月的第一天
      let firstDayWeekDay = firstDay.getDay(); // 当月第一天的周天数
      if (firstDayWeekDay === 0) firstDayWeekDay = 7;

      year = firstDay.getFullYear();
      month = firstDay.getMonth() + 1;

      // 上月的最后一天
      let lastDayOfLastMonth = new Date(year, month - 1, 0);
      // 上月的最后一天是几号
      let lastDateOfLastMonth = lastDayOfLastMonth.getDate();

      let preMonthDayCount = firstDayWeekDay - 1; // 显示几天上个月的天数

      let lastDay = new Date(year, month, 0); // 当月最后一天
      let lastDate = lastDay.getDate(); // 当月最后一天是几号

      for (var i = 0; i < 7 * 6; i++) {
        let date = i + 1 - preMonthDayCount;
        let showDate = date; // 显示的日期
        let thisMonth = month; // 显示的日期的月份
        let thisYear = year; // 显示的日期的年份

        if (date <= 0 || date > lastDate) {
          // 上个月的数据
          thisMonth = null;
          showDate = null;
        }

        if (thisMonth == 0) {
          thisMonth = 12;
          thisYear--;
        }
        if (thisMonth == 13) {
          thisMonth = 1;
          thisYear++;
        }

        // 添加日期
        ret.push({
          month: thisMonth,
          date: date,
          showDate: showDate,
          year: thisYear
        });
      }

      // 返回数据
      return {
        year: year,
        month: month,
        days: ret
      };
    },
    init(){
      this.monthData = this.getMonthDate();
    },
    set_absentDay() {
      const email = this.$store.state.user.user.user_email;
      getCaledarDay({ year: this.monthData.year, month: this.monthData.month, email })
        .then((res) => {
          res.data.data.forEach((item, index) => {
            let day = this.filter({
              year: item.absend_year,
              month: item.absend_month,
              day: item.absend_day
            });
            let flag = this.getToday(item.absend_year, item.absend_month, item.absend_day);
            flag ? this.$set(day, 'flag', 0) : this.$set(day, 'flag', 1);
          })
        })
        .catch((error) => {
          throw error;
        });

    },
    filter({ year, month, day }){
      let result = null;
      this.monthArr.forEach((row, index) => {
        let res = row.find((item) => {
          return new Date(item.year, item.month, item.date).getTime() == new Date(Number(year),
            Number(month), Number(day)).getTime();
        });
        if (res !== undefined) {
          result = res;
          return;
        }
      });
      return result;
    },
    //如果是今天 则返回为true
    getToday(year, month, date) {
      let dataDate = new Date(year, month, date)
      let today = new Date();
      return dataDate.getTime() === new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).getTime();
    },

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
