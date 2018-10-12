// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fetch from './tools/fetch'
import allApi from './api/user'
import reset from 'reset-css'
import less from 'less'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(reset)

//拦截，没有登录的时候 退回登录页
router.beforeEach((to, from, next) => {
  let localtoken;
  if (process.env.LOCALTOKEN) {
    localtoken = true;
    console.log("上线状态" + process.env.LOCALTOKEN);
  } else {
    localtoken = sessionStorage.getItem('token'); //获取本地token
    console.log("开发状态" + process.env.LOCALTOKEN);
  }

  let urltoken = to.query.token; //获取urltoken 值
  let user = JSON.parse(sessionStorage.getItem('access-user')); //获取本地user信息
  let flag = false; //tokan判断flag
  let userflag = false; //user信息判断flag
  let urlflag = false; //路由跳转权限


  let topath = to.path;
  let toname = to.name;

  //判断本地有没有token
  if (localtoken) { //判断本地有没有token
    //next();
    flag = true;
  } else {
    if (urltoken) {
      //请求url
      fetch.setToken(urltoken);
      flag = true;
      next({path: '/500'})
    } else {
      flag = false;
    }
  }

  if(toname == '进入系统'){
    next();
  }
  if(toname == '进入系统' || topath == "/") {
    console.log(localtoken,user)
    if(localtoken && user) {
      console.log(localtoken)
      let usertype = JSON.parse(sessionStorage.getItem('access-user')).data.type;
      console.log(usertype)
      if(usertype == "学生"){
        next({
          path: '/compusIndex'
        })
      }else if(usertype == "教育局"){
        next({
          path: '/index'
        })
      }
      return
    }else{
      next({
        path: '/500'
      })
    }
  }



  if(toname == '访问限制'){
    if(flag){
      next({
        path: '/500'
      })
    }else{
      next()
    }
  }

  if (flag ) { //token 验证通过
    if (!user) {
      console.log("没有获取到用户信息");
      fetch.httpGetR(allApi.userinfo, "", (res) => { //请求用户信息

        let code = res.data.code;
        if (code == 200) {
          sessionStorage.setItem('access-user', JSON.stringify(res.data));
          userflag = true;
          next();
        } else {
          next({
            path: '/500'
          })
        }
      });
    } else {
      userflag = true;
      if (userflag) {
         //判断路由权限
      let usertype = JSON.parse(sessionStorage.getItem('access-user')).data.type;
      let metatype = to.meta.type;

      for (let i = 0; i <= metatype.length; i++) {
        if (usertype == metatype[i]) {
          urlflag = true;
          console.log("有访问权限");
          break;
        }
      }
      if (urlflag) { //有访问权限
        next()
      } else { //没有访问权限
        next({
          path: '/500'
        })
      }
      } else {
        next({
          path: '/500'
        })
      }
    }
  } else {
    next({
      path : '/501'
    })
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
