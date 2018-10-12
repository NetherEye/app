<template>
    <div class="wrap">
      <div class="header">
        <div class="header_left">
          <img src="../assets/index/xitongbiaozhi.png" alt="">
          <span class="hl_font">助学贷款预约报名系统</span>
        </div>
        <div class="header_center">
          <span class="hc_nav" v-for="(i,index) in navData"  @click="isClick(i.path,index);istrue=index" :key="index" :class="{active:istrue==index}"  ref="light">{{i.content}}</span>
        </div>
        <div class="header_right">
          <span>欢迎{{username}}登录助学贷款报名预约系统</span>
          <span>|</span>
          <span style="cursor: pointer;" @click="logoutid">退出当前系统</span>
        </div>
      </div>
      <div class="content">
        <div class="msg_img">
          <div class="msg" v-for="(i,index) in imgData" :key="index"  @click="isClick(i.path,index);istrue=index" >
            <img :src="istrue==index? i.imgUrl1 :  i.imgUrl" alt="">
          </div>
        </div>
      </div>
      <div class="footer">
        <router-view></router-view>
        <div class="kb"></div>
      </div>
      <div class="footerImg">
        <img src="../assets/index/footer.png" alt="">
      </div>
    </div>
</template>

<script>
  import fetch from '@/tools/fetch'
export default {
  name: "homePage",
  data() {
    return {
      username : '',
      thisTo: "",
      activePath: "",
      istrue: "0",
      // 家长端
      navData: [
        {
          content: "首页",
          path: "index"
        },
        {
          content: "预约统计",
          path: "explain"
        },
        {
          content: "还款提醒",
          path: "repayment"
        },
        {
          content: "问题解答",
          path: "statistics"
        }
      ],
      imgData: [
        {
          imgUrl: require("../assets/index/notice.png"),
          imgUrl1: require("../assets/index/lighttzgg.png"),
          path: "index"
        },
        {
          imgUrl: require("../assets/index/yuyuetongji.png"),
          imgUrl1: require("../assets/index/lighttj.png"),
          path: "explain"
        },
        {
          imgUrl: require("../assets/index/huankuantix.png"),
          imgUrl1: require("../assets/index/lighthuanktj.png"),
          path: "repayment"
        },
        {
          imgUrl: require("../assets/index/wentijieda.png"),
          imgUrl1: require("../assets/index/lightwtjd.png"),
          path: "statistics"
        }
      ],
      // 学校端的
      navComData : [
        {
          content: "首页",
          path: "compusIndex"
        },
        {
          content: "还款信息",
          path: "loanInfo"
        },
        {
          content: "提问",
          path: "questions"
        }
      ],
    };
  },
  methods: {
    isClick(path, index) {
      this.$router.push({ path });
    },
    logoutid() {
      fetch.clearToken()
      window.location.href = "https://www.gzeducard.com/app";
    }
  },
  created () {
    let token = JSON.parse(sessionStorage.getItem('access-user'));
     this.username = token.data.nickename

    if(token) {
      token = token.data.nickename
    } else {
      token = ""
    }
  }
}
</script>

<style scoped>
  .wrap {
    position: relative;
  }

  .active {
    background-color: rgba(255,255,255,0.5);
    color : #5950b2
  }

  .kb {
    width: 100%;
    height: 150px;
  }

  .hc_nav {
    text-align: center;
    width: 120px;
    height: 36px;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    margin-top: 34px;
    line-height: 40px;
    letter-spacing: 0px;
    color: #ffffff;
    display: inline-block;
  }



.active {
  background-color: rgba(255, 255, 255, 0.5);
  color: #5950b2;
}

.hc_nav {
  text-align: center;
  width: 120px;
  height: 36px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  margin-top: 34px;
  line-height: 40px;
  letter-spacing: 0px;
  color: #ffffff;
  display: inline-block;
}

.header {
  min-width: 1320px;
  background-size: cover;
  width: 100%;
  height: 70px;
  background: url("../assets/index/navbg.png") ;
  overflow: hidden;
  background-size: 150% 140%;
}

.hl_font {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #ffffff;
}

.header_left img {
  width: 35px;
  height: 32px;
  position: relative;
  top: 5px;
}

.header_left {
  float: left;
  margin-left: 1%;
  line-height: 70px;
}

.header_center {
  float: left;
  margin-left: 8%;
  height: 70px;
  cursor: pointer;
}

.header_right {
  float: right;
  margin-right: 1%;
  margin-top: 30px;
  color: #fff;
  font-size: 12px;
}

.content {
  float: left;
  width: 3.5%;
  height: 500px;
  background-image: linear-gradient(0deg, #5ac7ff 1%, #ca65ff 100%),
    linear-gradient(#caccff, #caccff);
  background-blend-mode: normal, normal;
  border-radius: 0px 50px 50px 0px;
}
.msg_img {
  position: relative;
  top: 100px;
  cursor: pointer;
}
.footer {
  width: 94%;
  float: left;
}
.msg {
  margin-bottom: 50px;
  text-align: center;
  height: 50px;
}
  .footerImg {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .footerImg img {
    width: 100%;
  }

  .msg {
    margin-bottom: 50px;
    text-align: center;
    height: 50px;
  }
</style>
