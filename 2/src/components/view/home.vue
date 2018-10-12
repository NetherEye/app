<template>
	<div class="home">
		<!--视图-->
		<router-view></router-view>
		<!--底部导航栏-->
		<ul class="bottomNav">
			<li @click="goPage(item.title)" v-for="(item,index) in bottomNav">
				<div><img :src="item.imgUrl" /></div>
				<p>{{item.title}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//底部导航栏
				bottomNav: [{
					imgUrl: '../../../static/img/home_bottomNav1_1.png',
					title: '首页'
				}, {
					imgUrl: '../../../static/img/home_bottomNav2.png',
					title: '教育新闻'
				}, {
					imgUrl: '../../../static/img/home_bottomNav3.png',
					title: '教育应用'
				}, {
					imgUrl: '../../../static/img/home_bottomNav4.png',
					title: '个人中心'
				}]
			}
		},
		methods: {
			//去子页面、变换图表
			goPage(title) {
				if(title == "首页") {
					this.bottomNav = [{
						imgUrl: '../../../static/img/home_bottomNav1_1.png',
						title: '首页'
					}, {
						imgUrl: '../../../static/img/home_bottomNav2.png',
						title: '教育新闻'
					}, {
						imgUrl: '../../../static/img/home_bottomNav3.png',
						title: '教育应用'
					}, {
						imgUrl: '../../../static/img/home_bottomNav4.png',
						title: '个人中心'
					}]
					this.$router.push({
						path: '/index'
					})
				} else if(title == '教育新闻') {
					this.bottomNav = [{
						imgUrl: '../../../static/img/home_bottomNav1.png',
						title: '首页'
					}, {
						imgUrl: '../../../static/img/home_bottomNav1_2.png',
						title: '教育新闻'
					}, {
						imgUrl: '../../../static/img/home_bottomNav3.png',
						title: '教育应用'
					}, {
						imgUrl: '../../../static/img/home_bottomNav4.png',
						title: '个人中心'
					}]
					this.$router.push({
						path: '/educationNews'
					})
				} else if(title == '教育应用') {
					this.bottomNav = [{
						imgUrl: '../../../static/img/home_bottomNav1.png',
						title: '首页'
					}, {
						imgUrl: '../../../static/img/home_bottomNav2.png',
						title: '教育新闻'
					}, {
						imgUrl: '../../../static/img/home_bottomNav1_3.png',
						title: '教育应用'
					}, {
						imgUrl: '../../../static/img/home_bottomNav4.png',
						title: '个人中心'
					}]
					this.$router.push({
						path: '/educationUse'
					})
				} else {
					this.bottomNav = [{
						imgUrl: '../../../static/img/home_bottomNav1.png',
						title: '首页'
					}, {
						imgUrl: '../../../static/img/home_bottomNav2.png',
						title: '教育新闻'
					}, {
						imgUrl: '../../../static/img/home_bottomNav3.png',
						title: '教育应用'
					}, {
						imgUrl: '../../../static/img/home_bottomNav1_4.png',
						title: '个人中心'
					}]
					this.$router.push({
						path: '/educationNews'
					})
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	/*底部导航栏*/
	.home {
		width: 100%;
		height: 100%;
	}
	.bottomNav {
		display: flex;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		background: white;
		height: 2.5rem;
		padding: 0.375rem 0;
		border-top: 1px solid #dbdbdb;
	}
	
	.bottomNav li {
		flex: 1;
		text-align: center;
		font-size: 0.5rem;
		color: #999999;
	}
	
	.bottomNav li p {
		line-height: 0.6rem;
	}
	
	.bottomNav li div {
		width: 1rem;
		margin: 0 auto;
	}
	
	.bottomNav li div img {
		width: 100%;
	}
</style>