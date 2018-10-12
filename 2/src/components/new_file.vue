<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide">Slide 1</div>
			<div class="swiper-slide">Slide 2</div>
			<div class="swiper-slide">Slide 3</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal',
				loop: true,

				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
				},
			})
		}
	}
</script>

<style scoped>
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	.swiper-wrapper {
		width: 100%;
		height: 100%;
	}
</style>