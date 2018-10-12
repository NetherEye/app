<template>
	<div class="sup-educationNews">
		<!--标题-->
		<p class="title">教育新闻</p>
		<!--轮播-->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!--第一张banner-->
				<div class="swiper-slide">
					<img class="animated" src="../../../static/img/educationNews_banner1.png" />
				</div>
				<!--第二张banner-->
				<div class="swiper-slide">
					<img class="animated" src="../../../static/img/educationNews_banner2.png" />
				</div>
				<!--第三张banner-->
				<div class="swiper-slide">
					<img class="animated" src="../../../static/img/educationNews_banner3.png" />
				</div>
			</div>
			<!--底部标题-->
			<div class="bottomTitle">贵安新区：理清思路虚功做推动发展 实字当头干思路虚功做推动发展 实字当头干</div>
		</div>
		<!--教育新闻、时政新闻标签页-->
		<div class="tabs">
			<ul>
				<li @click="huoyue()" :class="{active: ChartBoolean}">教育要闻</li>
				<li @click="yingyong()" :class="{active: !ChartBoolean}">时政要闻</li>
			</ul>
			<ol>
				<li v-if="ChartBoolean">
					<ol class="EducationNews">
						<li @click="goEducationNewsDetails()">
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
						<li @click="goEducationNewsDetails()">
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
						<li @click="goEducationNewsDetails()">
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
					</ol>
				</li>
				<li v-if="!ChartBoolean">
					<ol class="EducationNews">
						<li @click="goEducationNewsDetails()">
							<div><img src="../../../static/img/home_EducationNews2.png" /></div>
							<ol>
								<li>贵安新区：理清思路虚功做推动发展 实字当头干字为...</li>
								<li>
									<p>来源：xxx教育厅</p>
									<p>4月20日</p>
									<h1 style="clear: both;"></h1>
								</li>
							</ol>
						</li>
						<li @click="goEducationNewsDetails()">
							<div><img src="../../../static/img/home_EducationNews2.png" /></div>
							<ol>
								<li>贵安新区：理清思路虚功做推动发展 实字当头干字为...</li>
								<li>
									<p>来源：xxx教育厅</p>
									<p>4月20日</p>
									<h1 style="clear: both;"></h1>
								</li>
							</ol>
						</li>
						<li @click="goEducationNewsDetails()">
							<div><img src="../../../static/img/home_EducationNews2.png" /></div>
							<ol>
								<li>贵安新区：理清思路虚功做推动发展 实字当头干字为...</li>
								<li>
									<p>来源：xxx教育厅</p>
									<p>4月20日</p>
									<h1 style="clear: both;"></h1>
								</li>
							</ol>
						</li>
					</ol>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		data() {
			return {
				ChartBoolean: true
			}
		},
		methods: {
			//动画
			carousel() {
				var mySwiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: true,
					autoplay: {
						delay: 6000
					},
				})
			},
			//去新闻详情
			goEducationNewsDetails() {
				this.$router.push({
					path: '/educationNews-details'
				})
			},
			//教育新闻、时政新闻标签页
			huoyue() {
				this.ChartBoolean = true;
			},
			yingyong() {
				this.ChartBoolean = false;
			}
		},
		mounted() {
			this.carousel();
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}
	
	.sup-educationNews {
		overflow: hidden;
	}
	
	.active {
		border-bottom: 0.1rem solid #77d0f9;
	}
	/*标题*/
	
	.title {
		font-size: 0.75rem;
		text-align: center;
		padding: 0.75rem 0;
		color: #138cde;
		background: white;
	}
	/*轮播*/
	
	.swiper-slide {
		background: white;
	}
	
	.swiper-slide img {
		width: 100%;
	}
	
	.bottomTitle {
		position: absolute;
		bottom: 0.19rem;
		z-index: 1;
		width: 100%;
		padding: 0.5rem 1rem;
		background: rgba(000, 000, 000, 0.4);
		color: white;
		font-size: 0.65rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/*教育新闻、时政新闻标签页*/
	
	.tabs {
		background: white;
	}
	
	.tabs ul {
		display: flex;
		padding: 0 2rem;
		border-bottom: 1px solid #77d0f9;
	}
	
	.tabs ul li {
		flex: 1;
		font-size: 0.65rem;
		text-align: center;
		padding: 0.9rem 0 0.6rem 0;
		color: #77d0f9;
	}
	/*教育新闻*/
	
	.EducationNews {
		background: white;
		padding-top: 0.75rem;
		margin-bottom: 3.25rem;
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
		padding-top: 0.5rem;
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
</style>