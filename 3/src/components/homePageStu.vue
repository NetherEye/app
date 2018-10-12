<template>
  <div class="wrap">
    <div class="header">
      <div class="header_left">
        <img src="../assets/index/xitongbiaozhi.png" alt="">
        <span class="hl_font">助学贷款预约报名系统</span>
      </div>
      <div class="header_center">
        <span class="hc_nav" v-for="(i,index) in navData" @click="isClick(i.path,index);istrue=index" :key="index" :class="{active:istrue==index}" ref="light">{{i.content}}</span>
      </div>
      <div class="header_right">
        <span>欢迎{{username}}登录助学贷款报名预约系统</span>
        <span>|</span>
        <span @click="logoutid" style="cursor:pointer">退出当前系统</span>
      </div>
    </div>
    <div class="content">
      <div class="msg_img">
        <div class="msg" v-for="(i,index) in imgData" @click="isClick(i.path,index);istrue=index" :key="index" >
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
import fetch from "@/tools/fetch";
import allApi from "@/api/user";
export default {
  name: "homePage",

  data() {
    return {
      thisTo: "",
      istrue: 0,
      activePath: "",
      navData: [
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
      imgData: [
        {
          imgUrl: require("../assets/index/notice.png"),
          imgUrl1: require("../assets/index/lighttzgg.png"),
          path: "compusIndex"
        },
        {
          imgUrl: require("../assets/index/huankuantix.png"),
          imgUrl1: require("../assets/index/lighthuanktj.png"),
          path: "loanInfo"
        },
        {
          imgUrl: require("../assets/index/wentijieda.png"),
          imgUrl1: require("../assets/index/lightwtjd.png"),
          path: "questions"
        }
      ],
      userinfo: ""
    };
  },
  created () {
    let token = JSON.parse(sessionStorage.getItem('access-user'));
    this.username = token.data.nickename

    if(token) {
      token = token.data.nickename
    } else {
      token = ""
    }
  },
  methods: {
    isClick(path, index) {
      // for (let i in this.navData) {
      //   this.$refs.light[i].style.backgroundColor = ''
      //   this.$refs.light[i].style.color = ''
      // }
      // this.$refs.light[index].style.backgroundColor = 'rgba(255,255,255,0.5)'
      // this.$refs.light[index].style.color = '#5950b2'
      this.$router.push({ path });
    },
    logoutid() {
      // 清空数据 token   access-user
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("access-user");
      window.location.href = "https://www.gzeducard.com/app";
      // console.log("asdfds");
      // fetch.httpGetR(allApi.logout, "", res => {
      //   console.log(res);
      // });
    }
  }

  // beforeRouteEnter (to, from, next) {
  //   // 这里还无法访问到组件实例，this === undefined
  //
  //   next( vm => {
  //     // 通过 `vm` 访问组件实例
  //     console.log('/?????')
  //     vm.activePath = to.fullPath;
  //   })
  //   // this.thisTo = to.fullPath
  //   console.log(to)
  // }
};
</script>

<style scoped>
.active {
  background-color: rgba(255, 255, 255, 0.5);
  color: #5950b2;
}
.hc_nav {
  width: 120px;
  height: 36px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  margin-top: 34px;
  cursor: pointer;
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
  text-align: center;
  float: left;
  margin-left: 8%;
  height: 70px;
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
  height: 700px;
  background-image: linear-gradient(0deg, #5ac7ff 1%, #ca65ff 100%),
    linear-gradient(#caccff, #caccff);
  background-blend-mode: normal, normal;
  border-radius: 0px 50px 50px 0px;
}
.msg_img {
  position: relative;
  top: 100px;
}
.footer {
  width: 94%;
  float: left;
  margin: 0 auto;
}
.msg {
  margin-bottom: 50px;
  cursor: pointer;
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
.kb {
  width: 100%;
  height: 150px;
}
</style>
