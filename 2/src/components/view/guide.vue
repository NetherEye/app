<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<!--第一张引导页-->
			<div class="swiper-slide guide1">
				<div class="animated">
					<p @click="goHome()">跳过</p>
				</div>
				<div class="animated" :class="{bounceInDown: guide1Class}"><img src="../../../static/img/guide1text.png" /></div>
				<div class="animated" :class="{bounceInRight: guide1Class}"><img src="../../../static/img/guide1ICL.png" /></div>
				<div class="animated" :class="{bounceInLeft: guide1Class}"><img src="../../../static/img/guide1ICR.png" /></div>
			</div>
			<!--第二张引导页-->
			<div class="swiper-slide guide2">
				<div>
					<p @click="goHome()">跳过</p>
				</div>
				<div class="animated" :class="{fadeIn: guide2Class}"><img src="../../../static/img/guide2text.png" /></div>
			</div>
			<!--第三张引导页-->
			<div class="swiper-slide guide3">
				<div>
					<p @click="goHome()">跳过</p>
				</div>
				<div class="animated" :class="{bounceInDown: guide3Class}"><img src="../../../static/img/guide3text.png" /></div>
				<ul>
					<li><img class="animated" :class="{bounceInLeft: guide3Class}" src="../../../static/img/guide3L.png" /></li>
					<li><img class="animated" :class="{fadeIn: guide3Class}" src="../../../static/img/guide3phone.png" /></li>
					<li><img class="animated" :class="{bounceInRight: guide3Class}" src="../../../static/img/guide3R.png" /></li>
				</ul>
			</div>
			<!--第四张引导页-->
			<div class="swiper-slide guide4">
				<div>
					<p @click="goHome()">跳过</p>
				</div>
				<div class="animated" :class="{bounceInDown: guide4Class}"><img src="../../../static/img/guide4text.png" /></div>
				<div class="animated" :class="{bounceInUp: guide4Class}"><img src="../../../static/img/guide4discern.png" /></div>
				<ul>
					<li class="animated" :class="{bounceInLeft: guide4Class}"><img src="../../../static/img/guide4pay.png" /></li>
					<li class="animated" :class="{bounceInRight: guide4Class}"><img src="../../../static/img/guide4share.png" /></li>
				</ul>
				<div @click="goHome()" class="animated" :class="{EnterHome: guide4Class}">进入首页</div>
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import animate from 'animate.css'
	export default {
		data() {
			return {
				//第一张引导页
				guide1Class: true,
				//第二张引导页
				guide2Class: false,
				//第三张引导页
				guide3Class: true,
				//第四张引导页
				guide4Class: true
			}
		},
		methods: {
			//动画
			guide() {
				let that = this;
				var mySwiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: false,

					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
					},
					on: {
						slideChange: function() {
							if(this.activeIndex == 0) {
								//第一张
								that.guide1Class = true;
								//第二张
								that.guide2Class = false;
								//第三张
								that.guide3Class = false;
								//第四张
								that.guide4Class = false;
							} else if(this.activeIndex == 1) {
								//第一张
								that.guide1Class = false;
								//第二张
								that.guide2Class = true;
								//第三张
								that.guide3Class = false;
								//第四张
								that.guide4Class = false;
							} else if(this.activeIndex == 2) {
								//第一张
								that.guide1Class = false;
								//第二张
								that.guide2Class = false;
								//第三张
								that.guide3Class = true;
								//第四张
								that.guide4Class = false;
							} else if(this.activeIndex == 3) {
								//第一张
								that.guide1Class = false;
								//第二张
								that.guide2Class = false;
								//第三张
								that.guide3Class = false;
								//第四张
								that.guide4Class = true;
							}
						},
					},
				})
			},
			//去首页
			goHome() {
				this.$router.push({
					path: '/index'
				})
			}
		},
		mounted() {
			this.guide()
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}
	
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	
	.swiper-wrapper {
		width: 100%;
		height: 100%;
	}
	
	.swiper-slide>div:nth-child(1) {
		height: 1.25rem;
		margin-top: 1rem;
	}
	
	.swiper-slide>div:nth-child(1)>p {
		width: 2.25rem;
		height: 1.25rem;
		float: right;
		font-size: 0.65rem;
		text-align: center;
		line-height: 1.25rem;
		color: #778cdf;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 0.5rem;
		cursor: pointer;
		margin-right: 0.75rem;
		box-shadow: 0 0 0.05rem #404996;
	}
	
	.guide1 {
		background: url(../../../static/img/guide1BG.png);
		background-size: cover;
		position: relative;
	}
	
	.guide2 {
		background: url(../../../static/img/guide2BG.png);
		background-size: cover;
	}
	
	.guide3 {
		background: url(../../../static/img/guide3BG.png);
		background-size: cover;
	}
	
	.guide4 {
		background: url(../../../static/img/guide4BG.png);
		background-size: cover;
	}
	/*第一张引导页*/
	
	.guide1 div:nth-child(2) {
		width: 86.6%;
		margin: 0 auto;
		margin-top: 3.65rem;
	}
	
	.guide1 div:nth-child(2) img {
		width: 100%;
	}
	
	.guide1 div:nth-child(3),
	.guide1 div:nth-child(4) {
		width: 44%;
	}
	
	.guide1 div:nth-child(3) {
		position: absolute;
		top: 43.44%;
		left: 13.33%;
		z-index: 1;
	}
	
	.guide1 div:nth-child(4) {
		position: absolute;
		top: 38.8%;
		left: 43.2%;
	}
	
	.guide1 div:nth-child(3) img,
	.guide1 div:nth-child(4) img {
		width: 100%;
	}
	/*第二张引导页*/
	
	.guide2 div:nth-child(2) {
		padding: 0 1.25rem;
		margin-top: 8.25rem;
	}
	
	.guide2 div:nth-child(2) img {
		width: 100%;
	}
	
	/*第三张引导页*/
	
	.guide3 div:nth-child(2) {
		padding: 0 16%;
		margin-top: 15.72%;
	}
	
	.guide3 div:nth-child(2) img {
		width: 100%;
	}
	
	.guide3 ul {
		display: flex;
		margin-top: 17%;
	}
	.guide3 ul li {
		flex: 1;
	}
	.guide3 ul img {
		width: 100%;
	}
	/*第四张引导页*/
	
	.guide4 div:nth-child(2) {
		padding: 0 9.3%;
		margin-top: 18.66%;
	}
	
	.guide4 div:nth-child(2) img,
	.guide4 div:nth-child(3) img {
		width: 100%;
	}
	
	.guide4 div:nth-child(3) {
		width: 32%;
		margin: 0 auto;
		margin-top: 20.66%;
	}
	
	.guide4 ul {
		display: flex;
		padding: 0 18.66%;
		margin-top: -1.9rem;
	}
	.guide4 ul li {
		flex: 1;
	}
	
	.guide4 ul li:nth-child(1) {
		margin-right: 0.5rem;
	}
	
	.guide4 ul li img {
		width: 100%;
	}
	
	.guide4 div:nth-child(5) {
		width: 6rem;
		height: 2rem;
		margin: 0 auto;
		text-align: center;
		line-height: 2rem;
		background: white;
		border-radius: 1rem;
		color: #504890;
		font-size: 0.65rem;
		margin-top: 3.25rem;
	}
</style>