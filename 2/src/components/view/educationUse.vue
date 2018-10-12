<template>
	<div class="index">
		<!--logo、登录-->
		<ul class="logo">
			<li><img src="../../../static/img/home_logo.png" /></li>
			<li>用户名称</li>
		</ul>
		<!--轮播-->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!--第一张banner-->
				<div class="swiper-slide">
					<img class="animated" :class="{zoomIn: banner1}" src="../../../static/img/educationUse_banner1.png" />
				</div>
				<!--第二张banner-->
				<div class="swiper-slide">
					<img class="animated" :class="{zoomIn: banner2}" src="../../../static/img/educationUse_banner2.png" />
				</div>
				<!--第三张banner-->
				<div class="swiper-slide">
					<img class="animated" :class="{zoomIn: banner3}" src="../../../static/img/educationUse_banner3.png" />
				</div>
			</div>
			<!-- 分页器 -->
			<div class="swiper-pagination"></div>
		</div>
		<!--教育管理-->
		<ul class="EducationCardUse">
			<div>教育管理<span>应用3</span></div>
			<li v-for="(item,index) in EducationCardUse" :index="index">
				<p><img :src="item.imgUrl" /></p>
				<p>{{item.name}}</p>
			</li>
			<h1 style="clear: both;"></h1>
		</ul>
		<!--教务教学-->
		<ul class="EducationCardUse">
			<div>教务教学<span>应用2</span></div>
			<li v-for="(item,index) in EducationCardUse2" :index="index">
				<p><img :src="item.imgUrl" /></p>
				<p>{{item.name}}</p>
			</li>
			<h1 style="clear: both;"></h1>
		</ul>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import animate from 'animate.css'
	export default {
		data() {
			return {
				//轮播动画
				banner1: true,
				banner2: false,
				banner3: false,
				//教育管理
				EducationCardUse: [{
					imgUrl: '../../../static/img/home_EducationCardUse1.png',
					name: '学生营养餐系统'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse2.png',
					name: '数据上报系统'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse3.png',
					name: '控辍保学系统'
				}],
				//教务教学
				EducationCardUse2: [{
					imgUrl: '../../../static/img/home_EducationCardUse4.png',
					name: '在线课程'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse5.png',
					name: '录制直播微课平台'
				},{
					
				}]
			}
		},
		methods: {
			//动画
			carousel() {
				let that = this;
				var mySwiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: false,
					autoplay: {
						delay: 6000
					},
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
					},
					on: {
						slideChange: function() {
							if(this.activeIndex == 0) {
								that.banner1 = true;
								that.banner2 = false;
								that.banner3 = false;
							} else if(this.activeIndex == 1) {
								that.banner1 = false;
								that.banner2 = true;
								that.banner3 = false;
							} else if(this.activeIndex == 2) {
								that.banner1 = false;
								that.banner2 = false;
								that.banner3 = true;
							}
						},
					},
				})
			}
		},
		mounted() {
			this.carousel();
		}
	}
</script>

<style scoped>
	.index {
		margin-bottom: 3.75rem;
	}
	
	/*logo*/
	
	.logo {
		height: 2rem;
		background: white;
		padding: 0 0.75rem;
	}
	
	.logo li:nth-child(1) {
		width: 6rem;
		float: left;
		margin-top: 0.1rem;
	}
	
	.logo li:nth-child(1) img {
		width: 100%;
		margin-top: 0.2rem;
	}
	
	.logo li:nth-child(2) {
		float: right;
		color: #359de3;
		font-size: 0.75rem;
		line-height: 2rem;
	}
	/*轮播*/
	
	.swiper-slide {
		background: white;
	}
	
	.swiper-slide img {
		width: 100%;
	}
	/*教育卡应用*/
	.index .EducationCardUse:nth-child(4) {
		margin-top: 0.75rem;
	}
	.EducationCardUse {
		background: white;
		padding-top: 0.75rem;
	}
	
	.EducationCardUse div {
		padding-left: 0.75rem;
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ebebeb;
	}
	.EducationCardUse div span {
		margin-left: 0.5rem;
		padding-left: 0.5rem;
		color: #999999;
		font-size: 0.6rem;
		border-left: 0.1px solid #999999;
	}
	
	.EducationCardUse li {
		float: left;
		width: 33%;
		font-size: 0.6rem;
		text-align: center;
	}
	
	.EducationCardUse li:nth-child(2),
	.EducationCardUse li:nth-child(3),
	.EducationCardUse li:nth-child(4) {
		margin: 1rem 0 1.5rem 0;
	}
	
	.EducationCardUse li p:nth-child(1) {
		width: 2.25rem;
		height: 2.25rem;
		margin: 0 auto;
	}
	
	.EducationCardUse li p:nth-child(1) img {
		width: 100%;
	}
</style>