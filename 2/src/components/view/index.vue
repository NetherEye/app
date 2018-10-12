<template>
	<div class="index">
		<!--logo、登录-->
		<ul class="logo">
			<li><img src="../../../static/img/home_logo.png" /></li>
			<li>登录</li>
		</ul>
		<!--轮播-->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!--第一张banner-->
				<div class="swiper-slide">
					<img class="animated" :class="{zoomIn: banner1}" src="../../../static/img/home_banner1.png" />
				</div>
				<!--第二张banner-->
				<div class="swiper-slide">
					<img class="animated" :class="{zoomIn: banner2}" src="../../../static/img/home_banner2.png" />
				</div>
				<!--第三张banner-->
				<div class="swiper-slide">
					<img class="animated" :class="{zoomIn: banner3}" src="../../../static/img/home_banner3.png" />
				</div>
			</div>
			<!-- 分页器 -->
			<div class="swiper-pagination"></div>
		</div>
		<!--教育卡应用-->
		<ul class="EducationCardUse">
			<div>教育卡应用</div>
			<li v-for="(item,index) in EducationCardUse" :index="index">
				<p><img :src="item.imgUrl" /></p>
				<p>{{item.name}}</p>
			</li>
			<h1 style="clear: both;"></h1>
		</ul>
		<!--教育要闻-->
		<ul class="EducationNews">
			<p>教育新闻</p>
			<li>
				<div><img src="../../../static/img/home_EducationNews1.png" /></div>
				<ol>
					<li>贵安新区：理清思路虚功做推动发展 实字当头干字为...</li>
					<li>
						<p>来源：xxx教育厅</p>
						<p>4月20日</p>
						<h1 style="clear: both;"></h1>
					</li>
				</ol>
			</li>
			<li>
				<div><img src="../../../static/img/home_EducationNews2.png" /></div>
				<ol>
					<li>贵安新区：理清思路虚功做推动发展 实字当头干字为...</li>
					<li>
						<p>来源：xxx教育厅</p>
						<p>4月16日</p>
						<h1 style="clear: both;"></h1>
					</li>
				</ol>
			</li>
		</ul>
		<!--数据统计-->
		<div class="dataStatistics">
			<p>数据统计</p>
			<ul>
				<li>
					<div><img src="../../../static/img/home_teacher.png" /></div>
					<p>教师</p>
					<p>689456</p>
				</li>
				<li>
					<div><img src="../../../static/img/home_student.png" /></div>
					<p>教师</p>
					<p>689456</p>
				</li>
				<li>
					<div><img src="../../../static/img/home_Parents.png" /></div>
					<p>教师</p>
					<p>689456</p>
				</li>
			</ul>
		</div>
		<!--数据统计图表-->
		<div class="dataChart">
			<ul>
				<li @click="huoyue()" :class="{active: ChartBoolean}">用户活跃占比</li>
				<li @click="yingyong()" :class="{active: !ChartBoolean}">应用使用率占比</li>
			</ul>
			<ol>
				<li :class="{active2: ChartBoolean}">
					<div id="livelyChart"></div>
				</li>
				<li :class="{active2: !ChartBoolean}">
					<div id="userChart"></div>
				</li>
			</ol>
		</div>
		<!--标准规范建设轮播-->
		<div class="standard">
			<p>标准规范建设</p>
			<div class="standard-container">
				<div class="swiper-wrapper">
					<!--第一张banner-->
					<div class="swiper-slide">
						<img src="../../../static/img/home_standard1.png" />
					</div>
					<!--第二张banner-->
					<div class="swiper-slide">
						<img src="../../../static/img/home_standard2.png" />
					</div>
					<!--第三张banner-->
					<div class="swiper-slide">
						<img src="../../../static/img/home_standard3.png" />
					</div>
					<!--第四张banner-->
					<div class="swiper-slide">
						<img src="../../../static/img/home_standard4.png" />
					</div>
				</div>
				<!-- 分页器 -->
				<div class="standard-pagination"></div>
			</div>
		</div>
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
				//教育卡应用
				EducationCardUse: [{
					imgUrl: '../../../static/img/home_EducationCardUse1.png',
					name: '学生营养餐系统'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse2.png',
					name: '数据上报系统'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse3.png',
					name: '控辍保学系统'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse4.png',
					name: '在线课程'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse5.png',
					name: '录制直播微课平台'
				}, {
					imgUrl: '../../../static/img/home_EducationCardUse6.png',
					name: '更多应用'
				}],
				//数据图表
				ChartBoolean: true,
				//底部导航栏
				bottomNav: [{
					imgUrl: '../../../static/img/home_bottomNav1_1.png',
					title: '首页'
				},{
					imgUrl: '../../../static/img/home_bottomNav2.png',
					title: '教育新闻'
				},{
					imgUrl: '../../../static/img/home_bottomNav3.png',
					title: '教育应用'
				},{
					imgUrl: '../../../static/img/home_bottomNav4.png',
					title: '个人中心'
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
			},
			//活跃用户图表
			livelyChart() {
				let livelyChart = this.$echarts.init(document.getElementById('livelyChart'))
				livelyChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: 20,
						top: 26,
						data: ['活跃用户', '非活跃用户']
					},
					toolbox: {
						show: false,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['pie', 'funnel']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					series: [{
						name: '半径模式',
						type: 'pie',
						radius: [18, 50],
						center: ['18%', '50%'],
						roseType: 'radius',
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						lableLine: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						data: [{
								value: 10,
								name: '非活跃用户'
							},
							{
								value: 12,
								name: '活跃用户'
							}
						]
					}],
					color: ['#ff7d8f', '#fd996e']
				});
			},
			//应用占比图表
			userChart() {
				let userChart = this.$echarts.init(document.getElementById('userChart'))
				userChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: 20,
						top: 16,
						data: ['营养餐', '控辍保学', '数据上报']
					},
					toolbox: {
						show: false,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['pie', 'funnel']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					series: [{
						name: '半径模式',
						type: 'pie',
						radius: [18, 50],
						center: ['18%', '50%'],
						roseType: 'radius',
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						lableLine: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						data: [{
								value: 10,
								name: '营养餐'
							},
							{
								value: 12,
								name: '控辍保学'
							},
							{
								value: 13,
								name: '数据上报'
							}
						]
					}],
					color: ['#7afdc4', '#df95ef', '#77d0f9']
				});
			},
			//标准规范轮播
			standard() {
				let that = this;
				var standardContainer = new Swiper('.standard-container', {
					direction: 'horizontal',
					slidesPerView: 2,
					loop: false,

					// 如果需要分页器
					pagination: {
						el: '.standard-pagination',
					}
				})
			},
			//数据统计图表标签页切换
			huoyue() {
				this.ChartBoolean = true;
				//this.livelyChart();
			},
			yingyong() {
				this.ChartBoolean = false;
				//this.userChart();
			}
		},
		mounted() {
			this.carousel();
			this.livelyChart();
			this.userChart();
			this.standard();
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}
	
	.index {
		background: #f3f5f9;
		overflow: hidden;
	}
	
	.active {
		border-bottom: 0.1rem solid #77d0f9;
	}
	
	.active2 {
		opacity: 1 !important;
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
	
	.EducationCardUse {
		background: white;
		padding-top: 0.75rem;
		padding-bottom: 1.25rem;
	}
	
	.EducationCardUse div {
		padding-left: 0.75rem;
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ebebeb;
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
	/*教育新闻*/
	
	.EducationNews {
		background: white;
		padding-top: 0.75rem;
		margin-top: 0.75rem;
	}
	
	.EducationNews>p {
		padding-left: 0.75rem;
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ebebeb;
	}
	
	.EducationNews>li {
		margin-top: 0.85rem;
		display: flex;
		padding: 0 0.75rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid #ebebeb;
	}
	
	.EducationNews>li:last-child {
		border: none;
	}
	
	.EducationNews li div {
		width: 6.25rem;
		height: 4.25rem;
	}
	
	.EducationNews li div img {
		width: 100%;
		border-radius: 0.3rem;
	}
	
	.EducationNews li ol {
		flex: 1;
		font-size: 0.75rem;
		margin-left: 0.65rem;
		padding-top: 0.7rem;
	}
	
	.EducationNews li ol li:nth-child(1) {
		height: 2rem;
		line-height: 1rem;
		overflow: hidden;
	}
	
	.EducationNews li ol li:nth-child(2) {
		margin-top: 0.45rem;
	}
	
	.EducationNews li ol li:nth-child(2) p {
		float: left;
		font-size: 0.5rem;
		color: #999999;
	}
	
	.EducationNews li ol li:nth-child(2) p:nth-child(2) {
		float: right;
	}
	/*数据统计*/
	
	.dataStatistics {
		margin-top: 0.75rem;
		padding: 0.75rem 0 2rem 0;
		background: white;
	}
	
	.dataStatistics>p {
		padding-left: 0.75rem;
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ebebeb;
	}
	
	.dataStatistics ul {
		display: flex;
		padding-top: 1.5rem;
	}
	
	.dataStatistics ul li {
		flex: 1;
		border-right: 1px solid #ebebeb;
		text-align: center;
	}
	
	.dataStatistics ul li:last-child {
		border: none;
	}
	
	.dataStatistics ul li div {
		width: 1.8rem;
		height: 2.25rem;
		margin: 0 auto;
	}
	
	.dataStatistics ul li div img {
		width: 100%;
	}
	
	.dataStatistics ul li p:nth-child(2) {
		color: #666666;
		font-size: 0.5rem;
		margin-top: 0.1rem;
	}
	
	.dataStatistics ul li p:nth-child(3) {
		color: #77d0f9;
		font-size: 0.65rem;
		margin-top: 0.1rem;
	}
	/*数据统计图表*/
	
	.dataChart {
		margin-top: 0.5rem;
		background: white;
	}
	
	.dataChart ul {
		display: flex;
		padding: 0 1.5rem;
		border-bottom: 1px solid #ebebeb;
	}
	
	.dataChart ul li {
		flex: 1;
		font-size: 0.6rem;
		text-align: center;
		padding: 0.625rem 0;
		color: #333333;
	}
	
	.dataChart ol {
		position: relative;
		height: 8rem;
	}
	
	.dataChart ol li {
		width: 100%;
		opacity: 0;
		position: absolute;
	}
	
	.dataChart ol li:nth-child(1) {
		height: 8rem;
		padding: 1.5rem 1.54rem 1.5rem 2rem;
	}
	
	.dataChart ol li:nth-child(1) div {
		width: 100%;
		height: 100%;
	}
	
	.dataChart ol li:nth-child(2) {
		height: 8rem;
		padding: 1.5rem 1.54rem 1.5rem 2rem;
	}
	
	.dataChart ol li:nth-child(2) div {
		width: 100%;
		height: 100%;
	}
	/*标准规范建设轮播*/
	
	.standard {
		margin-top: 0.75rem;
		padding: 0.75rem 0 0 0;
		background: white;
		margin-bottom: 3.25rem;
	}
	
	.standard>p {
		padding-left: 0.75rem;
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ebebeb;
	}
	
	.standard-container {
		padding-top: 1rem;
		padding-bottom: 0.75rem;
	}
	
	.standard-container img {
		width: 100%;
	}
	
	.standard-pagination {
		text-align: center;
	}
	
	
	/*底部导航栏*/
	.bottomNav {
		display: flex;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		background: white;
		height: 2.5rem;
		padding: 0.375rem 0;
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