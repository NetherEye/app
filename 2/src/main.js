import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import index from './router/index'
import allApi from './api/user'
import fetch from './tools/fetch'
import axios from 'axios'
import '../static/css/_reset.css'
import 'swiper/dist/css/swiper.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import echarts from 'echarts'

Vue.use(Element)
Vue.use(MintUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

//router.beforeEach((to, from, next) => {
//	
//});

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})